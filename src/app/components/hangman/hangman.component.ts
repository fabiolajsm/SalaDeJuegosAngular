import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HangmanService } from '../../../services/hangman.service';
import { HangmanDisplayComponent } from '../hangman-display/hangman-display.component';
import { HangmanKeyboardComponent } from '../hangman-keyboard/hangman-keyboard.component';
import { HangmanQuestionComponent } from '../hangman-question/hangman-question.component';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [
    HangmanDisplayComponent,
    HangmanKeyboardComponent,
    HangmanQuestionComponent,
    CommonModule,
    NgxSpinnerModule,
  ],
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss'],
})
export class HangmanComponent implements OnInit {
  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';
  restartGameBtnShown = false;

  constructor(
    private hangmanService: HangmanService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.hangmanService.getCategoriesAndQuestions().subscribe((categories) => {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      this.category = category.category.toUpperCase();
      this.questions = category.values;
      this.pickNewQuestion();
      this.spinner.hide();
    });
  }

  guess(letter: string) {
    if (!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
  }

  dummyClick() {
    const key = prompt('Enter a key') || '';
    this.guess(key);
  }

  reset() {
    this.guesses = [];
    this.pickNewQuestion();
    this.restartGameBtnShown = false;
  }

  pickNewQuestion() {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    this.question = this.questions[randomIndex];
  }

  onGameFinished() {
    this.restartGameBtnShown = true;
  }
  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
