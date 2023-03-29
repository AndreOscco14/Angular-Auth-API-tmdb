const express = require('express');
const app = express();
require ('./database');


app.listen(3000);
console.log('Servidor escuchando en puero',3000);