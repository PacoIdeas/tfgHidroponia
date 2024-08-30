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


  cultivoPredefinidoSeleccionado(cultivoPredefSelec: Cultivo){// nuevo cultivo
    cultivoPredefSelec.id_cultivo = 0;
    this.cultivosService.cultivosDisponibles[this.cultivosService.cultivosDisponibles.length] = cultivoPredefSelec;

    // Primero, generas la cadena en formato 'YYYY-MM-DD'
    var fechaActual = new Date();
    var year = fechaActual.getFullYear();
    var month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    var day = fechaActual.getDate().toString().padStart(2, '0');

    // Formatear la fecha como 'YYYY-MM-DD'
    var fechaFormateada = `${year}-${month}-${day}`;

    // Convertir la cadena 'YYYY-MM-DD' a un objeto Date
    cultivoPredefSelec.Fecha_Creacion = new Date(fechaFormateada);
    console.log(cultivoPredefSelec.Fecha_Creacion);

    this.cultivosService.add_eddit_cultivo(cultivoPredefSelec).subscribe((res: any) => {

    },error => {console.log(error);});

    setTimeout(() => {
      this.cultivosService.getCultivos().subscribe(
        data => {
          this.cultivosService.cultivosDisponibles = data;
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
