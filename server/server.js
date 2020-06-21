// Importando archivo config.js
require("./config/config.js");

const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// habilitar la carpeta public
app.use(express.static(path.resolve( __dirname, '../public')));


// Routes [Configuracion de Rutas]
app.use(require('./routes/index.js'));

// Conexion a base de datos
mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, (err, res) => {
  if (err) throw err;
  else{
    console.log('Base de datos Conectada'+'');

    app.listen(process.env.PORT, () => {
      /*console.log("Escuchando puerto: ", process.env.PORT);*/
      console.log("Servidor Conectado " + "http://localhost:" + process.env.PORT);
      
    });

  }
});

/*
app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
  console.log("Puerta de enlace " + "http://localhost:" + process.env.PORT);
});
*/