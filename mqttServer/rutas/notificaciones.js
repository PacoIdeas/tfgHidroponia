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

  }

}


Notificaciones.get('/NotificacionesActivas', async (req, res) => {
    
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





module.exports = Notificaciones