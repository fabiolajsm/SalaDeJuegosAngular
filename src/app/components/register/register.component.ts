import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { authErrors } from '../onboardingErrors';
import { FirebaseError } from 'firebase/app';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: '../onboardingForms.css',
})
export class RegisterComponent {
  constructor(private spinner: NgxSpinnerService) {}
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  handleSubmit(): void {
    this.errorMessage = null;
    const rawForm = this.form.getRawValue();
    if (!rawForm.email || !rawForm.password || !rawForm.username) {
      this.errorMessage = 'Debe completar todos los campos';
      return;
    }
    this.spinner.show();
    this.authService
      .register(rawForm.email, rawForm.username, rawForm.password)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.router.navigateByUrl('/home');
          this.authService.addToLoginHistory(rawForm.email);
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
          this.spinner.hide();
        },
      });
  }
}
