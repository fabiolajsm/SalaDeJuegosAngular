export class Cards {
  value!: string;
  imagen!: string;

  constructor(value: string, imagen: string) {
    this.imagen = imagen;
    switch (value) {
      case 'JACK':
        this.value = '11';
        break;
      case 'QUEEN':
        this.value = '12';
        break;
      case 'KING':
        this.value = '13';
        break;
      case 'ACE':
        this.value = '1';
        break;
      default:
        this.value = value;
    }
  }
}
