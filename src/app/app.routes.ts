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
    title: 'Onboarding page',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register page',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'aboutMe',
    component: AboutMeComponent,
    title: 'About me',
  },
];
