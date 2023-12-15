const express = require('express');

const Cultivos = express.Router(); 
 
const conectarBaseDeDatos =  require('./SQLite.js');

const db = conectarBaseDeDatos();
const util = require('util');
const dbGetAsync = util.promisify(db.all).bind(db);


class Cultivo {
    constructor() {
      this.id_cultivo = null;
      this.Nombre = null;
      this.imagen = null;
  
      this.rango_CE_min = null;
      this.rango_CE_max = null;
  
      this.rango_pH_min = null;
      this.rango_pH_max = null;
  
      this.rango_temperatura_SN_max = null;
      this.rango_temperatura_SN_min = null;
  
      this.rango_temperatura_max = null;
      this.rango_temperatura_min = null;
  
      this.rango_humedad_max = null;
      this.rango_humedad_min = null;
  
      this.Fecha_Creacion = null;
    }
  }



  function asignarValoresDesdeJSON(id_cultivo, Nombre, imagen , jsonObject, fecha_creacion) {

    let cultivo = new Cultivo();


    cultivo.id_cultivo = id_cultivo;
    cultivo.Nombre = Nombre;
    cultivo.imagen = imagen;
 
    const json = JSON.parse(jsonObject); 

    cultivo.rango_CE_min = json.rango_CE.minimo;
    cultivo.rango_CE_max = json.rango_CE.maximo;

    cultivo.rango_pH_min = json.rango_pH.minimo;
    cultivo.rango_pH_max = json.rango_pH.maximo;

    cultivo.rango_temperatura_SN_min = json.rango_temperatura_SN.minimo;
    cultivo.rango_temperatura_SN_max = json.rango_temperatura_SN.maximo;

    cultivo.rango_temperatura_min = json.rango_temperatura.minimo;
    cultivo.rango_temperatura_max = json.rango_temperatura.maximo;

    cultivo.rango_humedad_min = json.rango_humedad.minimo;
    cultivo.rango_humedad_max = json.rango_humedad.maximo;


    cultivo.Fecha_Creacion = fecha_creacion;

    return cultivo;
  }


  function generarJSON(rangoCEMin, rangoCEMax, unidadCE, rangoPHMin, rangoPHMax, rangoTemperaturaSNMin, rangoTemperaturaSNMax, rangoTemperaturaMin, rangoTemperaturaMax, rangoHumedadMin, rangoHumedadMax) {
    const jsonGenerado = {
      "rango_CE": {
        "minimo": rangoCEMin,
        "maximo": rangoCEMax,
      },
      "rango_pH": {
        "minimo": rangoPHMin,
        "maximo": rangoPHMax
      },
      "rango_temperatura_SN": {
        "minimo": rangoTemperaturaSNMin,
        "maximo": rangoTemperaturaSNMax
      },
      "rango_temperatura": {
        "minimo": rangoTemperaturaMin,
        "maximo": rangoTemperaturaMax
      },
      "rango_humedad": {
        "minimo": rangoHumedadMin,
        "maximo": rangoHumedadMax
      }
    };
  
    return JSON.stringify(jsonGenerado);
  }


  function formatearFecha(fecha) {
    let dd = String(fecha.getDate()).padStart(2, '0'); // Día
    let mm = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes (se suma 1 porque en JavaScript los meses comienzan desde 0)
    let yyyy = fecha.getFullYear(); // Año
  
    return `${dd}-${mm}-${yyyy}`;
  }


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

Cultivos.get('/CultivosPredefinidos', async (req, res) => {

    const query = "SELECT * FROM CultivosPredefinidos";
    const rows = await dbGetAsync(query);

    
    let cultivo = new Cultivo();
    let arrayCultivos = [];
    for (var i = 0; i < rows.length; i++) {
        cultivo = asignarValoresDesdeJSON(rows[i].id_cultivo, rows[i].Nombre, rows[i].imagen, rows[i].Parametros, rows[i].Fecha_Creacion);
        arrayCultivos.push(cultivo);
    }



    if (rows.length == 0) {
        console.log("No hay registros");
    }else{
        console.log("se envian los cultivos predefinidos");
        
        res.json(arrayCultivos);
    }

})


Cultivos.post('/Cultivos', async (req, res) => {
    console.log("POST /Cultivos");
    let cultivo = new Cultivo();

    const { id_cultivo, Nombre, imagen ,rango_CE_min,rango_CE_max, rango_pH_min, rango_pH_max, rango_temperatura_SN_min, rango_temperatura_SN_max, rango_temperatura_min, rango_temperatura_max, rango_humedad_min, rango_humedad_max, fecha_creacion } = req.body;

    let json = generarJSON(rango_CE_min, rango_CE_max, rango_pH_min, rango_pH_max, rango_temperatura_SN_min, rango_temperatura_SN_max, rango_temperatura_min, rango_temperatura_max, rango_humedad_min, rango_humedad_max);
    
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);

    const query = `INSERT INTO Cultivos (Nombre, Fecha_Creacion, imagen, Parametros) VALUES ('${Nombre}', '${fechaFormateada}','${imagen}','${json}')`;

    const rows = await dbGetAsync(query);

    if (rows.afectedRows == 0) {
        console.log("No hay insertados registros");
        res.status(400);;
    }else{

        console.log("Cultivo disponible insertado");
    }

})

Cultivos.delete('/Cultivos', async (req, res) => {
    console.log("borro")
    const id = req.body.id;
    
    const query = `DELETE FROM Cultivos WHERE id_cultivo = '${id}'`;

    const rows = await dbGetAsync(query);

    if (rows.length == 0) {
        console.log("No hay registros");
        res.status(400);
    }else{
        console.log("Registros eliminados");
        res.status(200);
    }
})
 

module.exports = Cultivos;