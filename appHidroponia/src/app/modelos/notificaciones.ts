



export class Notificacion {

  id_notificacion: number;
  id_cultivo: number | null ;
  parametro: string  ;
  severity: string  ;


  // Constructor que acepta un argumento opcional de tipo number o string
  constructor(id_cultivo: null | number) {

    this.id_notificacion = 0;
    this.id_cultivo = id_cultivo;
    this.parametro =  "";
    this.severity =" ";
  }


}
