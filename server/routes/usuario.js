
const express = require("express");
const bcrypt = require('bcrypt');
const _ = require('underscore'); 
const Usuario = require('../models/usuario');
const app = express();

// Proteger Rutas
const { verificaToken, verificaAdmin_Role} = require('../middlewares/autenticacion')


//Peticion GET
app.get("/usuario", verificaToken, (req, res) => {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img') //filtrando los campos del usuario
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios: usuarios,
                    cuantos: conteo
                });
            });
            
        });

  });
  
  //Peticion POST
  app.post("/usuario", [verificaToken, verificaAdmin_Role], function (req, res) {
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
  

 //Peticion PUT
  app.put("/usuario/:id", [verificaToken, verificaAdmin_Role], function (req, res) {
      
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
  

 //Peticion DELETE
  app.delete("/usuario/:id", [verificaToken, verificaAdmin_Role],  function (req, res) {
    
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    
    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
  });

  module.exports = app;