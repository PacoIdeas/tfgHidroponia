

export class Cultivo {

  id_cultivo: number | null;
  nombre: string | null;
  niveles_ambientales: string | null;
  niveles_SN: string | null;
  fecha_creacion: Date | null;


  // Constructor que acepta un argumento opcional de tipo number o string
  constructor(valor: null) {

    this.nombre = null;
    this.niveles_ambientales = null;
    this.id_cultivo = null;
    this.niveles_SN = null;
    this.fecha_creacion = null;
  }


}
