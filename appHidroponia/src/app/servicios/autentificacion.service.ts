import { Injectable } from '@angular/core';

import { Observable } from "rxjs";

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';

import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})







export class AutentificacionService {


  API_URI = 'http://localhost:3000';



  usuario: Usuario = {
    username: null,
    password: null,
    id_usuario: 0
  }

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router) { }


  login(user: Usuario): Observable<any> {
    return this.http.post(this.API_URI +"/login", user);
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

