const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const mqttClient = require('./rutas/mqttService'); // Importa el cliente MQTTT
const conectarBaseDeDatos =  require('./rutas/SQLite')
const autentificacion = require('./rutas/autentificacion')



const db = conectarBaseDeDatos();

const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:4200'
}));




app.use(autentificacion);


// Crear las tablas en la base de datos si no existen
db.serialize(() => {

  db.run('CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, password CHAR)');

  db.run('CREATE TABLE IF NOT EXISTS Datos_ambientales (fecha_hora DATETIME, temperatura REAL, humedad REAL, luminosidad REAL)');

  db.run('CREATE TABLE IF NOT EXISTS Datos_SN (fecha_hora DATETIME, temperatura REAL, pH REAL, EC REAL)');
 
  db.run('CREATE TABLE IF NOT EXISTS Logs (ip TEXT, username TEXT, fecha_hora DATETIME, accede INTEGER, ip_bloqueada INTEGER)');
});




// Ruta de ejemplo en Express
app.get('/', (req, res) => {
  res.send('¡Servidor Express con MQTT!');
  // Publicar un mensaje MQTT desde Express
  mqttClient.publish('topic', 'Hola desde Express');
});

// Inicia el servidor Express
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
