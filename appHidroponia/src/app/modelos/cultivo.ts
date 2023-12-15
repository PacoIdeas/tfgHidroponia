

export class Cultivo {

  id_cultivo: number | null;
  Nombre: string | null;
  imagen: string | null;


  rango_CE_min: number | null;
  rango_CE_max: number | null;

  rango_pH_min: number | null;
  rango_pH_max: number | null;

  rango_temperatura_SN_max: number | null;
  rango_temperatura_SN_min: number | null;

  rango_temperatura_max: number | null;
  rango_temperatura_min: number | null;

  rango_humedad_max: number | null;
  rango_humedad_min: number | null;


  Fecha_Creacion: Date | null;



  // Constructor que acepta un argumento opcional de tipo number o string
  constructor(valor: null) {

    this.id_cultivo = null;
    this.Nombre = null;
    this.imagen = null;

    this.rango_CE_min=  null;
    this.rango_CE_max=  null;

    this.rango_humedad_max=  null;
    this.rango_humedad_min=  null;

    this.rango_pH_min=  null;
    this.rango_pH_max=  null;

    this.rango_temperatura_SN_max=  null;
    this.rango_temperatura_SN_min=  null;

    this.rango_temperatura_max=  null;
    this.rango_temperatura_min=  null;


    this.Fecha_Creacion = null;
  }


}
