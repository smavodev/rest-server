require("./config/config");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Peticion GET
app.get("/usuario", function (req, res) {
  res.json("Peticion  GET ejecutada");
});

//Peticion POST
app.post("/usuario", function (req, res) {
  let body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: "El nombre es necesario",
    });
  } else {
    res.json({
      persona: body,
    });
  }
});

app.put("/usuario/:id", function (req, res) {
  let id = req.params.id;

  res.json({
    id: id,
  });
});

app.delete("/usuario", function (req, res) {
  res.json("Peticion DELETE ejecutada!");
});

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