




export class Usuario {

  username: string | null;
  password: string | null;
  roll: string | null;


  id_usuario: number = 0;


  // Constructor que acepta un argumento opcional de tipo number o string
  constructor(valor: null) {

    this.username = null;
    this.password = null;
    this.id_usuario = 0;
    this.roll = null;
  }


}
