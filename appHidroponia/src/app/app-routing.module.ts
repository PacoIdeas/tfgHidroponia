import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './vistas/login/login.component';
import { UserComponent } from './vistas/user/user.component';

import { AuthGuardService } from './servicios/auth-guard.service';

import { AdminComponent } from './vistas/admin/admin.component';








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
   {path: '**', redirectTo: ''}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})






export class AppRoutingModule { }
