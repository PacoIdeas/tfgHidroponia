import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { SidebarService } from 'src/app/servicios/sidebar.service';


import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})




export class AdminComponent implements OnInit{





  constructor(private autentificacionService: AutentificacionService, private messageService: MessageService, public comunesService: ComunesService, public sidebarService: SidebarService) {


  }


  // mostrar_sidebar(){

  //   this.comunesService.sidebarVisible = !this.comunesService.sidebarVisible;
  // }

  logOut(): void{
    console.log("saliendo");
    this.autentificacionService.salir();
  }






  ngOnInit() {

  }



}
