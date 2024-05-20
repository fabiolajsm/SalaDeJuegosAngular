import { Routes } from '@angular/router';

import { AboutMeComponent } from './components/about-me/about-me.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/onboarding', pathMatch: 'full' },
  {
    path: 'onboarding',
    component: OnboardingComponent,
    title: 'Onboarding',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Sala de juegos',
  },
  {
    path: 'aboutMe',
    loadComponent: () =>
      import('./components/about-me/about-me.component').then(
        (c) => c.AboutMeComponent
      ),
    title: 'Acerca de mi',
  },
  {
    path: 'hangman',
    loadComponent: () =>
      import('./components/hangman/hangman.component').then(
        (c) => c.HangmanComponent
      ),
    title: 'Ahorcado',
  },
  {
    path: 'greater-or-less',
    loadComponent: () =>
      import('./components/greater-or-less/greater-or-less.component').then(
        (c) => c.GreaterOrLessComponent
      ),
    title: 'Mayor o Menor',
  },
  {
    path: 'trivia',
    loadComponent: () =>
      import('./components/trivia/trivia.component').then(
        (c) => c.TriviaComponent
      ),
    title: 'Preguntados',
  },
  {
    path: 'elements',
    loadComponent: () =>
      import('./components/elements/elements.component').then(
        (c) => c.ElementsComponent
      ),
    title: 'Elementos',
  },
];
