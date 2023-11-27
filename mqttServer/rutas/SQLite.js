const sqlite3 = require('sqlite3').verbose();

function conectarBaseDeDatos() {
  const db = new sqlite3.Database('BD_Hidroponia.sqlite', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Conexión exitosa a la base de datos SQLite');
    }
  });

  return db;
}

module.exports = conectarBaseDeDatos;

 















// const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//     host:'127.0.0.1',
//     port: '3306',
//     user: 'root',
//     password: 'root',
//     database: 'BD_TFG_WINDOWS',
//     connectionLimit: 10
   

// });

// async function getConnection(){
//     try{
//         const connection = await pool.getConnection();
//         return connection;
//     }catch(error){
//         console.log(error);
//     }

// }



// module.exports = {getConnection};