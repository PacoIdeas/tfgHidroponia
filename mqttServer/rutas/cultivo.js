const express = require('express');

const Cultivos = express.Router(); 
 
const conectarBaseDeDatos =  require('./SQLite.js');

const db = conectarBaseDeDatos();
const util = require('util');
const dbGetAsync = util.promisify(db.all).bind(db);





Cultivos.get('/Cultivos', async (req, res) => {

    const query = "SELECT * FROM Cultivos";
    const rows = await dbGetAsync(query);

    if (rows.length == 0) {
        console.log("No hay registros");
    }else{
        console.log(rows);
        
        res.json(rows);
    }

})


Cultivos.post('/Cultivos', async (req, res) => {

    const { nombre, niveles_SN, niveles_ambientales, fecha_creacion } = req.body;


    const query = `INSERT INTO Cultivos (Nombre, Niveles_SN,Nieveles_Ambientales, Fecha_Creacion) VALUES ('${nombre}', '${niveles_SN}','${niveles_ambientales}','${fecha_creacion}')`;

    const rows = await dbGetAsync(query);

    if (rows.afectedRows == 0) {
        console.log("No hay insertados registros");
        res.status(400);;
    }else{
        console.log("Registros insertados");

        const peticion = `SELECT * FROM Cultivos WHERE Nombre = '${nombre}'`;

        const rows = await dbGetAsync(peticion);
        res.status(200).json(rows);
    }

})

Cultivos.delete('/Cultivos', async (req, res) => {
    
    const { nombre } = req.body;
    
    const query = `DELETE FROM Cultivos WHERE Nombre = '${nombre}'`;

    const rows = await dbGetAsync(query);

    if (rows.afectedRows == 0) {
        console.log("No hay registros");
        res.status(400);
    }else{
        console.log("Registros eliminados");
        res.status(200);
    }
})
 

module.exports = Cultivos;