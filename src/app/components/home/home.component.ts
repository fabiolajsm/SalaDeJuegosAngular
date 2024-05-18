import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChatComponent } from '../chat/chat.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';

export interface GamesList {
  number: string;
  title: string;
  description: string;
  img: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    ChatComponent,
    MatBottomSheetModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

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
      img: '../../../assets/MayorMenor.jpeg',
    },
    {
      number: '03',
      title: 'Preguntados',
      description: 'Una descripcion',
      img: '../../../assets/Preguntados.jpeg',
    },
    {
      number: '04',
      title: 'Elementos',
      description: 'Una descripcion',
      img: '../../../assets/Elementos.jpeg',
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
        // TODO
        console.log('error en logout');
      },
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ChatComponent);
  }

  onGameClick(game: GamesList) {
    switch (game.title) {
      case 'El Ahorcado':
        this.router.navigate(['/hangman']);
        break;
      case 'Mayor o Menor':
        this.router.navigate(['/greater-or-less']);
        break;
      case 'Preguntados':
        this.router.navigate(['/trivia']);
        break;
      case 'Elementos':
        this.router.navigate(['/elements']);
        break;
      default:
        break;
    }
  }
}
