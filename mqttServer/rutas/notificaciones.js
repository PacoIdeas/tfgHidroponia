const express = require('express');

const Notificaciones = express.Router(); 
 
const conectarBaseDeDatos =  require('./SQLite.js');

const db = conectarBaseDeDatos();
const util = require('util');
const dbGetAsync = util.promisify(db.all).bind(db);

class Notificacion { 
    constructor() {
        this.id_notificacion = null;
        this.id_cultivo = null;
        this.parametro = null;
        this.severity = null;
    }
}

 

Notificaciones.get('/notificaciones', async (req, res) => {
    
    id_cultivo = req.query.id_cultivo
    const query = 'SELECT * FROM notificaciones WHERE id_cultivo = ?';
    const rows = await dbGetAsync(query, [id_cultivo]);

    if (rows.length > 0) {
        res.status(200).json(rows);
    } else {
        res.status(404).send('Not found');
    }

})


Notificaciones.post('/GuardaNotificaciones', async (req, res) => {
    id_cultivo = req.body.id_cultivo
    notificaciones = req.body.notificaciones

    const query_borra = 'DELETE FROM notificaciones WHERE id_cultivo = ?';
    const rows_borra = await dbGetAsync(query_borra, [id_cultivo]);

    for(const notificacion of notificaciones) {
        const query = 'INSERT INTO notificaciones (id_cultivo, parametro) VALUES (?, ?)';
        const rows = await dbGetAsync(query, [id_cultivo, notificacion.parametro]);
    }
 
 
})



Notificaciones.get('/infoNotificaciones', async (req, res) => {
    
    id_cultivo = req.query.id_cultivo;
    const query = 'SELECT * FROM info_notificaciones WHERE id_cultivo = ?';
    const rows = await dbGetAsync(query, [id_cultivo]);

    if (rows.length > 0) {
        res.status(200).json(rows);
    } else {
        res.status(404).send('Not found');
    }

})

Notificaciones.put('/notificacionesVistas', async (req,res) => {

    try{
        id_cultivo = req.body.id_cultivo;
        notificacionesVistas = req.body.notificacionesVistas;
    
        const fechaHoraActual = obtenerFechaHoraActual();
    
        notificacionesVistas.forEach(async notificacion => {
        if (notificacion.fechaHoraVista === null) {
          notificacion.fechaHoraVista = new Date(fechaHoraActual);
          const query = 'UPDATE info_notificaciones SET fechaHoraVista = ? WHERE id_cultivo = ? AND id_notificacion = ?;';
          const rows = await dbGetAsync(query, [fechaHoraActual, id_cultivo, notificacion.id_notificacion]);
        }
      });
      res.status(200);
    }catch(error){
        res.status(400).send('Bad request');
    }
})


function obtenerFechaHoraActual() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


module.exports = Notificaciones