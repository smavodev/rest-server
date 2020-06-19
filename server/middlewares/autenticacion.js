const jwt = require('jsonwebtoken');

// ========== Verificar Token  ===========
let verificaToken = (req, res, next) => {
    
    let token = req.get('Authorization'); //Authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({ //401 = Unauthorized
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
    
};

module.exports = {
    verificaToken
}