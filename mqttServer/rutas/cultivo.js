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

  class HorarioRiego {
    constructor(momento, minutos_on, minutos_off) {
      this.momento = momento;
      this.minutos_on = minutos_on;
      this.minutos_off = minutos_off;
    }
  }
  
  const horario_madrugada = new HorarioRiego("madrugada", 10, 50 );
  const horario_manana = new HorarioRiego("manana", 10, 30);
  const horario_tarde = new HorarioRiego("tarde", 5, 5);
  const horario_noche = new HorarioRiego("noche", 10, 40);
  
  const horarios_default = [horario_madrugada, horario_manana, horario_tarde, horario_noche];

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


  function generarJSON(rangoCEMin, rangoCEMax, rangoPHMin, rangoPHMax, rangoTemperaturaSNMin, rangoTemperaturaSNMax, rangoTemperaturaMin, rangoTemperaturaMax, rangoHumedadMin, rangoHumedadMax) {
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
        cultivo = 
        arrayCultivos.push(cultivo);
    }



    if (rows.length == 0) {
        console.log("No hay registros");
    }else{
        console.log("se envian los cultivos predefinidos");
        
        res.json(rows);
    }

})


Cultivos.post('/Cultivos', async (req, res) => {
    console.log("POST /Cultivos");
 
    

    const { id_cultivo, Nombre, imagen ,rango_CE_min,rango_CE_max, rango_pH_min, rango_pH_max, rango_temperatura_SN_min, rango_temperatura_SN_max, rango_temperatura_min, rango_temperatura_max, rango_humedad_min, rango_humedad_max, fecha_creacion, rango_lux_max, rango_lux_min } = req.body;

 
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);

    const query_comprueba = `SELECT * FROM Cultivos WHERE id_cultivo = '${id_cultivo}'`;
    const res_existe = await dbGetAsync(query_comprueba);
    
    if(res_existe.length != 0){
        console.log("El cultivo ya existe");

        const query_edita = `UPDATE Cultivos
        SET Nombre = '${Nombre}',
            Fecha_Creacion = '${fechaFormateada}',
            imagen = '${imagen}',
            rango_CE_min = '${rango_CE_min}',
            rango_CE_max = '${rango_CE_max}',
            rango_pH_min = '${rango_pH_min}',
            rango_pH_max = '${rango_pH_max}',
            rango_temperatura_SN_min = '${rango_temperatura_SN_min}',
            rango_temperatura_SN_max = '${rango_temperatura_SN_max}',
            rango_temperatura_min = '${rango_temperatura_min}',
            rango_temperatura_max = '${rango_temperatura_max}',
            rango_humedad_min = '${rango_humedad_min}',
            rango_humedad_max = '${rango_humedad_max}',
            fecha_creacion = '${fecha_creacion}',
            rango_lux_min = '${rango_lux_min}',
            rango_lux_max = '${rango_lux_max}'
        WHERE id_cultivo = '${id_cultivo}';`;
        const edita = await dbGetAsync(query_edita);

        res.status(400);



    }else{ //// Es un cultivo nuevo;  creamos el cultivo, cogemos su id y le asignamos una programacion horaria pro defecto




      const query = `INSERT INTO Cultivos (Nombre, Fecha_Creacion, imagen, 
        rango_CE_min,rango_CE_max, rango_pH_min, rango_pH_max, rango_temperatura_SN_min, rango_temperatura_SN_max, rango_temperatura_min, rango_temperatura_max,
         rango_humedad_min, rango_humedad_max, fecha_creacion, rango_lux_min, rango_lux_max) VALUES ('${Nombre}', '${fechaFormateada}','${imagen}',
      '${rango_CE_min}','${rango_CE_max}','${rango_pH_min}','${rango_pH_max}','${rango_temperatura_SN_min}','${rango_temperatura_SN_max}','${rango_temperatura_min}','${rango_temperatura_max}','${rango_humedad_min}','${rango_humedad_max}','${fecha_creacion}', '${rango_lux_min}','${rango_lux_max}')`;
  
      const rows = await dbGetAsync(query);
  
      if (rows.afectedRows == 0) {
          console.log("No hay insertados registros");
          res.status(400);;
      }else{
  
          console.log("Cultivo disponible insertado");

          const query_id_cultivo = `SELECT id_cultivo FROM Cultivos WHERE Nombre = '${Nombre}' AND Fecha_Creacion = '${fechaFormateada}'`;
          const id_cultivo = await dbGetAsync(query_id_cultivo);

          for(let i=0; horarios_default.length > i; i++){
            const query_inserta_horario = "INSERT INTO HorariosRiego (id_cultivo, momento, minutos_on, minutos_off) VALUES (?, ?, ?, ?)";
            const rows = await dbGetAsync(query_inserta_horario, [id_cultivo[id_cultivo.length-1].id_cultivo, horarios_default[i].momento, horarios_default[i].minutos_on, horarios_default[i].minutos_off]);

          }
      }

    }


})

Cultivos.delete('/Cultivos', async (req, res) => {
    console.log("borro")
    const id = req.body.id;

    const query_borra_horario = `DELETE FROM HorariosRiego WHERE id_cultivo = '${id}'`;

    const borrados = await dbGetAsync(query_borra_horario);



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



//// horarios


Cultivos.get('/Horarios', async (req, res) => {

    const id = req.query.id_cultivo;
    const query = `SELECT * FROM HorariosRiego WHERE id_cultivo = '${id}'`;
    const rows = await dbGetAsync(query);

    if(rows.length == 0){
        console.log("No hay registros");
        res.status(400);
    }else{
        console.log("Registros encontrados");
        res.status(200).json(rows);
    }
    
})

 

module.exports = Cultivos;