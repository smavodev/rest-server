require('./config/config');

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.json('Hello World!');
});

app.get('/usuario', function(req, res) {
    res.json('get Usuario LOCAL!!!');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
    console.log('Puerta de enlace '+'http://localhost:3000'+ process.env.PORT);
});
  

