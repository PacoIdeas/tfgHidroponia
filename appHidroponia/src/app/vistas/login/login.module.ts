import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { PanelModule } from 'primeng/panel';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';


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
    DividerModule
  ]
})

export class LoginModule {


  constructor(){


  }


 }
