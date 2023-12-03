import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    LoginComponent,

  ],

  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    PanelModule,
    ButtonModule,
    DividerModule,
    DialogModule,
    ToastModule
  ],
  providers:[
    JwtHelperService
  ]
})

export class LoginModule {


  constructor(){


  }


 }
