
const express = require("express");
const bcrypt = require('bcrypt');
const _ = require('underscore'); 
const Usuario = require('../models/usuario');
const app = express();

//Peticion GET
app.get("/usuario", function (req, res) {
    
    Usuario.find({})
        
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }


                res.json({
                    ok: true,
                    usuarios: usuarios
                });

            
        });

  });
  
  //Peticion POST
  app.post("/usuario", function (req, res) {
    let body = req.body;
  
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        /*usuarioDB.password = null; //ocultar password*/

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

  });
  


  app.put("/usuario/:id", function (req, res) {
      
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); 

    /*delete body.password; --- una forma de bloquear la actualizacion de este dato*/

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

  });
  


  app.delete("/usuario", function (req, res) {
    res.json("Peticion DELETE ejecutada!");
  });

  module.exports = app;