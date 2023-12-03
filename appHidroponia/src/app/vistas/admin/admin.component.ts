import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  sidebarVisible: boolean = false;



  constructor(private autentificacionService: AutentificacionService, private messageService: MessageService,){


  }




  logOut(): void{
    console.log("saliendo");
    this.autentificacionService.salir();
  }






  ngOnInit() {

  }



}
