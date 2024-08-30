



export class InfoNotificaciones {

  id_notificacion: number;
  id_cultivo: number | null ;
  mensaje: string  ;
  severity: string  ;
  fechaHoraNotificacion: Date;
  fechaHoraVista: Date | null;

  // Constructor que acepta un argumento opcional de tipo number o string
  constructor(id_cultivo: null | number) {

    this.id_notificacion = 0;
    this.id_cultivo = id_cultivo;
    this.mensaje =  "";
    this.severity =" ";
    this.fechaHoraNotificacion = new Date();
    this.fechaHoraVista = null;
  }


}
