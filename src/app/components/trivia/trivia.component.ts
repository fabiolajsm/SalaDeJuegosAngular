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
  showRestartButton: boolean = false;
  isCorrectAnswer: boolean = false;
  isLoading: boolean = false;

  constructor(
    private triviaService: TriviaService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadTriviaQuestions();
  }

  loadTriviaQuestions(): void {
    this.isLoading = true;
    this.spinner.show();
    this.triviaService.getTriviaQuestions().subscribe((questions) => {
      this.questions = questions;
      this.isLoading = false;
      this.spinner.hide();
    });
  }

  nextQuestion() {
    if (this.selectedOption === '') return;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = '';
    } else if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showRestartButton = true;
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isCorrect();
  }

  isCorrect(): boolean {
    const isCorrect =
      this.selectedOption ===
      this.questions[this.currentQuestionIndex].correctAnswer;

    if (isCorrect) {
      this.score++;
      this.isCorrectAnswer = true;
      return true;
    } else {
      this.isCorrectAnswer = false;
      return false;
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  restartGame() {
    this.loadTriviaQuestions();
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedOption = '';
    this.showRestartButton = false;
  }
}
