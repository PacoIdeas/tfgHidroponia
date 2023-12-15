import { Component, OnInit, OnDestroy} from '@angular/core';
import { ComunesService } from 'src/app/servicios/comunes.service';
import { SidebarService } from 'src/app/servicios/sidebar.service';
import { ConfirmationService,ConfirmEventType ,MessageService} from 'primeng/api';
import { Router } from '@angular/router';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CultivosPredeterminadosComponent } from 'src/app/componentes/cultivos-predeterminados/cultivos-predeterminados.component';
import { Cultivo } from 'src/app/modelos/cultivo';


@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css'],
  providers: [DialogService]
})
export class ParametrosComponent implements OnInit {








  constructor(public comunesService: ComunesService, public sidebarService: SidebarService, private messageService: MessageService,  public router: Router) { }



  cols_hambientales!: any[];
  cols_solucion!: any[];







  ngOnInit(): void {

    this.cols_hambientales = [
      { field: 'id_cultivo', header: 'ID' },
      { field: 'Nombre', header: 'Nombre' },

      { field: 'Fecha_Creacion', header: 'Fecha de creacion' }
    ];


  }


}
