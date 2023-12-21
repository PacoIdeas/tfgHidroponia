import { Component, OnInit, OnDestroy} from '@angular/core';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { CultivosService } from 'src/app/servicios/cultivos.service';
import { ConfirmationService,ConfirmEventType ,MessageService} from 'primeng/api';
import { Router } from '@angular/router';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CultivosPredeterminadosComponent } from 'src/app/componentes/cultivos-predeterminados/cultivos-predeterminados.component';
import { Cultivo } from 'src/app/modelos/cultivo';


@Component({
  selector: 'app-add-edit-cultivo',
  templateUrl: './add-edit-cultivo.component.html',
  styleUrls: ['./add-edit-cultivo.component.css'],
  providers: [DialogService]

})





export class AddEditCultivoComponent implements OnInit{



  cultivos!: Cultivo[];

  cols!: any[];

  dialogo_editar_cultivo!: boolean;

  constructor(public comunesService: ComunesService, public cultivosService: CultivosService, private confirmationService: ConfirmationService,public dialogService: DialogService,  private messageService: MessageService,  public router: Router) {

  }




  obtenerCultivos() {
    this.cultivosService.getCultivos().subscribe(
      data => {
        this.cultivos = data;
        this.cultivosService.cultivosDisponibles = data;
      }
    )
  }


  ref: DynamicDialogRef | undefined;

  mostrarCultivosPredefinidos() {


    this.ref = this.dialogService.open(CultivosPredeterminadosComponent, {
      header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        cultivosPredefinidos: this.cultivosService.cultivosPredefinidos
      }
    });

   this.ref.onClose.subscribe((cultivo: Cultivo) => {
      if (cultivo != null) {
          this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: `Name: ${cultivo.Nombre}` });
      }
    });


    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });


  }



  Dialog_edit_cultivo(cultivo: Cultivo) {

    this.cultivosService.cultivoSeleccionado = cultivo;

    if(!this.dialogo_editar_cultivo){
      this.dialogo_editar_cultivo = true;
    }else{
      this.dialogo_editar_cultivo = false;
    }
  }

  editar_cultivo(cultivo: Cultivo) {
    this.cultivosService.cultivoSeleccionado = cultivo;
    this.cultivosService.add_eddit_cultivo(cultivo).subscribe(
      data => {
        this.cultivosService.cultivosDisponibles[this.cultivosService.cultivosDisponibles.indexOf(cultivo)] = data;
      }
    )
    this.Dialog_edit_cultivo(cultivo);

  }

  ver_parametros(cultivo: Cultivo) {
    this.cultivosService.cultivoSeleccionado = cultivo;
    this.router.navigateByUrl("parametros");
  }


  eliminarCultivo(cultivo: Cultivo) {
    this.cultivosService.delete_cultivo(cultivo).subscribe(
      data => {

      }
    )
      setTimeout(() => {
        this.obtenerCultivos()
      }, 400);
  }

  confirmDelete(cultivo: Cultivo) {

    this.confirmationService.confirm({
        message: '¿Deseas eliminar este cultivo?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.eliminarCultivo(cultivo);
        },
        reject: () => {


        },
    });
  };



  ngOnInit() {
    this.dialogo_editar_cultivo = false;
    setTimeout(() => {
      this.obtenerCultivos();
    },1000);


    this.cols = [
        { field: 'id_cultivo', header: 'ID' },
        { field: 'Nombre', header: 'Nombre' },

        { field: 'Fecha_Creacion', header: 'Fecha de creacion' }
    ];
  }

  // ngOnDestroy() {
  //   if (this.ref) {
  //       this.ref.close();
  //   }
}

