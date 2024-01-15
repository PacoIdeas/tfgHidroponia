import { Component, OnInit, OnDestroy} from '@angular/core';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { CultivosService } from 'src/app/servicios/cultivos.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Cultivo } from 'src/app/modelos/cultivo';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  cultivosDisponibles!: any[];
  items: any = [];



  constructor(public comunesService: ComunesService, public cultivosService: CultivosService, private confirmationService: ConfirmationService, private messageService: MessageService,  public router: Router) {

  }



  elimina_cultivo(cultivo: any){
    this.cultivosService.cultivoSeleccionado = new Cultivo(null);
    this.cultivosService.delete_cultivo(cultivo);

  }











  ngOnInit() {


    this.items = [
      {
        label:"",
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {

              this.router.navigateByUrl("/home");
            }
          }

        ]
      },
      {
        label: 'Observación del cultivo',
        items: [


            {
              label: 'Datos atmosféricos',
              icon: 'pi pi-info-circle',
              command: () => {
                //   this.update();
                this.cultivosService.sidebarVisible = false;
              }
            },
            {
              label: 'Datos de la solucion nutritiva',
              icon: 'pi pi-info-circle',
              command: () => {

                this.cultivosService.sidebarVisible = false;
              }
            },
            {
              label: 'Editar cultivo',
              icon: 'pi pi-pencil',
              command: () => {

                this.router.navigateByUrl("add-edit-cultivo");         /////TODO
                this.cultivosService.sidebarVisible = false;

              }
            },

        ]
      },
      {
        label: 'Parametros de configuracion',
        items: [
            {
                label: 'Parametros del cultivo',
                icon: 'pi pi-pencil',
                command: () => {

                  this.router.navigateByUrl("parametros");
                  this.cultivosService.sidebarVisible = false;
                }

            },
            {
                label: 'Notificaciones',
                icon: 'pi pi-sliders-h',
                command: () => {
                  this.router.navigateByUrl("alertas");
                  this.cultivosService.sidebarVisible = false;
                }

            },
            {
                label: 'Programación horaria',
                icon: 'pi pi-clock',
                command: () => {
                  this.router.navigateByUrl("programacion-horaria");
                  this.cultivosService.sidebarVisible = false;
                }

            }
        ]
      }
  ];


  }

}
