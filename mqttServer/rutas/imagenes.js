const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mqttClient = require('./mqttService'); // Importa el cliente MQTTT

const Imagenes = express.Router(); 

const conectarBaseDeDatos =  require('./SQLite.js');

const db = conectarBaseDeDatos();
const util = require('util'); 
const dbGetAsync = util.promisify(db.all).bind(db);

require('dotenv').config();

 
Imagenes.get('/ImagenActual', async (req, res) => {
  try {
    const id_cultivo = req.query.id_cultivo;
    const fecha = new Date();
 
    const dia = fecha.getDate().toString().padStart(2, '0'); 
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');  
    const año = fecha.getFullYear().toString();
 
    const fechaFormateada = `${dia}-${mes}-${año}`;

    const borrarImagen = 'DELETE FROM imagenes WHERE id_cultivo = ? AND fecha = ?';
    const eliminada = await dbGetAsync(borrarImagen, [id_cultivo, fechaFormateada]);

 
    const rutaArchivo = path.join(__dirname, '../imagenes', fechaFormateada+'.jpg'); // Reemplaza 'ruta_a_la_carpeta' con la ruta real de la carpeta

    fs.unlink(rutaArchivo, (error) => {
      if (error) {
        console.error('Error al eliminar el archivo:', error);
        // return;
      }
      console.log('Archivo eliminado con éxito.');
    });
 
    console.log("Solicitud de imagen a la ESP32-CAM");
    const nombreFoto = await new Promise((resolve, reject) => {
      mqttClient.peticionDeImagen((nombreFoto) => {
        console.log('Nombre de la foto:', nombreFoto);
        resolve(nombreFoto);
      });
    });
    const query_edita_principal = 'UPDATE cultivos SET imagen = ? WHERE id_cultivo = ?';
    const rows_edita_principal = await dbGetAsync(query_edita_principal, [nombreFoto, id_cultivo]);

    const query = 'INSERT INTO imagenes (imagen, id_cultivo, fecha) VALUES (?, ?, ?);';
    const rows = await dbGetAsync(query, [nombreFoto, id_cultivo, fechaFormateada]);
    if (rows.length > 0) {
      console.log("No hay registros");
      res.status(400);
    } else {
      console.log("Registros insertados");
      res.json({ nombre: nombreFoto });
    } 

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



module.exports = Imagenes;