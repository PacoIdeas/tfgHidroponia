import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { Cultivo } from 'src/app/modelos/cultivo';

import { CultivosService } from 'src/app/servicios/cultivos.service';
import { AddEditCultivoComponent } from 'src/app/vistas/add-edit-cultivo/add-edit-cultivo.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-cultivos-predeterminados',
  templateUrl: './cultivos-predeterminados.component.html',
  styleUrls: ['./cultivos-predeterminados.component.css'],
  providers: [DynamicDialogRef]
})
export class CultivosPredeterminadosComponent {




  constructor(public cultivosService: CultivosService, public addEditCultivoComponent: AddEditCultivoComponent, public messageService: MessageService, private cd: ChangeDetectorRef) {}


  initCultivosPredefinidos(){

    this.cultivosService.getCultivosPredefinidos().subscribe((data: any[]) => {

      this.cultivosService.cultivosPredefinidos = data;
      this.cd.markForCheck();
    })
  }


  cultivoPredefinidoSeleccionado(cultivoPredefSelec: Cultivo){
    this.cultivosService.cultivosDisponibles[this.cultivosService.cultivosDisponibles.length] = cultivoPredefSelec
    cultivoPredefSelec.Fecha_Creacion = new Date();

    this.cultivosService.add_eddit_cultivo(cultivoPredefSelec).subscribe((res: any) => {

    },error => {console.log(error);});

    setTimeout(() => {
      this.cultivosService.getCultivos().subscribe(
        data => {
          this.cultivosService.cultivosDisponibles = data;
        }
      )
    }, 200);


    this.messageService.add({ severity: 'success', summary: 'Cultivo creado', detail: `Nombre: ${cultivoPredefSelec.Nombre}` });



    this.addEditCultivoComponent.ref?.close();


  }



  ngOnInit() {
    this.initCultivosPredefinidos();

  }




}
