import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

export interface GamesList {
  number: string;
  title: string;
  description: string;
  img: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatGridListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  authService = inject(AuthService);
  router = inject(Router);
  username: string = '';
  title: string = '¿Qué te gustaría jugar hoy?';
  gamesList: GamesList[] = [
    {
      number: '01',
      title: 'El Ahorcado',
      description: 'Una descripcion',
      img: '../../../assets/HangInThere.jpeg',
    },
    {
      number: '02',
      title: 'Mayor o Menor',
      description: 'Una descripcion',
      img: '../../../assets/HangInThere.jpeg',
    },
    {
      number: '03',
      title: 'Preguntados',
      description: 'Una descripcion',
      img: '../../../assets/HangInThere.jpeg',
    },
    {
      number: '04',
      title: 'Elementos',
      description: 'Una descripcion',
      img: '../../../assets/HangInThere.jpeg',
    },
  ];

  ngOnInit(): void {
    // TODO: buscar una mejor forma de manejar esto
    this.authService.user$.subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/onboarding');
      } else {
        this.username = user.displayName?.toLocaleLowerCase() ?? '';
        this.title = `¿Qué te gustaría jugar @${this.username}?`;
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
