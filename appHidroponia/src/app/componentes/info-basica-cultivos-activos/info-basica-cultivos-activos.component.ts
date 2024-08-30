import { Component,ChangeDetectorRef ,EventEmitter, Output, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { CultivosService } from 'src/app/servicios/cultivos.service';
import { ParametrosService } from 'src/app/servicios/parametros.service';
import { Cultivo } from 'src/app/modelos/cultivo';
import { datosCultivoActuales } from 'src/app/modelos/datosCultivoActuales';
import { MessageService } from 'primeng/api';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { DialogModule } from 'primeng/dialog';
import { InfoNotificaciones } from 'src/app/modelos/info_notificaciones';

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




  @Output() imagenActualizada: EventEmitter<string> = new EventEmitter<string>();


  cultivos!: Cultivo[];
  cultivoActivoSeleccionado!: Cultivo;

  laziLoadOnInit: boolean = false;
  nocache: string = "";
  info_imagen: boolean = false;
  visibleEditarEC: boolean = false;

  mostrarNoficaciones: boolean = false;
  notificacionesNuevas: number = 0;
  notificaciones: InfoNotificaciones[] = [];
  constructor( private messageService: MessageService, public imagenesService: ImagenesService, public comunesService: ComunesService, public cultivosService: CultivosService, public parametrosService: ParametrosService, private cdr: ChangeDetectorRef) {


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
        this.obtenerNotificaciones(this.cultivoActivoSeleccionado.id_cultivo);
      }


    });

  }


  obtenerNotificaciones(id_cultivo: number){
    this.parametrosService.getInfoNotificaciones(id_cultivo).subscribe((data: any) => {
      this.notificaciones = data;
      if(this.notificaciones.length >0 ){
        this.notificacionesNuevas  = this.notificaciones.filter(notificacion => notificacion.fechaHoraVista === null).length;

      }
    });
  }

  mostrarNoficacionesFunction(){

    this.mostrarNoficaciones = !this.mostrarNoficaciones;
    const notificacionesNuevas = this.notificaciones.filter(notificacion => notificacion.fechaHoraVista === null);

    if(notificacionesNuevas.length > 0){
      this.parametrosService.putNotificacionesVistas( this.cultivoActivoSeleccionado.id_cultivo, notificacionesNuevas).subscribe();
    }
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
    this.cultivosService.cultivoSeleccionado.id_cultivo = id_cultivo;
    this.imagenesService.getImagenActual(id_cultivo).subscribe((captura: any) => {

      console.log("la imagen es: ", captura.nombre);
      this.cultivosService.cultivoSeleccionado.imagen = captura.nombre;
      this.cultivoActivoSeleccionado.imagen = captura.nombre;

      this.cargando_imagen = false;

    });



  }

  getNoCacheParam(): number {
    return new Date().getTime();
  }

  actualizarVista() {
    this.cdr.detectChanges();
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
      this.datosActualesDelCultivo(this.cultivoActivoSeleccionado.id_cultivo);
    });
  }
  cancelaActualizaEC(){
    this.visibleEditarEC = false;
    this.datosActualesDelCultivo(this.cultivoActivoSeleccionado.id_cultivo);
  }

  nofificaciones() {

  }

  ngOnInit() {
    this.inicializa_cultivos();
    this.actualizarVista();


  }






}
