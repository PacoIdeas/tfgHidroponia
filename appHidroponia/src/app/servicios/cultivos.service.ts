import { Injectable } from '@angular/core';
import { Cultivo } from '../modelos/cultivo';
import {datosCultivoActuales} from '../modelos/datosCultivoActuales';

import { Observable } from "rxjs";

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { Notificacion } from '../modelos/notificaciones';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CultivosService {


  API_URI = 'http://localhost:3000';

  notificaciones: Notificacion[] = [];
  sidebarVisible: boolean = false;

  cultivosPredefinidos: Cultivo[] = [];
  cultivosDisponibles: Cultivo[] = [];
  cultivoSeleccionado = this.cultivosDisponibles[0];
  datosCultivoActuales: datosCultivoActuales ={

    id_cultivo: 0,
    fecha: new Date(0),

    dias_transcurridos: 0,
    imagen: " ",
    fecha_imagen: new Date(0),

    temperatura: 0,
    humedad: 0,
    luminosidad: 0,

    temperaturaSN: 0,
    pH: 0,
    EC: 0.0,
    fecha_EC: new Date(0),
  }

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


  getDatosCultivoActuales(id_cultivo: number): Observable<datosCultivoActuales> {

    return this.http.get<datosCultivoActuales>(this.API_URI + "/datosActuales", { params: { id_cultivo: id_cultivo } });
  }

  postActualizarEC(id_cultivo: number, EC: number): Observable<any> {

    return this.http.post<any>(this.API_URI + "/actualizarEC", { id_cultivo: id_cultivo, EC: EC });
  }

  getHistorialDeDatos(id_cultivo: number): Observable<any> {
    return this.http.get<any>(this.API_URI + "/historial", { params: { id_cultivo: id_cultivo } });
  }

  // getNotificaciones (id_cultivo: number): Observable<any> {
  //   return this.http.get<any>(this.API_URI + "/notificaciones", { params: { id_cultivo: id_cultivo } })
  // }

}
