import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TriviaQuestion } from '../interfaces/trivia.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private entertainmentUrl =
    'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple';

  constructor(private http: HttpClient) {}

  getTriviaQuestions(): Observable<TriviaQuestion[]> {
    return this.http.get(this.entertainmentUrl).pipe(
      map((response: any) => {
        const triviaQuestions: TriviaQuestion[] = [];
        response.results.forEach((result: any) => {
          if (!result.category) return;
          const data: TriviaQuestion = {
            question: this.decodeHTMLEntities(result.question),
            correctAnswer: this.decodeHTMLEntities(result.correct_answer),
            options: result.incorrect_answers
              .map((answer: string) => this.decodeHTMLEntities(answer))
              .concat(result.correct_answer),
            image: result.category
              ? this.getImageForCategory(result.category)
              : '../assets/Default.jpeg',
          };
          triviaQuestions.push(data);
        });
        return triviaQuestions;
      })
    );
  }

  private getImageForCategory(category: string): string {
    if (category.includes('Entertainment')) {
      return '../assets/Entertainment.jpeg';
    } else if (category.includes('Sports')) {
      return '../assets/Sports.jpeg';
    } else if (category.includes('Art')) {
      return '../assets/Art.jpeg';
    } else if (category.includes('Music')) {
      return '../assets/Music.jpeg';
    } else if (category.includes('Science')) {
      return '../assets/Science.jpeg';
    } else {
      return '../assets/Default.jpeg';
    }
  }

  private decodeHTMLEntities(text: string): string {
    const elem = document.createElement('textarea');
    elem.innerHTML = text;
    return elem.value;
  }
}
