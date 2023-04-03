const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to the SQLite database.');
});

module.exports = db;

// * Conexión con MongoDB (Mongoose)
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/angular-auth')
// .then(db => console.log('Database is conecct'))
// .catch(err => console.log(err))