import { Component, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';

import { Router } from "@angular/router";
import { Usuario } from 'src/app/modelos/usuario';

import { AutentificacionService } from 'src/app/servicios/autentificacion.service';


@Component({
  selector: 'app-login',

  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})






export class LoginComponent implements OnInit{


  imput_password: string ="";
  imput_username: string ="";

  token: any;









  constructor(public autentificacionService: AutentificacionService,private messageService: MessageService, public router: Router){}






  PopUpSignUp(arg0: boolean) {
  throw new Error('Method not implemented.');
  }


  login() {
    this.autentificacionService.usuario.username = this.imput_username;
    this.autentificacionService.usuario.password = this.imput_password;

    this.autentificacionService.login(this.autentificacionService.usuario).subscribe(
      (result: any) => {

        if((result.minutos_Restantes>0)||(result.segundos_Restantes>=0)){
        console.log("IpBloqueada");

          this.messageService.add({severity : 'error', summary: "Error!", detail: "Se han acabado los intentos disponibles. Tiempo de espera: "+result.minutos_Restantes+"minutos, "+result.segundos_Restantes+"segundos." });
          return;
        }

        if(result.intentosPermitidos != undefined){
          this.messageService.add({severity : 'error', summary: "warm", detail: "Fallo de autentificacion. Intentos permitidos: "+result.intentosPermitidos });
          return;
        }

        setTimeout(() => {
          this.autentificacionService.setToken(result.token);
          this.token = this.autentificacionService.getToken();

          if (this.token != undefined) {
            this.autentificacionService.decode_token(this.token).subscribe(
              (decodedToken) => {

                console.log('Token decodificado:', decodedToken);
                // console.log('Datos del token decodificado:', decodedToken);
                // this.usuario.id_usuario = decodedToken.datos_token.id_usuario
                // this.usuario.id_roll = decodedToken.datos_token.id_roll
                // if(this.usuario.id_roll == 3){ //administrador

                this.router.navigateByUrl("/");

                // }else if((this.usuario.id_roll == 1) || (this.usuario.id_roll == 2)){ // usuario o gestor
                //   this.router.navigateByUrl("/cliente");
                // }
              },
              (error) => {
                console.error('Error al decodificar el token en el backend:', error);
              }
            );
          }


        },200);
        // Acceder a los datos del token después de que se establece

        console.log("algo");


      },
      (error) => {
        console.error("Error en la solicitud de inicio de sesión:", error);
      });




  }







  ngOnInit(): void {


  }


}
