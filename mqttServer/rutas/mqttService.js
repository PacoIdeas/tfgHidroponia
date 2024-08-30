const mqtt = require('mqtt');
const aedes = require('aedes')(); //serv mqtt
const server = require('net').createServer(aedes.handle);
const moduloRiegos = require('./horariosDeRiego').tiempo_on_off_actual_byIdCultivo
const imagenes = require('./imagenes')

require('dotenv').config();

const t_camara_res = process.env.t_camara_res;
const t_camara_pet = process.env.t_camara_pet;
const t_datosRecopilados = process.env.t_datosRecopilados 
const t_datosConfirmados = process.env.t_datosConfirmados

const conectarBaseDeDatos =  require('./SQLite.js'); 
const db = conectarBaseDeDatos();
const util = require('util');
const dbGetAsync = util.promisify(db.all).bind(db);

const fs = require('fs');// trabajar con ficheros (foto)

const port = 1883; // Puerto MQTT predeterminado

server.listen(port, () => {
  console.log(`Broker MQTT está escuchando en el puerto ${port}`);
});



const brokerUrl = 'mqtt://192.168.100.115'; // Dirección del broker MQTT
 




const topics = ["topic/ejemplo",t_camara_res,t_camara_pet,t_datosRecopilados,t_datosConfirmados]//////S
 

const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
 // client.on('connect', async(req,res)  => {
  console.log('Conectado al broker MQTT');

  client.subscribe(topics, (err) => {
    if (!err) {
      console.log('Suscripción exitosa a los tópicos:', topics);
    } else {
      console.error('Error al suscribirse:', err);
    }
  });

  client.on('message', async (topic, message) => {
    console.log(`Mensaje recibido en el topic ${topic}: ${message.toString()}`);
    



    if(topic === t_datosRecopilados){
      console.log(`Mensaje recibido en el topic ${topic}`);
      try{

        const valores = obtenerParametros(message.toString());

        console.log("valores: " + valores);


        const horarioRiego = await tiempo_on_off_actual_byIdCultivo(valores[0]);

        client.publish(t_datosConfirmados, 'ok');
        console.log("enviado ok");


        
        const fecha_hora = formatDateToSQLDateTime();
        
        db.serialize(() => {

          db.run('INSERT INTO Datos_recogidos (id_cultivo, fecha_hora, temp_ambiente, humedad, luminosidad, pH, temp_SN ) VALUES (?, ?, ?, ?, ?, ?, ?);',[valores[0], fecha_hora, valores[1], valores[2],valores[3],valores[4], valores[5] ], function(err) {
            if (err) {
              return console.error(err.message); 
            }else{
              console.log(`Datos insertados del cultivo ${valores[0]} -> fecha_hora: ${fecha_hora}, temp_ambiente: ${valores[1]}, humedad: ${valores[2]}, light: ${valores[3]}, pH: ${valores[4]}, temp_SN: ${valores[5]}`);
            }
          });
        });  

  
      }catch(error){
        console.error('Error al publicar:', error);
      }
    }
    if (topic === t_camara_res) { // se recibe foto
      try{
        console.log(`Foto recibida en el topic ${topic}`);
        if (message instanceof Buffer && message.length > 0) { //foto valida 

          let fechaActual = new Date();
          let dia = String(fechaActual.getDate()).padStart(2, '0');
          let mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
          let anio = fechaActual.getFullYear();
          let hora = String(fechaActual.getHours()).padStart(2, '0');
          let minuto = String(fechaActual.getMinutes()).padStart(2, '0');
          let fechaBonita = `${dia}-${mes}-${anio}_${hora}-${minuto}`;
          let idCultivo = 1;



          const nombreFoto = `${idCultivo}_${fechaBonita}.jpg`;
          const imagePath = `./imagenes/${nombreFoto}`;
    
          fs.writeFile(imagePath, message, (err) => {
            if (err) {
              console.error('Error al guardar la imagen:', err);
            } else {
              console.log('Imagen guardada en:', imagePath);
              if (typeof client.imageCallback === 'function') {
                client.imageCallback(nombreFoto);

              }
            }
          });
          await imagenes.actualizaNombreFotoEnBD(idCultivo, nombreFoto);
        } else {
          console.error('Mensaje recibido no es una imagen válida');
        }
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




client.peticionDeImagen = (callback) => {
  client.imageCallback = callback;
  client.publish(t_camara_pet, 'Mensaje desde Node.js');
};



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



function obtenerIntervaloHorario() {
  // Obtén la hora actual
  var horaActual = new Date().getHours();

  // Comprueba a qué intervalo horario pertenece
  if (horaActual >= 1 && horaActual < 6) {
    return "madrugada";
  } else if (horaActual >= 6 && horaActual < 12) {
    return "mañana";
  } else if (horaActual >= 12 && horaActual < 18) {
    return "tarde";
  } else {
    return "noche";
  }
}



async function tiempo_on_off_actual_byIdCultivo(id_cultivo){
  try{
    const intervaloHorario = obtenerIntervaloHorario(); // Madrugada, Mañana, Tarde, Noche
    const query = `SELECT * FROM HorariosRiego WHERE id_cultivo = '${id_cultivo}' AND momento = '${intervaloHorario}'`;
    const rows = await dbGetAsync(query); 
    return rows;
  }catch(error){
    console.error('Error al publicar:', error);
  }

}



 


module.exports = client; // Exporta el cliente MQTT
