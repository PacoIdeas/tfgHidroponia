import { Component, OnInit} from '@angular/core';
import { CultivosService } from 'src/app/servicios/cultivos.service';
import { MessageService} from 'primeng/api';
import { Router } from '@angular/router';

import { DialogService} from 'primeng/dynamicdialog';
import { Cultivo } from 'src/app/modelos/cultivo';
import { Notificacion } from 'src/app/modelos/notificaciones';
import { SelectItem } from 'primeng/api';
import { ParametrosService } from 'src/app/servicios/parametros.service';











@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css'],
  providers: [ DialogService,MessageService]
})










export class AlertasComponent implements OnInit {

  cultivoedit = new Cultivo(null);

  checked_diaria: boolean = false;
  checked_pH: boolean = false;
  checked_temperatura: boolean = false;
  checked_humedad: boolean = false;
  checked_EC: boolean = false;

  visible_guarda_cancela: boolean = false;

  constructor(   public cultivosService: CultivosService, public parametrosService: ParametrosService, private messageService: MessageService,  public router: Router) { }





  onDropdownChange(event: { originalEvent: Event, value: SelectItem }, cultivoSelec: Cultivo) {
    // Aquí puedes realizar acciones cuando se selecciona una nueva opción
    this.cultivoedit = new Cultivo(null);
    this.cultivosService.cultivoSeleccionado = cultivoSelec;

    this.inicializaSwitchNotificaciones();
    console.log('Nueva opción seleccionada:', event.value);
    this.visible_guarda_cancela = false;
    // Llamar a la función del componente que desees ejecutar

  }


  onSwitchChange(event: any){

    this.visible_guarda_cancela = true;
  }


 inicializaSwitAFalse(){
   this.checked_diaria = false;
   this.checked_pH = false;
   this.checked_temperatura = false;
   this.checked_humedad = false;
   this.checked_EC = false;
 }

  inicializaSwitchNotificaciones(){

    this.inicializaSwitAFalse()
    this.parametrosService.getNotificacionesActivas(this.cultivosService.cultivoSeleccionado.id_cultivo).subscribe(
      data => {
        this.parametrosService.notificacionesActivas = data;

        for(let noti of this.parametrosService.notificacionesActivas){
          if(noti.parametro == 'Diario'){
            this.checked_diaria = true;
          }
          if(noti.parametro == 'pH'){
            this.checked_pH = true;
          }
          if(noti.parametro == 'Temperatura'){
            this.checked_temperatura = true;
          }
          if(noti.parametro == 'Humedad'){
            this.checked_humedad = true;
          }
          if(noti.parametro == 'EC'){
            this.checked_EC = true;
          }
        }

      }
    )
  }


  guardar_notificaciones(){
    this.parametrosService.notificacionesActivas = [];

    this.messageService.add({severity : 'success', summary: "Success", detail: "Cambios realizados"});
    if(this.checked_diaria){
      const notificacion = new Notificacion(this.cultivosService.cultivoSeleccionado.id_cultivo);
      notificacion.parametro = 'Diario';
      this.parametrosService.notificacionesActivas.push(notificacion); // Agregar la notificación.
    }
    if(this.checked_EC){
      const notificacion = new Notificacion(this.cultivosService.cultivoSeleccionado.id_cultivo);
      notificacion.parametro = 'EC';
      this.parametrosService.notificacionesActivas.push(notificacion); // Agregar la notificación.
    }
    if(this.checked_humedad){
      const notificacion = new Notificacion(this.cultivosService.cultivoSeleccionado.id_cultivo);
      notificacion.parametro = 'Humedad';
      this.parametrosService.notificacionesActivas.push(notificacion); // Agregar la notificación.
    }
    if(this.checked_pH){
      const notificacion = new Notificacion(this.cultivosService.cultivoSeleccionado.id_cultivo);
      notificacion.parametro = 'pH';
      this.parametrosService.notificacionesActivas.push(notificacion); // Agregar la notificación.
    }
    if(this.checked_temperatura){
      const notificacion = new Notificacion(this.cultivosService.cultivoSeleccionado.id_cultivo);
      notificacion.parametro = 'Temperatura';
      this.parametrosService.notificacionesActivas.push(notificacion); // Agregar la notificación.
    }

    this.parametrosService.postGuardaNotificaciones(this.cultivosService.cultivoSeleccionado.id_cultivo, this.parametrosService.notificacionesActivas).subscribe(
      data => {
      }
    )

    this.visible_guarda_cancela = false;

  }




  restablece_notificaciones(){
    this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Se han descartado los cambios"});
    this.inicializaSwitchNotificaciones();
    this.visible_guarda_cancela = false;
  }


  ngOnInit(): void {

    this.inicializaSwitchNotificaciones();



    this.visible_guarda_cancela = false;



  }


}
