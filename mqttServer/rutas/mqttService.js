const mqtt = require('mqtt');
const aedes = require('aedes')(); //serv mqtt
const server = require('net').createServer(aedes.handle);

const conectarBaseDeDatos =  require('./SQLite.js');

const db = conectarBaseDeDatos();

const fs = require('fs');// trabajar con ficheros (foto)

const port = 1883; // Puerto MQTT predeterminado

server.listen(port, () => {
  console.log(`Broker MQTT está escuchando en el puerto ${port}`);
});



const brokerUrl = 'mqtt://192.168.100.115'; // Dirección del broker MQTT
// const options = {
//   clientId: 'nodejs-client', // Identificador del cliente
//   username: 'tu_usuario', // Usuario (si es necesario)sadasd
//   password: 'tu_contraseña' // Contraseña (si es necesario)
// };



const t_camara_res = "PICTURE";
const t_camara_pet = "TakeAPicture";
const t_hum_temp = "hum_temp_amb";
const t_hum_temp_amb_res = "hum_temp_amb_res"
const topics = ["topic/ejemplo",t_camara_res,t_camara_pet,t_hum_temp,t_hum_temp_amb_res]//////S
//publica TakeAPicture  ->  ESP32-CAM publica en PICTURE una foto 


const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
 // client.on('connect', async(req,res)  => {
  console.log('Conectado al broker MQTT');

  client.subscribe(topics); // Suscripción al tema necesario

  client.on('message', async (topic, message) => {
    //console.log(`Mensaje recibido en el topic ${topic}: ${message.toString()}`);
    

    if (topic === t_camara_res) { // se recibe foto
      if (message instanceof Buffer && message.length > 0) { //foto valida 
        // Obtenemos los componentes de la fecha (día, mes y año)
        let fechaActual = new Date();
        let dia = String(fechaActual.getDate()).padStart(2, '0'); // Obtener el día (asegurándonos de que tenga dos dígitos)
        let mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Obtener el mes (los meses empiezan desde 0)
        let anio = fechaActual.getFullYear(); // Obtener el año
        let fechaBonita = `${dia}-${mes}-${anio}`;// Formateamos la fecha como dd-mm-aaaa

        const imagePath = `./captured_images/${fechaBonita}.jpg`; // Ruta donde se guardará la imagen
     // console.log('lenght', message.length);
        fs.writeFile(imagePath, message, (err) => {
          if (err) {
            console.error('Error al guardar la imagen:', err);
          } else {
            console.log('Imagen guardada en:', imagePath);
            // Aquí puedes realizar cualquier otra operación con la imagen guardada
          }
        });
      } else {
        console.error('Mensaje recibido no es una imagen válida');
      }
    } // FIN 'PICTURE'

    else if(topic === t_hum_temp){
      console.log(`Mensaje recibido en el topic ${topic}: ${message.toString()}`);
      try{

        const valores = obtenerParametros(message.toString());

        console.log("valores: " + valores);
        client.publish(t_hum_temp_amb_res, 'ok');
        console.log("enviado ok");
        
        const fecha_hora = formatDateToSQLDateTime();
        
        db.serialize(() => {
          db.run('INSERT INTO Datos_ambientales (fecha_hora, temperatura, humedad) VALUES (?, ?, ?);',[fecha_hora, valores[0], valores[1] ], function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Se insertó el temperatura: ${valores[0]}, humedad:  ${valores[1]}`);
          });
        }); 

  
      }catch(error){
        console.error('Error al publicar:', error);
      }
    }


  });

  // Publicación de un mensaje cada cierto intervalo de tiempo (opcional)
  // setInterval(() => {
  //   client.publish('TakeAPicture', 'Mensaje desde Node.js');
  //  // client.publish('topic/camara', 'Mensaje desde Node.js');
  // }, 10000); // Publica cada 5 segundos
});



function obtenerParametros(cadena) {
  const parametros = [];
  const partes = cadena.split(':'); // Dividir la cadena en partes usando ':'
  
  // Iterar a través de las partes y obtener los valores después de ':'
  for (let i = 1; i < partes.length; i++) {
    const valor = partes[i].split(/[^\d\.]+/).filter(Boolean)[0]; // Obtener el valor después de ':' y eliminar caracteres no numéricos
    if (valor) {
      parametros.push(parseFloat(valor)); // Agregar el valor al array de parámetros (como número de punto flotante)
    }
  }

  return parametros;
}


function formatDateToSQLDateTime() {
  
  date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegura que el mes tenga dos dígitos
  const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos

  const hours = String(date.getHours()).padStart(2, '0'); // Asegura que las horas tengan dos dígitos
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Asegura que los minutos tengan dos dígitos
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Asegura que los segundos tengan dos dígitos

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


server.on('published', (packet, client) => {

});






module.exports = client; // Exporta el cliente MQTT
