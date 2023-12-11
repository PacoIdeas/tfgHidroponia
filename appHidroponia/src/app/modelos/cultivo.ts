

export class Cultivo {

  id_cultivo: number | null;
  Nombre: string | null;
  imagen: string | null;
  Niveles_ambientales: string | null;
  Niveles_SN: string | null;
  Fecha_Creacion: Date | null;


  // Constructor que acepta un argumento opcional de tipo number o string
  constructor(valor: null) {

    this.id_cultivo = null;
    this.Nombre = null;
    this.imagen = null;
    this.Niveles_ambientales = null;
    this.Niveles_SN = null;
    this.Fecha_Creacion = null;
  }


}
