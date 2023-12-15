import { Component, OnInit, OnDestroy} from '@angular/core';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { SidebarService } from 'src/app/servicios/sidebar.service';
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



  constructor(public comunesService: ComunesService, public sidebarService: SidebarService, private confirmationService: ConfirmationService, private messageService: MessageService,  public router: Router) {

  }

  inicializa_cultivos(){

    this.sidebarService.getCultivos().subscribe((data: any[]) => {

      this.sidebarService.cultivosDisponibles = data;
      this.sidebarService.cultivoSeleccionado = this.sidebarService.cultivosDisponibles[0];

     });

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
                  this.sidebarService.sidebarVisible = false;
                }
              },
              {
                label: 'Datos de la solucion nutritiva',
                icon: 'pi pi-info-circle',
                command: () => {
                  //   this.delete();
                  this.sidebarService.sidebarVisible = false;
                }
              },
              {
                label: 'Editar cultivo',
                icon: 'pi pi-pencil',
                command: () => {

                  this.router.navigateByUrl("add-edit-cultivo");         /////TODO
                  this.sidebarService.sidebarVisible = false;

                }
              },

          ]
      },
      {
          label: 'Parametros de configuracion',
          items: [
              {
                  label: 'Niveles de alerta',
                  icon: 'pi pi-sliders-h',
                  command: () => {
                    //   this.delete();
                    this.sidebarService.sidebarVisible = false;
                  }

              },
              {
                  label: 'Programación horaria',
                  icon: 'pi pi-clock',
                  command: () => {
                    //   this.delete();
                    this.sidebarService.sidebarVisible = false;
                  }

              }
          ]
      }
  ];


  }

}
