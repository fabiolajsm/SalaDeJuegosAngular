import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  constructor(private router: Router) {}
  email = 'suarezfabiola17@gmail.com';
  description =
    '¡Hola! Esta web es una de mis prácticas desarrolladas principalmente con las tecnologías Angular y Firebase, complementadas con CSS, HTML y Angular Material. Se trata de una "Sala de Juegos" diseñada para que los usuarios, es decir, los jugadores, puedan poner a prueba y mejorar sus habilidades cognitivas y motoras.<br>Los juegos son intuitivos y fáciles de usar.<br><br>Los juegos disponibles son: Ahorcado, Mayor o Menor, Preguntados y uno creado por mí llamado Elementos, donde los jugadores eligen a su elemento favorito y lo acompañan a resolver ejercicios matemáticos, está diseñado para niños. ¡Espero que los disfrutes!';

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
