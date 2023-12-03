import { Injectable } from '@angular/core';


import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';

import { AutentificacionService } from '../servicios/autentificacion.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class AuthGuardService  {

  constructor(public auth: AutentificacionService, public router: Router) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot

  ): Observable<boolean | UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {

    if(this.auth.isAuthenticated()){
      return true;
    }else{
      this.auth.deleteToken();
      return false;
    }


  }



}
