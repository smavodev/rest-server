require('./config/config');

const express = require('express');
const app = express();

app.get('/usuario', function (req, res) {
  res.json('Peticion  GET ejecutada!');
});

app.post('/usuario', function (req, res) {
    res.json('Peticion POST ejecutada!');
  });

  app.put('/usuario', function (req, res) {
    res.json('Peticion PUT ejecutada!');
  });

  app.delete('/usuario', function (req, res) {
    res.json('Peticion DELETE ejecutada!');
  });
  


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
    console.log('Puerta de enlace '+'http://localhost:'+ process.env.PORT);
});
  

