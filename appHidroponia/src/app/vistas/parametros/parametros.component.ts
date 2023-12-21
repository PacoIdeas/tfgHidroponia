import { Component, OnInit, OnDestroy} from '@angular/core';
import { CultivosService } from 'src/app/servicios/cultivos.service';
import { MessageService} from 'primeng/api';
import { Router } from '@angular/router';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CultivosPredeterminadosComponent } from 'src/app/componentes/cultivos-predeterminados/cultivos-predeterminados.component';
import { Cultivo } from 'src/app/modelos/cultivo';

import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css'],
  providers: [DialogService, MessageService]
})
export class ParametrosComponent implements OnInit {


  cultivoedit: Cultivo = new Cultivo(null);



  cols_hambientales!: any[];
  cols_solucion!: any[];


  constructor(  public dialogService: DialogService, public cultivosService: CultivosService, private messageService: MessageService,  public router: Router) { }


  cultivoEdit_igual_cultivoSeleccionado() {

    this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Se han descartado los cambios"});
    this.cultivoedit.id_cultivo = this.cultivosService.cultivoSeleccionado.id_cultivo;
    this.cultivoedit.Nombre = this.cultivosService.cultivoSeleccionado.Nombre;
    this.cultivoedit.imagen = this.cultivosService.cultivoSeleccionado.imagen;
    this.cultivoedit.rango_CE_min = this.cultivosService.cultivoSeleccionado.rango_CE_min;
    this.cultivoedit.rango_CE_max = this.cultivosService.cultivoSeleccionado.rango_CE_max;
    this.cultivoedit.rango_pH_min = this.cultivosService.cultivoSeleccionado.rango_pH_min;
    this.cultivoedit.rango_pH_max = this.cultivosService.cultivoSeleccionado.rango_pH_max;
    this.cultivoedit.rango_temperatura_SN_max = this.cultivosService.cultivoSeleccionado.rango_temperatura_SN_max;
    this.cultivoedit.rango_temperatura_SN_min = this.cultivosService.cultivoSeleccionado.rango_temperatura_SN_min;
    this.cultivoedit.rango_temperatura_max = this.cultivosService.cultivoSeleccionado.rango_temperatura_max;
    this.cultivoedit.rango_temperatura_min = this.cultivosService.cultivoSeleccionado.rango_temperatura_min;
    this.cultivoedit.rango_humedad_max = this.cultivosService.cultivoSeleccionado.rango_humedad_max;
    this.cultivoedit.rango_humedad_min = this.cultivosService.cultivoSeleccionado.rango_humedad_min;
    this.cultivoedit.rango_lux_max = this.cultivosService.cultivoSeleccionado.rango_lux_max;
    this.cultivoedit.rango_lux_min = this.cultivosService.cultivoSeleccionado.rango_lux_min;
    this.cultivoedit.Fecha_Creacion = this.cultivosService.cultivoSeleccionado.Fecha_Creacion;
  }

  cultivoSelect_igual_cultivoEdit() {

    this.cultivosService.cultivoSeleccionado.id_cultivo = this.cultivoedit.id_cultivo;
    this.cultivosService.cultivoSeleccionado.Nombre = this.cultivoedit.Nombre;
    this.cultivosService.cultivoSeleccionado.imagen = this.cultivoedit.imagen;
    this.cultivosService.cultivoSeleccionado.rango_CE_min = this.cultivoedit.rango_CE_min;
    this.cultivosService.cultivoSeleccionado.rango_CE_max = this.cultivoedit.rango_CE_max;
    this.cultivosService.cultivoSeleccionado.rango_pH_min = this.cultivoedit.rango_pH_min;
    this.cultivosService.cultivoSeleccionado.rango_pH_max = this.cultivoedit.rango_pH_max;
    this.cultivosService.cultivoSeleccionado.rango_temperatura_SN_max = this.cultivoedit.rango_temperatura_SN_max;
    this.cultivosService.cultivoSeleccionado.rango_temperatura_SN_min = this.cultivoedit.rango_temperatura_SN_min;
    this.cultivosService.cultivoSeleccionado.rango_temperatura_max = this.cultivoedit.rango_temperatura_max;
    this.cultivosService.cultivoSeleccionado.rango_temperatura_min = this.cultivoedit.rango_temperatura_min;
    this.cultivosService.cultivoSeleccionado.rango_humedad_max = this.cultivoedit.rango_humedad_max;
    this.cultivosService.cultivoSeleccionado.rango_humedad_min = this.cultivoedit.rango_humedad_min;
    this.cultivosService.cultivoSeleccionado.rango_lux_max = this.cultivoedit.rango_lux_max;
    this.cultivosService.cultivoSeleccionado.rango_lux_min = this.cultivoedit.rango_lux_min;
    this.cultivosService.cultivoSeleccionado.Fecha_Creacion = this.cultivoedit.Fecha_Creacion;

  }





  guardar_cultivo(){

    this.cultivoSelect_igual_cultivoEdit();
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Parametros del cultivo editado correctamente'});
    this.cultivosService.add_eddit_cultivo(this.cultivoedit).subscribe((data: Cultivo) => {
    })

  }


  onDropdownChange(event: { originalEvent: Event, value: SelectItem }, cultivoSelec: Cultivo) {
    // Aquí puedes realizar acciones cuando se selecciona una nueva opción
    this.cultivoedit = new Cultivo(null);
    this.cultivoEdit_igual_cultivoSeleccionado();
    this.cultivosService.cultivoSeleccionado = cultivoSelec;
    console.log('Nueva opción seleccionada:', event.value);
    // Llamar a la función del componente que desees ejecutar

  }





  ngOnInit(): void {


    this.cultivoEdit_igual_cultivoSeleccionado();



    this.cols_hambientales = [
      { field: 'id_cultivo', header: 'ID' },
      { field: 'Nombre', header: 'Nombre' },

      { field: 'Fecha_Creacion', header: 'Fecha de creacion' }
    ];


  }


}
