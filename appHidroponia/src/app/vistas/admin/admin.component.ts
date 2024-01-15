import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { CultivosService } from 'src/app/servicios/cultivos.service';
import { Cultivo } from 'src/app/modelos/cultivo';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})




export class AdminComponent implements OnInit{

  cultivos!: Cultivo[];


  laziLoadOnInit: boolean = false;
  constructor(private autentificacionService: AutentificacionService, private messageService: MessageService, public comunesService: ComunesService, public cultivosService: CultivosService) {


  }










  ngOnInit() {




  }



}
