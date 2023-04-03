const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Crea la tabla `users`
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nameuser TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    birth TEXT NOT NULL
  );
`);
function findUserByEmailAndPassword(email, password, callback) {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password];
    db.get(sql, values, (err, row) => {
      if (err) {
        callback(err);
      } else {
        callback(null, row);
      }
    });
  }
  
// Exporta una función que acepta una consulta SQL y un arreglo de valores como parámetros, y que retorna los resultados de la operación
module.exports = function(sql, values, callback) {
  db.all(sql, values, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};


// * Modelo de Coleccion en Mongoose (MongoDB)
// const { Schema, model } = require('mongoose');

// const userSchema = new Schema({
//     nameuser: String,
//     lastname: String,
//     email: String,
//     password: String,
//     birth: Date
// }, {
//     timestamps: true
// })

// module.exports = model('User', userSchema)