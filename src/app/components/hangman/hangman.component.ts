import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HangmanService } from '../../../services/hangman.service';
import { HangmanDisplayComponent } from '../hangman-display/hangman-display.component';
import { HangmanKeyboardComponent } from '../hangman-keyboard/hangman-keyboard.component';
import { HangmanQuestionComponent } from '../hangman-question/hangman-question.component';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [
    HangmanDisplayComponent,
    HangmanKeyboardComponent,
    HangmanQuestionComponent,
    CommonModule,
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
    private location: Location
  ) {}

  ngOnInit(): void {
    let jsonPath;
    const url = this.location.path();
    if (url.includes('jsonPath')) {
      jsonPath = url.split('jsonPath=')[1];
    }
    this.hangmanService.getQuestions(jsonPath).subscribe((response) => {
      this.questions = response.items;
      this.category = response.category;
      this.pickNewQuestion();
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
    console.log(this.question);
  }

  onGameFinished() {
    this.restartGameBtnShown = true;
  }
}
