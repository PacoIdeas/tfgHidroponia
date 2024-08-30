import { Component, OnInit  } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { CultivosService } from 'src/app/servicios/cultivos.service';
import datoRecogido from 'src/app/modelos/datosRecogidos';
import { Cultivo } from 'src/app/modelos/cultivo';
@Component({
  selector: 'app-datos-atmosfericos',
  templateUrl: './datos-atmosfericos.component.html',
  styleUrls: ['./datos-atmosfericos.component.css']
})
export class DatosAtmosfericosComponent implements OnInit {
  datosTemperatura: datoRecogido[] = [];
  datosHumedad: datoRecogido[] = [];
  datosLuminosidad: datoRecogido[] = [];
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
          let datoRecTemp = {
            momento: dato.fecha_hora,
            parametro: 'temperatura',
            valor: dato.temp_ambiente
          }
          this.datosTemperatura.push(datoRecTemp)

          let datoRecHumedad = {
            momento: dato.fecha_hora,
            parametro: 'humedad',
            valor: dato.humedad
          }
          this.datosHumedad.push(datoRecHumedad)

          let datoRecLuminosidad = {
            momento: dato.fecha_hora,
            parametro: 'luminosidad',
            valor: dato.luminosidad
          }
          this.datosLuminosidad.push(datoRecLuminosidad)
        })
        if(data.length > 0){
          this.cargados = true;
        }

      }
    )
  }

  onDropdownChange(event: { originalEvent: Event, value: SelectItem }, cultivoSelec: Cultivo) {
    this.cargados = false;
    this.datosTemperatura = [];
    this.datosHumedad = [];
    this.datosLuminosidad = [];
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
