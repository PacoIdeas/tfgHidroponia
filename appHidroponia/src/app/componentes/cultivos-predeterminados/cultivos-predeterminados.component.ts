import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { Cultivo } from 'src/app/modelos/cultivo';

import { SidebarService } from 'src/app/servicios/sidebar.service';
import { AddEditCultivoComponent } from 'src/app/vistas/add-edit-cultivo/add-edit-cultivo.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-cultivos-predeterminados',
  templateUrl: './cultivos-predeterminados.component.html',
  styleUrls: ['./cultivos-predeterminados.component.css'],
  providers: [DynamicDialogRef]
})
export class CultivosPredeterminadosComponent {




  constructor(public sidebarService: SidebarService, public addEditCultivoComponent: AddEditCultivoComponent, public messageService: MessageService, private cd: ChangeDetectorRef) {}


  initCultivosPredefinidos(){

    this.sidebarService.getCultivosPredefinidos().subscribe((data: any[]) => {

      this.sidebarService.cultivosPredefinidos = data;
      this.cd.markForCheck();
    })
  }


  cultivoPredefinidoSeleccionado(cultivoPredefSelec: Cultivo){
    this.sidebarService.cultivosDisponibles[this.sidebarService.cultivosDisponibles.length] = cultivoPredefSelec
    this.sidebarService.add_eddit_cultivo(cultivoPredefSelec).subscribe((res: any) => {

    },error => {console.log(error);});

    setTimeout(() => {
      this.sidebarService.getCultivos().subscribe(
        data => {
          this.sidebarService.cultivosDisponibles = data;
        }
      )
    }, 500);


    this.messageService.add({ severity: 'success', summary: 'Cultivo creado', detail: `Nombre: ${cultivoPredefSelec.Nombre}` });



    this.addEditCultivoComponent.ref?.close();


  }



  ngOnInit() {
    this.initCultivosPredefinidos();

  }




}
