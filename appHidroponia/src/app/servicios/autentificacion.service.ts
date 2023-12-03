import { Injectable } from '@angular/core';

import { Observable } from "rxjs";

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';

import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";



import { JwtHelperService } from "@auth0/angular-jwt";



@Injectable({
  providedIn: 'root'
})







export class AutentificacionService {


  API_URI = 'http://localhost:3000';



  usuario: Usuario = {
    username: null,
    password: null,
    id_usuario: 0,
    roll: null
  }

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router, public jwtHelper: JwtHelperService) { }


  login(user: Usuario): Observable<any> {
    return this.http.post<Usuario>( this.API_URI +"/login", user);
  }



  postRegister(user: Usuario): Observable<any>{
    console.log("intento registro");

    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.API_URI +"/register", JSON.stringify(user), {headers: headers});

  }


  public isAuthenticated (): Boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token); //comprueba si el token esta caducado y devuelve true/false
  }


  //Guardar token en cookies
  setToken(token: string) {
    this.cookies.set("token", token);
  }

  //Recuperar token
  getToken() {
    return this.cookies.get("token");
  }

  deleteToken(){
        // Eliminar la cookie llamada 'token'

      this.router.navigateByUrl("/");
    return this.cookies.delete("token", "/" );

  }

  decode_token(token: string): Observable<any>{

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.API_URI}/decode-token`, { headers });
  }


  salir(){
    this.deleteToken();
    this.router.navigateByUrl("/");
  }



}

