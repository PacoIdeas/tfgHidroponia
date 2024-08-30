import { Component, OnInit  } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { CultivosService } from 'src/app/servicios/cultivos.service';
import datoRecogido from 'src/app/modelos/datosRecogidos';
import { Cultivo } from 'src/app/modelos/cultivo';

@Component({
  selector: 'app-datos-sn',
  templateUrl: './datos-sn.component.html',
  styleUrls: ['./datos-sn.component.css']
})
export class DatosSNComponent implements OnInit {
  datosTemperatura_PH: datoRecogido[] = [];
  datosPH: datoRecogido[] = [];

  cargados = false;
  todosLosDatos: any;
  cultivosDisponibles: Cultivo[] = [];

  constructor(public cultivosService: CultivosService) { }

  getCultivosActuales() {
    this.cultivosService.getCultivos().subscribe(
      (data: Cultivo[]) => {
        this.cultivosService.cultivosDisponibles = data;
        this.cultivosDisponibles = data;
        if(!this.cultivosService.cultivoSeleccionado){
          this.cultivosService.cultivoSeleccionado = this.cultivosDisponibles[0];
        }

      }
    )
  }


  getDatosHistoricos( id_cultivo: number) {
    this.cultivosService.getHistorialDeDatos(id_cultivo).subscribe(
      (data: datoRecogido[]) => {

        this.todosLosDatos = data;
        this.todosLosDatos.forEach((dato: any) => {
          let datoRecTempPH = {
            momento: dato.fecha_hora,
            parametro: 'temp_SN',
            valor: dato.temp_ambiente
          }
          this.datosTemperatura_PH.push(datoRecTempPH)

          let datoRecPH = {
            momento: dato.fecha_hora,
            parametro: 'pH',
            valor: dato.humedad
          }
          this.datosPH.push(datoRecPH)

        })
        if(data.length > 0){
          this.cargados = true;
        }

      }
    )
  }

  onDropdownChange(event: { originalEvent: Event, value: SelectItem }, cultivoSelec: Cultivo) {
    this.cargados = false;
    this.datosTemperatura_PH = [];
    this.datosPH = [];
    this.cultivosService.cultivoSeleccionado = cultivoSelec;
    console.log('Nueva opción seleccionada:', event.value);
    this.getDatosHistoricos(this.cultivosService.cultivoSeleccionado.id_cultivo);


  }


  ngOnInit(): void {
    this.getCultivosActuales();
    setTimeout(() => {

      this.getDatosHistoricos(this.cultivosService.cultivoSeleccionado.id_cultivo);
    },300)

  }
}
