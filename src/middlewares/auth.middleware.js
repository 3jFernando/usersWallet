const jwt = require('jsonwebtoken');

/**
 * Definicion de middlewares
 * para control de rutas
 */

// middleware para verificar que el usuario tenga una sesion valida
const middlewareAuth = (req, res, next) => {

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'API_AUTH_TOKEN', (err, decode) => {
            if (err) return res.status(401).json({ message: 'Usuario no autorizado!' });
            req.client = decode;
            next();
        });
    } else return res.status(401).json({ message: 'Usuario no autorizado!' });

}

module.exports = { middlewareAuth };