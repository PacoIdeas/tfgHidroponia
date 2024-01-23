import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { CultivosService } from 'src/app/servicios/cultivos.service';
import { Cultivo } from 'src/app/modelos/cultivo';

import { MessageService } from 'primeng/api';



interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}



@Component({
  selector: 'app-info-basica-cultivos-activos',
  templateUrl: './info-basica-cultivos-activos.component.html',
  styleUrls: ['./info-basica-cultivos-activos.component.css']
})





export class InfoBasicaCultivosActivosComponent implements OnInit {
visualizarCultivo() {
throw new Error('Method not implemented.');
}



  cultivos!: Cultivo[];
  cultivoActivoSeleccionado!: Cultivo;

  laziLoadOnInit: boolean = false;
  constructor(private autentificacionService: AutentificacionService, private messageService: MessageService, public comunesService: ComunesService, public cultivosService: CultivosService) {


  }

  first: number = 0;

  rows: number = 10;


  inicializa_cultivos(){


    this.cultivosService.getCultivos().subscribe((data: any[]) => {

      if(data != null){
        this.cultivosService.cultivosDisponibles = data;
        this.cultivosService.cultivoSeleccionado = this.cultivosService.cultivosDisponibles[0];
        this.cultivos = data;
        this.laziLoadOnInit = true;

        this.cultivoActivoSeleccionado = this.cultivos[0];
      }


    });

  }


  onPageChange(event: PageEvent | any) {
    this.first = event.first;
    this.cultivoActivoSeleccionado = this.cultivos[event.page];



  }



  ngOnInit() {
    this.inicializa_cultivos();



  }






}
