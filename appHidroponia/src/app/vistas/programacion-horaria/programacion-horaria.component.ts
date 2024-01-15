import { Component, OnInit} from '@angular/core';
import { CultivosService } from 'src/app/servicios/cultivos.service';
import { MessageService} from 'primeng/api';
import { Router } from '@angular/router';

import { DialogService} from 'primeng/dynamicdialog';
import { Cultivo } from 'src/app/modelos/cultivo';
import { Intervalos } from 'src/app/modelos/IntervalosDeRiego';

import { Notificacion } from 'src/app/modelos/notificaciones';
import { SelectItem } from 'primeng/api';
import { ParametrosService } from 'src/app/servicios/parametros.service';



@Component({
  selector: 'app-programacion-horaria',
  templateUrl: './programacion-horaria.component.html',
  styleUrls: ['./programacion-horaria.component.css'],
  providers: [ MessageService]
})




export class ProgramacionHorariaComponent implements OnInit {




  valor: number = 10;


  edit_horario_manana: Intervalos = new Intervalos("manana", 0, 0);
  edit_horario_tarde: Intervalos = new Intervalos("tarde", 0, 0);
  edit_horario_noche: Intervalos = new Intervalos("noche", 0, 0);
  edit_horario_madrugada: Intervalos = new Intervalos("madrugada", 0, 0);
  edit_horarios: Intervalos[] = [this.edit_horario_manana, this.edit_horario_tarde, this.edit_horario_noche, this.edit_horario_madrugada];

  visible_guarda_cancela: boolean = false;


  constructor(   public cultivosService: CultivosService, public parametrosService: ParametrosService, private messageService: MessageService,  public router: Router) { }



  onDropdownChange(event: any, cultivoSelec: Cultivo) {
    // // Aquí puedes realizar acciones cuando se selecciona una nueva opción

    this.cultivosService.cultivoSeleccionado = cultivoSelec;

    this.inicializaHorarios();

  }

  inicializaHorarios() {
    this.parametrosService.getHorarios(this.cultivosService.cultivoSeleccionado.id_cultivo).subscribe( data => {

      this.parametrosService.horarios = data;
      this.edit_horarios = [data[0], data[1], data[2], data[3]];
    }
    )
    this.visible_guarda_cancela = false;

  }

  cancelar() {
    this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Se han descartado los cambios"});
    this.inicializaHorarios();
    this.visible_guarda_cancela = false;
  }

  onValueChange(event: any, g: number) {
    this.visible_guarda_cancela = true;
  }


  guardarCambios() {

    this.visible_guarda_cancela = false;
    this.parametrosService.horarios = this.edit_horarios;
    this.messageService.add({severity : 'success', summary: "Success", detail: "Cambios realizados"});
    this.parametrosService.postGuardaHorarios(this.cultivosService.cultivoSeleccionado.id_cultivo, this.edit_horarios).subscribe(

    )
  }







  ngOnInit(): void {
    this.inicializaHorarios();
  }




}
