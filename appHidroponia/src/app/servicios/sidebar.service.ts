import { Injectable } from '@angular/core';
import { Cultivo } from '../modelos/cultivo';


import { Observable } from "rxjs";

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';

import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  API_URI = 'http://localhost:3000';


  sidebarVisible: boolean = false;
  cultivosDisponibles: Cultivo[] = [];

  cultivoSeleccionado = this.cultivosDisponibles[0];


  constructor(private http: HttpClient, private router: Router) { }


  getCultivos(): Observable<Cultivo[]> {
    return this.http.get<Cultivo[]>(this.API_URI + "/cultivos");
  }

  add_eddit_cultivo(cultivo: Cultivo) {

    return this.http.post<Cultivo>(this.API_URI + "/cultivos", cultivo);
  }

  delete_cultivo(cultivo: Cultivo) {

    return this.http.delete<Cultivo>(this.API_URI + "/cultivos/" + cultivo.id_cultivo);
  }









}
