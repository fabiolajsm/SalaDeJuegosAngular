import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection, query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class HangmanService {
  firestore = inject(Firestore);

  getCategoriesAndQuestions(): Observable<any[]> {
    const questionsRef = collection(this.firestore, 'hangManQuestions');
    const questionsQuery = query(questionsRef);
    return collectionData(questionsQuery, { idField: 'id' });
  }
}
