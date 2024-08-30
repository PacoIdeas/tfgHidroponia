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
 