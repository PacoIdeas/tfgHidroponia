import { Component, OnInit } from '@angular/core';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { SidebarService } from 'src/app/servicios/sidebar.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { Cultivo } from 'src/app/modelos/cultivo';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  cultivosDisponibles!: any[];
  items: any = [];


  constructor(public comunesService: ComunesService, public sidebarService: SidebarService, private confirmationService: ConfirmationService, private messageService: MessageService) {

  }

  inicializa_cultivos(){

    this.sidebarService.getCultivos().subscribe((data: any[]) => {

      this.sidebarService.cultivosDisponibles = data;
      this.sidebarService.cultivoSeleccionado = this.sidebarService.cultivosDisponibles[0];

     });

  }

  edit_add_cultivo(cultivo: any){


  }

  elimina_cultivo(cultivo: any){
    this.sidebarService.cultivoSeleccionado = new Cultivo(null);
    this.sidebarService.delete_cultivo(cultivo);

  }











  ngOnInit() {
    this.inicializa_cultivos();

    this.items = [
      {

          label: 'Observación del cultivo',
          items: [


              {
                label: 'Datos atmosféricos',
                icon: 'pi pi-info-circle',
                command: () => {
                  //   this.update();
                }
              },
              {
                label: 'Datos de la solucion nutritiva',
                icon: 'pi pi-info-circle',
                command: () => {
                  //   this.delete();
                }
              },
              {
                label: 'Añadir/editar cultivo',
                icon: 'pi pi-plus-circle',
                command: () => {
                  // this.update();
                }
              },
              {
                label: 'Borrar cultivo',
                icon: 'pi pi-trash',
                command: () => {
                  //   this.delete();
                }
              }
          ]
      },
      {
          label: 'Parametros de configuracion',
          items: [
              {
                  label: 'Niveles de alerta',
                  icon: 'pi pi-sliders-h',

              },
              {
                  label: 'Programación horaria',
                  icon: 'pi pi-clock',

              }
          ]
      }
  ];


  }

}
