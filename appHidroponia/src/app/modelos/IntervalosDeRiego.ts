

export class Intervalos {

  momento: string;
  minutos_on: number;
  minutos_off: number;


  // Constructor que acepta un argumento opcional de tipo number o string
  constructor(momento: string, minutos_on: number, minutos_off: number) {

    this.momento = momento;
    this.minutos_on = minutos_on;
    this.minutos_off = minutos_off;

  }


}
