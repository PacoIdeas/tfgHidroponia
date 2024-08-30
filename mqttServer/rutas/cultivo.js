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

  class datosCultivoActuales {

    id_cultivo = 0;
    fecha = new Date(0);
   
    dias_transcurridos = 0;
    imagen = " ";
    fecha_imagen = new Date(0);
  
    temperatura = 0;
    humedad = 0;
    luminosidad = 0;
  
    temperaturaSN = 0;
    pH = 0;
    EC = 0;
    fecha_EC = new Date(0);
  
  }


  function formatearFecha(fecha) {
    let dd = String(fecha.getDate()).padStart(2, '0'); // Día
    let mm = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes (se suma 1 porque en JavaScript los meses comienzan desde 0)
    let yyyy = fecha.getFullYear(); // Año
  
    return `${yyyy}-${mm}-${dd}`;
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
        cultivo =  arrayCultivos.push(cultivo);
    }



    if (rows.length == 0) {
        console.log("No hay registros");
    }else{
        console.log("se envian los cultivos predefinidos");
        
        res.json(rows);
    }

})


Cultivos.post('/Cultivos', async (req, res) => { //add - edit
    console.log("POST /Cultivos");
 
    

    const { id_cultivo, Nombre, imagen ,rango_CE_min,rango_CE_max, rango_pH_min, rango_pH_max, rango_temperatura_SN_min, rango_temperatura_SN_max, rango_temperatura_min, rango_temperatura_max, rango_humedad_min, rango_humedad_max, Fecha_Creacion, rango_lux_max, rango_lux_min } = req.body;

 
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);

    const query_comprueba = `SELECT * FROM Cultivos WHERE id_cultivo = '${id_cultivo}'`;
    const res_existe = await dbGetAsync(query_comprueba);
    
    if(res_existe.length != 0){
        console.log("El cultivo ya existe");

        const query_edita = `UPDATE Cultivos
        SET Nombre = '${Nombre}',
            Fecha_Creacion = '${Fecha_Creacion}',
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
            rango_lux_min = '${rango_lux_min}',
            rango_lux_max = '${rango_lux_max}'
        WHERE id_cultivo = '${id_cultivo}';`;
        const edita = await dbGetAsync(query_edita);

        res.status(400);



    }else{ //// Es un cultivo nuevo;  creamos el cultivo, cogemos su id y le asignamos una programacion horaria pro defecto




      const query = `INSERT INTO Cultivos (Nombre, Fecha_Creacion, imagen,
        rango_CE_min,rango_CE_max, rango_pH_min, rango_pH_max, rango_temperatura_SN_min, rango_temperatura_SN_max, rango_temperatura_min, rango_temperatura_max,
         rango_humedad_min, rango_humedad_max, fecha_creacion, rango_lux_min, rango_lux_max) VALUES ('${Nombre}', '${fechaFormateada}', '${imagen}',
      '${rango_CE_min}','${rango_CE_max}','${rango_pH_min}','${rango_pH_max}','${rango_temperatura_SN_min}','${rango_temperatura_SN_max}','${rango_temperatura_min}','${rango_temperatura_max}','${rango_humedad_min}','${rango_humedad_max}','${Fecha_Creacion}', '${rango_lux_min}','${rango_lux_max}')`;
  
      const rows = await dbGetAsync(query);
  



      const query_id_cultivo = `SELECT MAX(id_cultivo) FROM Cultivos WHERE Nombre = '${Nombre}' AND Fecha_Creacion = '${fechaFormateada}'`;
      const row = await dbGetAsync(query_id_cultivo);
      const id_cultivo = row[0]['MAX(id_cultivo)'];
      const insertarImagenPredefinida =   `INSERT INTO imagenes (id_cultivo, imagen, fecha) VALUES ('${id_cultivo}', '${imagen}', '${fechaFormateada}')`;
      const a = await dbGetAsync(insertarImagenPredefinida);

      const query_creaEC = `INSERT INTO Ec_medida (id_cultivo, Ec, fecha) VALUES ('${id_cultivo}', '0', '${fechaFormateada}')`;
      const b = await dbGetAsync(query_creaEC);
      console.log("Cultivo disponible insertado");

      for(let i=0; horarios_default.length > i; i++){
        const query_inserta_horario = "INSERT INTO HorariosRiego (id_cultivo, momento, minutos_on, minutos_off) VALUES (?, ?, ?, ?)";
        const rows = await dbGetAsync(query_inserta_horario, [id_cultivo,  horarios_default[i].momento,  horarios_default[i].minutos_on,  horarios_default[i].minutos_off]);

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

Cultivos.get('/datosActuales', async (req, res) => {
  const id_cultivo = req.query.id_cultivo;
  datosActuales = new datosCultivoActuales();

  const query_datosActuales = `SELECT * FROM Datos_recogidos WHERE id_cultivo = '${id_cultivo}' ORDER BY fecha_hora DESC LIMIT 1;`; 
  const ultimoRegistro = await dbGetAsync(query_datosActuales);
  if(ultimoRegistro.length > 0){
    datosActuales.humedad = ultimoRegistro[0].humedad;
    datosActuales.temperatura = ultimoRegistro[0].temp_ambiente;
    datosActuales.luminosidad = ultimoRegistro[0].luminosidad;
    datosActuales.fecha = ultimoRegistro[0].fecha_hora;
    datosActuales.pH = ultimoRegistro[0].pH;
    datosActuales.temperaturaSN = ultimoRegistro[0].temp_SN;
  }

  const query_datosImagen = `SELECT * 
  FROM imagenes 
  WHERE id_cultivo = '${id_cultivo}' 
  ORDER BY strftime('%d-%m-%Y', fecha) DESC;`; 
  const ultimaImagen = await dbGetAsync(query_datosImagen);
  if(ultimaImagen.length > 0){
    datosActuales.imagen = ultimaImagen[ultimaImagen.length - 1].imagen;
    datosActuales.fecha_imagen = ultimaImagen[ultimaImagen.length - 1].fecha;
  }

  const query_datosEC = `SELECT * FROM Ec_medida WHERE id_cultivo = '${id_cultivo}' ORDER BY fecha DESC LIMIT 1;`;
  const rows_EC = await dbGetAsync(query_datosEC);
  if(rows_EC.length > 0){
    datosActuales.EC = rows_EC[0].Ec;
    datosActuales.fecha_EC = rows_EC[0].fecha;
  }

  const query_fechaCultivo = `SELECT * FROM cultivos WHERE id_cultivo = '${id_cultivo}';`;
  const rowsFechaCultivo = await dbGetAsync(query_fechaCultivo);
  if(rowsFechaCultivo.length > 0){
    datosActuales.fecha = rowsFechaCultivo[0].Fecha_Creacion;
    const fecha_creacion = new Date(rowsFechaCultivo[0].Fecha_Creacion);

    const dias_transcurridos = Math.floor((new Date() - fecha_creacion) / (1000 * 60 * 60 * 24));
    datosActuales.dias_transcurridos = dias_transcurridos;
  }

  res.status(200).json(datosActuales);

})

Cultivos.post('/actualizarEC', async (req, res) => {

  const id_cultivo = req.body.id_cultivo;
  const EC = req.body.EC;
  let fecha = new Date();
  let fechaFormateada = formatearFecha(fecha);

  const query_mismaFecha = `SELECT * FROM EC_medida WHERE id_cultivo = '${id_cultivo}' AND fecha = '${fechaFormateada}'`;
  const rows_mismaFecha = await dbGetAsync(query_mismaFecha);
  if(rows_mismaFecha.length > 0){
    const query = `UPDATE EC_medida SET Ec = '${EC}', fecha = '${fechaFormateada}' WHERE id_cultivo = '${id_cultivo}'`;
    const rows = await dbGetAsync(query);
    res.status(400);
    return;
  }else{

    const query = `INSERT INTO EC_medida (id_cultivo, Ec, fecha) VALUES ('${id_cultivo}', '${EC}', '${fechaFormateada}')`;
    const rows = await dbGetAsync(query);
    res.status(200);
    return;

  }
 
})





//// horarios





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

Cultivos.post('/GuardaHorarios', async (req, res) => {

const id_cultivo = req.body.id_cultivo;
const horarios = req.body.horarios;
console.log("Guardando horarios", horarios, id_cultivo);

const query_borra_horario = `DELETE FROM HorariosRiego WHERE id_cultivo = '${id_cultivo}'`;
const borrados = await dbGetAsync(query_borra_horario);

for(let i=0; horarios.length > i; i++){
  const query_inserta_horario = "INSERT INTO HorariosRiego (id_cultivo, momento, minutos_on, minutos_off) VALUES (?, ?, ?, ?)";
  const rows = await dbGetAsync(query_inserta_horario, [id_cultivo, horarios[i].momento, horarios[i].minutos_on, horarios[i].minutos_off]);
}
})


//Datosos historicos
Cultivos.get('/historial', async (req, res) => {
  try {
    const id_cultivo = req.query.id_cultivo;
    const query = `SELECT * FROM Datos_recogidos WHERE id_cultivo = '${id_cultivo}'`;
    const rows = await dbGetAsync(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos historicos' });
  }
});



 

module.exports = Cultivos;