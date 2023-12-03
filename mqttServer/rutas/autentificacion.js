const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const autentificacion = express.Router();
const moment = require('moment');
 
const conectarBaseDeDatos =  require('./SQLite.js');

const db = conectarBaseDeDatos();
const util = require('util');
const dbGetAsync = util.promisify(db.all).bind(db);



const secretKey = 'clave_secreta'; // Clave secreta para firmar el token

const crypto = require("crypto");
const { log } = require('console');
const secret = "clave_secreta";  //
const sha256Hasher = crypto.createHmac("sha256", secret);

 
const BLOCK_TIME = 5;
const INTENTOS = 5;

class LogClass { 
    constructor(ip, username, fecha_hora, accede, ip_bloqueada) {
        this.ip = ip;
        this.username = username;
        this.fecha_hora = fecha_hora;
        this.accede = accede;
        this.ip_bloqueada = ip_bloqueada;
    }

}

class Usuario {

    constructor(username,password,id_usuario, roll ) {
        this.username= username;
        this.password= password;
        this.id_usuario= id_usuario ;
        this.roll= roll;
    } 
}

autentificacion.post('/login',async(req,res) =>{
   
    const sha256Hasher = crypto.createHmac("sha256", secret);
    let token = 0;
    const {username, password} = req.body;         
    const clientIP = req.ip; // Obtiene la dirección IP del cliente
  
    let accede = 0;
    console.log("cliente ip:->" + clientIP + "  -  accediendo a login");
    
    let query_login = "";

    const fecha = obtenerFechaHoraActual();
    //console.log(fecha);

    let log_de_acceso = new LogClass(clientIP,  username, fecha, null, null);

    //obtener los intentos (INTENTOS) en los ultimos (BLOCK_TIME) minutos, en caso de ser >=5 devolver el tiempo de espera restante


    
 
    const minutes = 5; // Este valor puede ser reemplazado por la cantidad de minutos que desees




    const checkIfExistsQuery = "SELECT * FROM Logs WHERE ip = '"+clientIP+"' AND accede = 0 AND fecha_hora >= datetime('now', '-" + minutes+" minutes', + '1 hour')";
    let userExists;
    const result_Ultimos_Accesos = await dbGetAsync(checkIfExistsQuery);


    console.log(result_Ultimos_Accesos.length)


    let intentosPermitidos = 5 - result_Ultimos_Accesos.length ;


    if( result_Ultimos_Accesos.length>0){
    // comprobar si esta bloqueada
  
        if(result_Ultimos_Accesos[result_Ultimos_Accesos.length-1].ip_bloqueada){
    
            let ahora_menos_BLOCK_TIME = new Date();
           // ahora_menos_BLOCK_TIME.setHours(ahora_menos_BLOCK_TIME.getHours());
            ahora_menos_BLOCK_TIME.setMinutes(ahora_menos_BLOCK_TIME.getMinutes()-BLOCK_TIME);
             

            console.log("fecha ultima ip bloqueada : "+ result_Ultimos_Accesos[result_Ultimos_Accesos.length-1].fecha_hora );
            console.log("fecha ahora - 5 min:  " + ahora_menos_BLOCK_TIME);

            const tiempo_Restante = (new Date(result_Ultimos_Accesos[result_Ultimos_Accesos.length-1].fecha_hora)) -  ahora_menos_BLOCK_TIME;
            
            
            
            const minutos_Restantes = Math.floor(tiempo_Restante / (1000 * 60));
            const segundos_Restantes = Math.floor((tiempo_Restante % (1000 * 60)) / 1000);

            console.log("ip bloqueada. tiempo de espera: " + minutos_Restantes + "minutos + "+segundos_Restantes+"segundos" );
           
            return res.json({ minutos_Restantes , segundos_Restantes });
 

        }
        //comprobar el tiempo transcurrido, si aun queda x minutos se devuelve eso al front y retorna 0

    }
    
    
    if( result_Ultimos_Accesos.length < INTENTOS){
        console.log("dentro de intentos permitidos");

        log_de_acceso.accede = 0;
        log_de_acceso.ip_bloqueada = ip_bloqueada = 0;
        
        
        
     

        const consulta = "SELECT * FROM usuarios WHERE username = ?;"; 
        let userExists;
        const result = await dbGetAsync(consulta, username);


        if(result.length != 0){
            
            const contra_encriptada = result[0].password;
            let passwordHashed = sha256Hasher.update(password).digest("hex");
            if(passwordHashed == result[0].password ) {
                
                const datos_token =  {
                    username: result[0].username,
                    roll: result[0].roll,
                };
                

                log_de_acceso.accede =1 ;
                log_de_acceso.ip_bloqueada = 0; 


                const checkIfExistsQuery = "INSERT INTO logs (ip, username, fecha_hora, accede, ip_bloqueada) VALUES (?, ?, ?, ?, ?)";
          
                const inserta = await dbGetAsync(checkIfExistsQuery,[log_de_acceso.ip,log_de_acceso.username, log_de_acceso.fecha_hora, log_de_acceso.accede, log_de_acceso.ip_bloqueada]);



  
                token = jwt.sign({ datos_token }, secretKey, { expiresIn: '1h' });
            
                res.json({ token });
                console.log("acceso al usuario,token enviado.")

            }else {   
                console.log("contraseña incorrecta, cargamos log: ")
            }

        }else{ //no encontro el username
            console.log("el name no existe")
        }
   
    if(log_de_acceso.accede==0){ // usuario y/o contraseña invalidos
        console.log("acceso invalido ")
        log_de_acceso.ip_bloqueada = 0;
        if(result_Ultimos_Accesos.length == INTENTOS-1){
            log_de_acceso.ip_bloqueada = 1;
            console.log("bloqueo de ip")
        }

        const query_login = "INSERT INTO logs (ip, username, fecha_hora, accede, ip_bloqueada) VALUES (?, ?, ?, ?, ?) "; 
        
        db.all(query_login, [log_de_acceso.ip,log_de_acceso.username, log_de_acceso.fecha_hora, log_de_acceso.accede, log_de_acceso.ip_bloqueada], (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }
              
        });

        res.json({ intentosPermitidos });
    }
    }else{
        console.log("fuera de intentos permitidos");
        res.json({ intentosPermitidos });
    }
 /*
*/

});









autentificacion.post('/register',async(req,res) =>{
   
    
    console.log(req.body);
    
    

    const sha256Hasher = new crypto.createHmac("sha256", secret);  
    
    let accede = false;
   
    const clientIP = req.ip; // Obtiene la dirección IP del cliente
    const fecha = obtenerFechaHoraActual(); 
    usuario = new  Usuario(req.body.username,req.body.password, "user");
    loogeo = new LogClass(clientIP, req.body.username, fecha, 0);
  
    const query_login =`SELECT * FROM Logs 
    WHERE ip = ? 
    AND fecha_hora >= datetime('now', '-' || ? || ' minutes', '+1 hour');`; 
    let array_log = [];
    await db.all(query_login, [clientIP, BLOCK_TIME], (err, rows) => {
      
        if (err) {
            console.error(err.message);
            return;
        } 
        rows.forEach(rowItem => {
            array_log.push(rowItem);
        }); 
    });



    console.log(array_log);


    
    if(array_log.length>0){
    // comprobar si esta bloqueada
        console.log(array_log[array_log.length-1].ip_bloqueada) ;

    //
        if(array_log[array_log.length-1].ip_bloqueada){


            let ahora_menos_BLOCK_TIME = new Date();
           // ahora_menos_BLOCK_TIME.setHours(ahora_menos_BLOCK_TIME.getHours());
            ahora_menos_BLOCK_TIME.setMinutes(ahora_menos_BLOCK_TIME.getMinutes()-BLOCK_TIME);

            console.log("fecha ultima ip bloqueada : "+ result_Ultimos_Accesos[result_Ultimos_Accesos.length-1].fecha_hora );
            console.log("fecha ahora - 5 min:  " + ahora_menos_BLOCK_TIME);

            const tiempo_Restante = result_Ultimos_Accesos[result_Ultimos_Accesos.length-1].fecha_hora -  ahora_menos_BLOCK_TIME
            
            
            const minutos_Restantes = Math.floor(tiempo_Restante / (1000 * 60));
            const segundos_Restantes = Math.floor((tiempo_Restante % (1000 * 60)) / 1000);

            console.log("ip bloqueada. tiempo de espera: " + minutos_Restantes + "minutos + "+segundos_Restantes+"segundos" );
           
            return res.json({ minutos_Restantes , segundos_Restantes });

        }
        //comprobar el tiempo transcurrido, si aun queda x minutos se devuelve eso al front y retorna 0
    }

    if( array_log.length < INTENTOS){
        console.log("dentro de intentos permitidos");
        
        


        const checkIfExistsQuery = 'SELECT username FROM Usuarios WHERE username = ?';
        let userExists;
        const row = await dbGetAsync(checkIfExistsQuery, [usuario.username]);
 

        if (row.length!= 0) {
            // El usuario ya existe, manejarlo según tu lógica
            console.log('El usuario ya existe');
            userExists = 1;
        } else{
            userExists = 0;
            console.log('El usuario no existe');

        }
 


        
        if (userExists == 0) { // no existe, se crea


            let result2;
            let hash_pass = sha256Hasher.update(req.body.password).digest("hex");
            let roll = "user";
            const query_login ="INSERT INTO Usuarios (username, password, roll) VALUES (?, ?,?);"
            await db.all(query_login,[usuario.username, sha256Hasher.update(req.body.password).digest("hex"), roll], (err, rows) => {
               
                if (err) {
                    console.error(err.message);
                    return;
                }  
            });

  
            const datos_token =  {
                username: usuario.username ,
                roll: roll,
            };


            const token = jwt.sign({ datos_token }, secretKey, { expiresIn: '1h' });
            res.json({ token });
            console.log(result2); 
            accede = true; 


        } else {
            console.log("El usuario ya existe en la base de datos.");
            accede = false;
            res.json({accede});
        }  


    }else{
        console.log("fuera de intentos permitidos");

    }

 
    let bloqueo = 0; 

    if(accede){
   
  
        const query_login = "INSERT INTO logs (ip, username, fecha_hora, accede, ip_bloqueada) VALUES (?, ?, ?, ?, ?) "; 
      
        db.all(query_login, [loogeo.ip,loogeo.username, loogeo.fecha_hora, loogeo.accede, loogeo.ip_bloqueada], (err, row) => {
          
            if (err) {
                console.error(err.message);
                return;
            } 
            row.forEach((row) => {
                console.log(row);
            })
 
        });

        

    }else{

        
        const query_login = "INSERT INTO logs (ip, username, fecha_hora, accede, ip_bloqueada) VALUES (?, ?, ?, ?, ?) "; 
        if(array_log.length == INTENTOS-1){
            bloqueo = 1;
            loogeo.ip_bloqueada = bloqueo;
            console.log("bloqueo de ip")
        }  
        db.all(query_login, [loogeo.ip,loogeo.username, loogeo.fecha_hora, accede, bloqueo], (err, row) => { });


    }


 
});






autentificacion.get('/decode-token', (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    try {
      // Decodificar el token utilizando la clave secreta
      const decodedToken = jwt.verify(token.split(' ')[1], secretKey);
      res.json(decodedToken);
    } catch (error) {
      res.status(401).json({ message: 'Error al decodificar el token' });
    }
  });



function obtenerFechaHoraActual() {
    const fechaHora = new Date();
    
    const año = fechaHora.getFullYear();
    const mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaHora.getDate().toString().padStart(2, '0');
    
    const horas = fechaHora.getHours().toString().padStart(2, '0');
    const minutos = fechaHora.getMinutes().toString().padStart(2, '0');
    const segundos = fechaHora.getSeconds().toString().padStart(2, '0');
    
    const fechaHoraFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  
    return fechaHoraFormateada;
  }


 


module.exports = autentificacion;

