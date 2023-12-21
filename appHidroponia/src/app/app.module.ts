import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { CookieService } from "ngx-cookie-service";

import { HttpClientModule } from '@angular/common/http';
///////importar si son necesarios
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { SpeedDialModule } from 'primeng/speeddial';
import { SidebarModule } from 'primeng/sidebar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ImageModule } from 'primeng/image';
import { TreeSelectModule } from 'primeng/treeselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FilterService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { TreeTableModule } from 'primeng/treetable';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
//////////////////////////////////


import { NuevoCultivoComponent } from './componentes/nuevo-cultivo/nuevo-cultivo.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { AddEditCultivoComponent } from './vistas/add-edit-cultivo/add-edit-cultivo.component';
import { UserComponent } from './vistas/user/user.component';
import { AdminComponent } from './vistas/admin/admin.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { ComunesService } from './servicios/comunes.service';
import { CultivosService } from './servicios/cultivos.service';
import { CultivosPredeterminadosComponent } from './componentes/cultivos-predeterminados/cultivos-predeterminados.component';
import { ParametrosComponent } from './vistas/parametros/parametros.component';
import { AlertasComponent } from './vistas/alertas/alertas.component';
import { ProgramacionHorariaComponent } from './vistas/programacion-horaria/programacion-horaria.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    SidebarComponent,
    NuevoCultivoComponent,
    CabeceraComponent,
    AddEditCultivoComponent,
    CultivosPredeterminadosComponent,
    ParametrosComponent,
    AlertasComponent,
    ProgramacionHorariaComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    TreeTableModule,
    MenubarModule,

    ButtonModule,
    DividerModule,
    PanelModule,
    ToastModule,
    SidebarModule,
    TableModule,
    ConfirmDialogModule,
    MenuModule,
    CardModule,
    DropdownModule,
    ConfirmPopupModule,
    DialogModule,
    DynamicDialogModule,
    CalendarModule,
    InputSwitchModule,
    KnobModule,
    JwtModule.forRoot({
      config: {
        // Configuración opcional para el manejo de tokens JWT, si es necesario
      },
    }),

  ],
  providers: [
    MessageService,
    CookieService,
    JwtHelperService,
    ConfirmationService,
    FilterService,
    UserComponent,
    ComunesService,
    CultivosService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
