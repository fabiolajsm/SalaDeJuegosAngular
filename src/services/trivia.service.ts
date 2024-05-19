import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TriviaQuestion } from '../interfaces/trivia.interface';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  constructor() {}

  getTriviaQuestions(): Observable<TriviaQuestion[]> {
    // Aquí simularíamos el llamado a la API para obtener las preguntas
    const mockQuestions: TriviaQuestion[] = [
      {
        question: '¿Cuál es la capital de Francia?',
        image: 'paris.jpg',
        options: ['Roma', 'Madrid', 'París', 'Berlín'],
        correctAnswer: 'París',
      },
      {
        question: '¿Quién escribió "Don Quijote de la Mancha"?',
        image: 'quijote.jpg',
        options: [
          'Miguel de Cervantes',
          'Gabriel García Márquez',
          'Pablo Neruda',
          'Federico García Lorca',
        ],
        correctAnswer: 'Miguel de Cervantes',
      },
      // Agrega más preguntas aquí
    ];

    return of(mockQuestions);
  }
}
