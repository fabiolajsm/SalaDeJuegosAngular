import { Component } from '@angular/core';
import { Cards } from './card';
import { CardsService } from '../../../services/cards.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-greater-or-less',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './greater-or-less.component.html',
  styleUrl: './greater-or-less.component.scss',
})
export class GreaterOrLessComponent {
  cardsName: string = '';
  hasNewCard: boolean = false;
  nameDeckOfCards!: string;
  lastCard!: Cards;
  newCard!: Cards;
  score: number = 0;
  resultMessage: string = '';

  constructor(
    private cardsService: CardsService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.cardsService.createCards();
    this.lastCard = new Cards('', '');
    this.newCard = new Cards('', '');
  }

  ngOnInit(): void {
    this.spinner.show();
    this.cardsService.lastCard.subscribe((respuesta) => {
      this.lastCard = new Cards(
        (respuesta as any).value,
        (respuesta as any).image
      );
    });
    this.cardsService.newCard.subscribe((respuesta) => {
      this.newCard = new Cards(
        (respuesta as any).value,
        (respuesta as any).image
      );
      this.spinner.hide();
    });
  }

  getNewCard(buttonOption: string) {
    this.nameDeckOfCards = this.cardsService.nameDeckOfCards;
    this.hasNewCard = true;
    this.getFinalResult(this.lastCard, this.newCard, buttonOption);
  }

  getFinalResult(firstCard: Cards, secondCard: Cards, buttonOption: string) {
    let compare: string = 'igual';
    if (parseInt(secondCard.value) > parseInt(firstCard.value)) {
      compare = 'mayor';
    } else if (parseInt(secondCard.value) < parseInt(firstCard.value)) {
      compare = 'menor';
    }
    if (buttonOption == compare) {
      this.showWinMessage();
    } else {
      this.showLoseMessage();
    }
  }

  showLoseMessage() {
    this.resultMessage = 'Perdiste!';
    setTimeout(() => {
      this.score = 0;
      this.cardsService.createCards();
      this.hasNewCard = false;
      this.resultMessage = '';
    }, 2000);
  }

  showWinMessage() {
    this.resultMessage = 'Ganaste!';
    setTimeout(() => {
      this.score++;
      this.lastCard = this.newCard;
      this.cardsService.getCard(this.nameDeckOfCards);
      this.hasNewCard = false;
      this.resultMessage = '';
    }, 2000);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
