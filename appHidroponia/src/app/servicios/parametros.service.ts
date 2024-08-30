import { Injectable } from '@angular/core';
import { Cultivo } from '../modelos/cultivo';
import { Intervalos } from '../modelos/IntervalosDeRiego';

import { Observable } from "rxjs";

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';

import { Router } from "@angular/router";

import { Notificacion } from '../modelos/notificaciones';

import { InfoNotificaciones } from '../modelos/info_notificaciones';




@Injectable({
  providedIn: 'root'
})









export class ParametrosService {


  notificacionesActivas: Notificacion[] = [];
  notificacionSeleccionada = new Notificacion(null);
  visible_guarda_cancela = true;

  horario_manana: Intervalos = new Intervalos("manana", 0, 0);
  horario_tarde: Intervalos = new Intervalos("tarde", 0, 0);
  horario_noche: Intervalos = new Intervalos("noche", 0, 0);
  horario_madrugada: Intervalos = new Intervalos("madrugada", 0, 0);

  horarios: Intervalos[] = [this.horario_manana, this.horario_tarde, this.horario_noche, this.horario_madrugada];



  API_URI = 'http://localhost:3000';




  constructor(private http: HttpClient, private router: Router) { }




  getNotificacionesActivas(id_cultivo: number): Observable<Notificacion[]> { //devuelve las notificaciones que desea escuchar actualmente el usuario
    return this.http.get<Notificacion[]>(`${this.API_URI}/notificaciones`, { params: { id_cultivo: id_cultivo } });
  }

  getInfoNotificaciones(id_cultivo: number): Observable<InfoNotificaciones[]> {  //devuelve las notificaciones que han saltado
    return this.http.get<InfoNotificaciones[]>(`${this.API_URI}/infoNotificaciones`, { params: { id_cultivo: id_cultivo } });
  }

  postGuardaNotificaciones(id_cultivo: number, notificaciones: Notificacion[]): Observable<Notificacion[]> {
    return this.http.post<Notificacion[]>(`${this.API_URI}/GuardaNotificaciones`, { id_cultivo: id_cultivo, notificaciones: notificaciones });

  }

  putNotificacionesVistas(id_cultivo: number, notificacionesVistas: InfoNotificaciones[]) {
    return this.http.put<Notificacion[]>(`${this.API_URI}/notificacionesVistas`, { id_cultivo: id_cultivo, notificacionesVistas: notificacionesVistas });
  }


  ////horarios

  getHorarios(id_cultivo: number): Observable<Intervalos[]> {
    return this.http.get<Intervalos[]>(`${this.API_URI}/Horarios`, { params: { id_cultivo: id_cultivo } });
  }

  postGuardaHorarios(id_cultivo: number, horarios: Intervalos[]) {

    return this.http.post<Intervalos[]>(`${this.API_URI}/GuardaHorarios`, { id_cultivo: id_cultivo, horarios: horarios });
  }




}
