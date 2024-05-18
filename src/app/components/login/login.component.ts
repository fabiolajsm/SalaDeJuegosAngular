import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FirebaseError } from 'firebase/app';
import { authErrors } from '../onboardingErrors';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: '../onboardingForms.css',
})
export class LoginComponent {
  constructor(private spinner: NgxSpinnerService) {}
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string | null = null;

  handleSubmit(): void {
    this.errorMessage = null;
    const rawForm = this.form.getRawValue();
    if (!rawForm.email || !rawForm.password) {
      this.errorMessage = 'Debe completar todos los campos';
      return;
    }
    this.spinner.show();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
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
  handleQuickAccess(): void {
    this.spinner.show();
    const quickAccessUsers = [
      'agua@gmail.com',
      'fuego@gmail.com',
      'tierra@gmail.com',
    ];
    const emailSelected =
      quickAccessUsers[Math.floor(Math.random() * quickAccessUsers.length)];
    this.getQuickAccessUsers(emailSelected);
  }

  getQuickAccessUsers(email: string) {
    this.authService.getUsers().subscribe((userData) => {
      userData.forEach((usuario) => {
        if ((usuario as any).email == email) {
          this.form.controls['email'].setValue((usuario as any).email);
          this.form.controls['password'].setValue((usuario as any).password);
          this.spinner.hide();
        }
      });
    });
  }
}
