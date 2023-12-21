import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { CultivosService } from 'src/app/servicios/cultivos.service';


import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})




export class AdminComponent implements OnInit{





  constructor(private autentificacionService: AutentificacionService, private messageService: MessageService, public comunesService: ComunesService, public cultivosService: CultivosService) {


  }



  inicializa_cultivos(){


    this.cultivosService.getCultivos().subscribe((data: any[]) => {

      if(data != null){
        this.cultivosService.cultivosDisponibles = data;
        this.cultivosService.cultivoSeleccionado = this.cultivosService.cultivosDisponibles[0];


      }


    });

  }







  ngOnInit() {
    this.inicializa_cultivos();



  }



}
