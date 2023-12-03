import { Component, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';

import { Router } from "@angular/router";
import { Usuario } from 'src/app/modelos/usuario';

import { AutentificacionService } from 'src/app/servicios/autentificacion.service';

import { LoginModule } from './login.module';

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


  mostrar_Registro: boolean = false;






  constructor(public autentificacionService: AutentificacionService,private messageService: MessageService, public router: Router){}






  PopUpSignUp(val: boolean) {
    this.mostrar_Registro = val;
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
                console.log('Datos del token decodificado:', decodedToken);
                this.autentificacionService.usuario.username = decodedToken.datos_token.username
                this.autentificacionService.usuario.roll = decodedToken.datos_token.roll
                if(this.autentificacionService.usuario.roll == "admin"){ //administrador
                  this.router.navigateByUrl("/admin");

                }else if(this.autentificacionService.usuario.roll == "user"){ // usuario o gestor
                  this.router.navigateByUrl("/user");
                }



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





  SignUp(usuario: Usuario){ //


    this.autentificacionService.postRegister(usuario).subscribe((result: any) => {

      if((result.minutos_Restantes>0)||(result.segundos_Restantes>=0)){
        console.log("IpBloqueada");

         this.messageService.add({severity : 'error', summary: "Error!", detail: "Se han acabado los intentos disponibles. Tiempo de espera: "+result.minutos_Restantes+"minutos, "+result.segundos_Restantes+"segundos." });
       }

      this.autentificacionService.setToken(result.token);

      if(result.pin_clientes>=0){
        this.messageService.add({severity : 'error', summary: "Error!", detail: "El pin  "+result.pin_clientes+" No esta asociado a ningun cliente existente." });

      }

      if((result.accede == false)){

        this.messageService.add({severity : 'error', summary: "Error!", detail: "Ya existe un usuario con este nombre" });
      }
      if ((result.token != null) && (result.token != undefined)){
        this.messageService.add({severity :  'success', summary: "Resultado", detail: "Exito en el registro! redirigiendo..." });
      }

    },
    (error) => {
      console.error("Error en la solicitud de inicio de sesión:", error);
    });
    this.PopUpSignUp(false);
    setTimeout(() => {
      this.router.navigateByUrl("/user");          /////TODO
    },1000);

  }





  ngOnInit(): void {


  }


}
