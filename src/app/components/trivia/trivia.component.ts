import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { TriviaService } from '../../../services/trivia.service';
import { TriviaQuestion } from '../../../interfaces/trivia.interface';

@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.scss',
})
export class TriviaComponent {
  score: number = 0;
  questions: TriviaQuestion[] = [];
  currentQuestionIndex = 0;
  selectedOption: string = '';
  showRestartButton: boolean = false; // Variable para controlar la visibilidad del botón

  constructor(
    private triviaService: TriviaService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.triviaService.getTriviaQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }

  nextQuestion() {
    console.log(this.currentQuestionIndex, "currentQuestionIndex");
    console.log(this.questions, "questions");
    
    
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = '';
    } else if (this.currentQuestionIndex === this.questions.length - 1) {
      console.log('Se han agotado todas las preguntas.');
      this.showRestartButton = true; // Mostrar el botón de reiniciar
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  isCorrect(): boolean {
    return (
      this.selectedOption ===
      this.questions[this.currentQuestionIndex].correctAnswer
    );
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  restartGame() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedOption = '';
    this.showRestartButton = false; // Ocultar el botón de reiniciar nuevamente
  }
}
