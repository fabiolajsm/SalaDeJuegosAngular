import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { Firestore, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  getUsers(): Observable<[]> {
    const users = collection(this.firestore, 'users');
    return collectionData(users) as Observable<[]>;
  }

  addToLoginHistory(email: string) {
    const loginHistory = collection(this.firestore, 'loginHistory');
    addDoc(loginHistory, { email: email, date: new Date() });
  }

  getUserName(email: string): Observable<string> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    return new Observable<string>((observer) => {
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          observer.next(doc.data()['username']);
        });
        observer.complete();
      });
    });
  }
}
