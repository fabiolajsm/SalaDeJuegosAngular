import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  // implements OnInit
  authService = inject(AuthService);
  // cambiar y poner en el home
  // ngOnInit(): void {
  //   this.authService.user$.subscribe((user) => {
  //     if (user) {
  //       this.authService.currentUserSig.set({
  //         email: user.email!,
  //         username: user.displayName!,
  //       });
  //     } else {
  //       this.authService.currentUserSig.set(null);
  //     }
  //   });
  // }

  // logout(): void {
  //   this.authService.logout();
  // }

}
