import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FirebaseError } from 'firebase/app';
import { authErrors } from '../onboardingErrors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: '../onboardingForms.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  errorMessage: string | null = null;

  handleSubmit(): void {
    const rawForm = this.form.getRawValue();
    if (!rawForm.email || !rawForm.password) {
      this.errorMessage = 'Debe completar todos los campos';
      return;
    }
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (err: FirebaseError) => {
        let errorMessage = 'Se produjo un error desconocido.';
        for (const error of authErrors) {
          if (error.code === err.code) {
            errorMessage = error.message;
            break;
          }
        }
        this.errorMessage = errorMessage;
      },
    });
  }
  handleQuickAccess(): void {
    console.log('holaa');
  }
}
