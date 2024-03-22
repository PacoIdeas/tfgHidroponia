import { Injectable } from '@angular/core';
import { Cultivo } from '../modelos/cultivo';
import { Intervalos } from '../modelos/IntervalosDeRiego';

import { Observable } from "rxjs";

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';

import { Router } from "@angular/router";

import { Notificacion } from '../modelos/notificaciones';




@Injectable({
  providedIn: 'root'
})


export class ImagenesService {


  API_URI = 'http://localhost:3000';




  constructor(private http: HttpClient, private router: Router) { }



  getImagenesCultivo(id_cultivo: number): Observable<File[]> {
    return this.http.get<File[]>(`${this.API_URI}/ImagenesCultivo`, { params: { id_cultivo: id_cultivo } });
  }

  getImagenActual(id_cultivo: number): Observable<string> {
    return this.http.get<string>(`${this.API_URI}/ImagenActual`, { params: { id_cultivo: id_cultivo } });
  }

  postActualizaImagen(id_cultivo: number, imagen: File): Observable<File> {
    return this.http.post<File>(`${this.API_URI}/GuardaImagen`, { id_cultivo: id_cultivo, imagen: imagen });
  }




}
