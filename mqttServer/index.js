const express = require('express');
const mqttClient = require('./rutas/mqttService'); // Importa el cliente MQTTT
const conectarBaseDeDatos =  require('./rutas/SQLite')


const db = conectarBaseDeDatos();

const app = express();
const PORT = 3000;


// Crear las tablas en la base de datos si no existen
db.serialize(() => {

  db.run('CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, password CHAR)');

  db.run('CREATE TABLE IF NOT EXISTS Datos_ambientales (fecha_hora DATETIME, temperatura REAL, humedad REAL, luminosidad REAL)');

  db.run('CREATE TABLE IF NOT EXISTS Datos_SN (fecha_hora DATETIME, temperatura REAL, pH REAL, EC REAL)');
 
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
