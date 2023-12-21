import { Injectable } from '@angular/core';
import { Cultivo } from '../modelos/cultivo';


import { Observable } from "rxjs";

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';

import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CultivosService {


  API_URI = 'http://localhost:3000';


  sidebarVisible: boolean = false;

  cultivosPredefinidos: Cultivo[] = [];
  cultivosDisponibles: Cultivo[] = [];
  cultivoSeleccionado = this.cultivosDisponibles[0];


  constructor(private http: HttpClient, private router: Router) { }



  getCultivos(): Observable<Cultivo[]> {
    return this.http.get<Cultivo[]>(this.API_URI + "/Cultivos");
  }


  getCultivosPredefinidos(): Observable<Cultivo[]> {
    return this.http.get<Cultivo[]>(this.API_URI + "/CultivosPredefinidos");
  }

  add_eddit_cultivo(cultivo: Cultivo):Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Cultivo>(this.API_URI + "/Cultivos",  JSON.stringify(cultivo), {headers: headers});
  }

  delete_cultivo(cultivo: Cultivo) {
    const body = { id: cultivo.id_cultivo };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = {
      headers: headers,
      body: body,
    };

    return this.http.delete<Cultivo>(this.API_URI + "/Cultivos/",options );
  }








}
