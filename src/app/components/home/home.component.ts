import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    // TODO: buscar una mejor forma de manejar esto
    this.authService.user$.subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/onboarding');
      }
    });
  }

  handleLogout(): void {
    // TODO: mostrar modal de seguro quiere cerrar sesion?
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/onboarding');
      },
      error: () => {
        console.log('wtf');
        // TODO
      },
    });
  }
}
