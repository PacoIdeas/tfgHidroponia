import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './vistas/login/login.component';
import { UserComponent } from './vistas/user/user.component';

import { AuthGuardService } from './servicios/auth-guard.service';

import { AdminComponent } from './vistas/admin/admin.component';

import { AddEditCultivoComponent } from './vistas/add-edit-cultivo/add-edit-cultivo.component';
import { ParametrosComponent } from './vistas/parametros/parametros.component';
import { AlertasComponent } from './vistas/alertas/alertas.component';
import { ProgramacionHorariaComponent } from './vistas/programacion-horaria/programacion-horaria.component';




const routes: Routes = [

  { path: "", component: LoginComponent },
  {
    path: "user",
    component: UserComponent,
    canActivate:[AuthGuardService],
   },
   {
    path: "admin",
    component: AdminComponent,
    canActivate:[AuthGuardService],
   },
  {
   path: "add-edit-cultivo",
   component: AddEditCultivoComponent,
   canActivate:[AuthGuardService],
  },
  {
    path: "parametros",
    component: ParametrosComponent,
    canActivate:[AuthGuardService],
   },
   {
    path: "alertas",
    component: AlertasComponent,
    canActivate:[AuthGuardService],
   },
  {
   path: "programacion-horaria",
   component: ProgramacionHorariaComponent,
   canActivate:[AuthGuardService],
  },

   {path: '**', redirectTo: ''}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})






export class AppRoutingModule { }
