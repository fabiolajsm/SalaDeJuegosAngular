import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MathExercise, mathExercises } from './mathExercises';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss',
})
export class ElementsComponent {
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    userAnswer: ['', Validators.required],
  });
  elements = ['agua', 'fuego', 'tierra', 'aire'];
  selectedElement: string = '';
  exercises: MathExercise[] = [];
  showSelector: boolean = true;
  userAnswer: string = '';
  feedbackImageUrl: string = '';

  constructor(private router: Router) {}

  getImageUrl(element: string): string {
    return `../assets/${element}.jpeg`;
  }

  getDescription(element: string): string {
    switch (element) {
      case 'agua':
        return 'Con Agua, te sumergirás en el mundo de las restas, navegando a través de problemas matemáticos que te llevarán a descubrir tesoros de conocimiento.';
      case 'fuego':
        return 'En la furia de Fuego, te enfrentarás a multiplicaciones ardientes, forjando tu habilidad para resolver problemas con la velocidad y precisión de un maestro matemático.';
      case 'tierra':
        return '¡Descubre los secretos de los porcentajes! Con Tierra, explorarás las vastas extensiones de los porcentajes, desenterrando conocimientos ocultos y dominando la magia de los números.';
      case 'aire':
        return 'Con Aire, te aventurarás en el mundo de la división, desafiando las corrientes de problemas matemáticos y dominando el viento de los cálculos.';
      default:
        return '';
    }
  }

  selectElement(element: string): void {
    this.selectedElement = element;
    this.exercises = mathExercises.filter((item) => item.category === element);
    this.showSelector = false;
  }

  submitAnswer(): void {
    const correctAnswersCount: number = Number(this.form.value.userAnswer);
    if (!correctAnswersCount) return;

    const correctAnswers: MathExercise[] = this.exercises.filter(
      (exercise) => exercise.correctAnswer === true
    );
    const userWins: boolean = correctAnswersCount === correctAnswers.length;

    if (userWins) {
      this.feedbackImageUrl = `../assets/happy_${this.selectedElement}.jpeg`;
    } else {
      this.feedbackImageUrl = `../assets/sad_${this.selectedElement}.jpeg`;
    }
  }

  backFromTheGame(): void {
    this.showSelector = true;
    this.feedbackImageUrl = '';
    this.form.reset();
  }

  tryAgain(): void {
    this.feedbackImageUrl = '';
    this.showSelector = false;
    this.form.reset();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
