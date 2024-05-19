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
    return this.getAllTriviaQuestions().pipe(
      map((response: any) => {
        const triviaQuestions: TriviaQuestion[] = [];
        response.results.forEach((result: any) => {
          if (!result.category) return;
          const data: TriviaQuestion = {
            question: result.question,
            correctAnswer: result.correct_answer,
            options: result.incorrect_answers.concat(result.correct_answer),
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

  private getAllTriviaQuestions(): Observable<any> {
    return this.http.get(this.entertainmentUrl);
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
}
