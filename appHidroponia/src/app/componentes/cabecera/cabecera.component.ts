import { Component, OnInit } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { SidebarService } from 'src/app/servicios/sidebar.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit{






  constructor(private autentificacionService: AutentificacionService,private router: Router, private messageService: MessageService, public comunesService: ComunesService, public sidebarService: SidebarService) {


  }


  logOut(): void{
    console.log("saliendo");
    this.autentificacionService.salir();
  }

  home(): void{
    this.router.navigateByUrl("/"+this.autentificacionService.usuario.roll);
  }


  ngOnInit(): void {

  }


}
