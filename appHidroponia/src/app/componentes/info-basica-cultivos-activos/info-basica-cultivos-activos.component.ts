import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { CultivosService } from 'src/app/servicios/cultivos.service';
import { Cultivo } from 'src/app/modelos/cultivo';
import { datosCultivoActuales } from 'src/app/modelos/datosCultivoActuales';
import { MessageService } from 'primeng/api';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { DialogModule } from 'primeng/dialog';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}



@Component({
  selector: 'app-info-basica-cultivos-activos',
  templateUrl: './info-basica-cultivos-activos.component.html',
  styleUrls: ['./info-basica-cultivos-activos.component.css'],
})





export class InfoBasicaCultivosActivosComponent implements OnInit {






  cultivos!: Cultivo[];
  cultivoActivoSeleccionado!: Cultivo;

  laziLoadOnInit: boolean = false;

  info_imagen: boolean = false;
  visibleEditarEC: boolean = false;
  constructor( private messageService: MessageService, public imagenesService: ImagenesService, public comunesService: ComunesService, public cultivosService: CultivosService) {


  }

  first: number = 0;

  rows: number = 10;
  cargando_imagen: boolean = false;


  inicializa_cultivos(){


    this.cultivosService.getCultivos().subscribe((data: any[]) => {

      if(data != null){
        this.cultivosService.cultivosDisponibles = data;
        this.cultivosService.cultivoSeleccionado = this.cultivosService.cultivosDisponibles[0];
        this.cultivos = data;
        this.laziLoadOnInit = true;

        this.cultivoActivoSeleccionado = this.cultivos[0];

        this.datosActualesDelCultivo(this.cultivoActivoSeleccionado.id_cultivo);

      }


    });

  }

  datosActualesDelCultivo(id_cultivo: number) {






    this.cultivosService.getDatosCultivoActuales(id_cultivo).subscribe((data: any) => {
      console.log(data);
      this.cultivosService.datosCultivoActuales = data;

      var fechaInicio = new Date(this.cultivosService.datosCultivoActuales.fecha);
      var fechaActual = new Date();
      var diferenciaEnMilisegundos = fechaActual.getTime() - fechaInicio.getTime();

      // Convertir la diferencia de milisegundos a días
      var diasTranscurridos = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

      this.cultivosService.datosCultivoActuales.dias_transcurridos = diasTranscurridos;
    });

  }


  onPageChange(event: PageEvent | any) {
    this.first = event.first;
    this.cultivoActivoSeleccionado = this.cultivos[event.page];
    this.datosActualesDelCultivo(this.cultivoActivoSeleccionado.id_cultivo);
  }

  actualizaImagen(id_cultivo: number) {
    this.cargando_imagen = true;

    this.imagenesService.getImagenActual(id_cultivo).pipe(
      catchError(error => {
        console.error('Error al obtener la imagen:', error);
        this.cargando_imagen = false; // Set cargando_imagen to false in case of error
        return throwError('Error al obtener la imagen'); // Throw a new error observable
      })
    ).subscribe((captura: any) => {
      console.log("la imagen es: ", captura.nombre);
      this.cultivosService.cultivoSeleccionado.imagen = captura.nombre;
      this.cargando_imagen = false;
    });

  }


  verActualizarEC() {

    this.visibleEditarEC = true;
  }
  actualizaEC(id_cultivo: number) {
    this.visibleEditarEC = false;
    this.cultivosService.postActualizarEC(id_cultivo, this.cultivosService.datosCultivoActuales.EC).subscribe((data: any) => {
      if(data.status == 200){
        this.messageService.add({severity:'success', summary:'EC actualizada', detail: 'Se ha actualizado la EC correctamente'});
      }else{
        this.messageService.add({severity:'error', summary:'Error', detail: 'No se ha podido actualizar la EC'});
      }
    });
  }


  ngOnInit() {
    this.inicializa_cultivos();



  }






}
