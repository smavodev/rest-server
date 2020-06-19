// Importando archivo config.js
require("./config/config.js");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes
app.use(require('./routes/usuario.js'));

// Conexion a base de datos
mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
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