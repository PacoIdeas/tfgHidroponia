



export class Cultivo {

  id_cultivo: number  ;
  Nombre: string  ;
  imagen: string  ;


  rango_CE_min: number  ;
  rango_CE_max: number  ;

  rango_pH_min: number ;
  rango_pH_max: number  ;

  rango_temperatura_SN_max: number  ;
  rango_temperatura_SN_min: number  ;

  rango_temperatura_max: number  ;
  rango_temperatura_min: number  ;

  rango_humedad_max: number  ;
  rango_humedad_min: number  ;

  rango_lux_max: number  ;
  rango_lux_min: number  ;


  Fecha_Creacion: Date  ;



  // Constructor que acepta un argumento opcional de tipo number o string
  constructor(valor:  null) {

    this.id_cultivo =  0;
    this.Nombre =  " ";
    this.imagen =  " ";

    this.rango_CE_min=   0;
    this.rango_CE_max=   0;

    this.rango_humedad_max=   0;
    this.rango_humedad_min=   0;

    this.rango_pH_min=   0;
    this.rango_pH_max=   0;

    this.rango_temperatura_SN_max=   0;
    this.rango_temperatura_SN_min=   0;

    this.rango_temperatura_max=   0;
    this.rango_temperatura_min=   0;

    this.rango_lux_max=   0;
    this.rango_lux_min=   0;

    this.Fecha_Creacion =   new Date();
  }


}
