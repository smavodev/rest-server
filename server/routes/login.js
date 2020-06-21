const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const Usuario = require('../models/usuario');

const app = express();


//Peticion POST
app.post('/login', (req, res) => {

    let body = req.body;
    
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED , { expiresIn: process.env.CADUCIDAD_TOKEN } ); //espira en  30 dias

        res.json({
            ok: true,
            usuario: usuarioDB,
            token

        });

    });

});


// Configuraciones de Google
async function verify( token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture);
  }


app.post('/google', async(req, res) => {

     let token = req.body.idtoken;

    verify(token); 

    return res.json({
        token
    });

});


 

module.exports = app;