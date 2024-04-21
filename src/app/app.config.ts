import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCk8MAZeoFPX1hGAWxdgGdLvY72yeOWo0',
  authDomain: 'saladejuegosangular.firebaseapp.com',
  projectId: 'saladejuegosangular',
  storageBucket: 'saladejuegosangular.appspot.com',
  messagingSenderId: '175468559498',
  appId: '1:175468559498:web:973c3bee8dfab516bc4173',
  measurementId: 'G-MJGQW775CC',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
    ]),
  ],
};
