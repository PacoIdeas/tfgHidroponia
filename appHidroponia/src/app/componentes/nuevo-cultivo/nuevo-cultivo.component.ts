import { Component, OnInit } from '@angular/core';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { CultivosService } from 'src/app/servicios/cultivos.service';

import { Cultivo } from 'src/app/modelos/cultivo';


@Component({
  selector: 'app-nuevo-cultivo',
  templateUrl: './nuevo-cultivo.component.html',
  styleUrls: ['./nuevo-cultivo.component.css']
})





export class NuevoCultivoComponent implements OnInit {



  cultivosDisponibles!: any[];
  items: any = [];



  constructor(public comunesService: ComunesService, public cultivosService: CultivosService) {

  }






  ngOnInit() {


  }

}
