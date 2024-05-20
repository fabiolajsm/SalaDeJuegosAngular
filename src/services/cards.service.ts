import { Injectable } from '@angular/core';
import { Subject, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  public nameDeckOfCards!: string;
  public lastCard: Subject<string>;
  public newCard: Subject<string>;

  constructor(private http: HttpClient) {
    this.lastCard = new Subject();
    this.newCard = new Subject();
  }

  private getFirstCard(name: string) {
    this.http
      .get(`https://www.deckofcardsapi.com/api/deck/${name}/draw/?count=2`)
      .subscribe((response) => {
        this.lastCard.next((response as any).cards[0]);
        this.newCard.next((response as any).cards[1]);
      });
  }

  createCards() {
    this.http
      .get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .pipe(
        finalize(() => {
          this.getFirstCard(this.nameDeckOfCards);
        })
      )
      .subscribe((response) => {
        this.nameDeckOfCards = (response as any).deck_id;
      });
  }

  getCard(name: string) {
    this.http
      .get(`https://www.deckofcardsapi.com/api/deck/${name}/draw/?count=1`)
      .subscribe((response) => {
        this.newCard.next((response as any).cards[0]);
      });
  }
}
