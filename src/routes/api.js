const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = require('../config/swagger');

// middlewares
const { middlewareAuth } = require('../middlewares/auth.middleware')

// rutas
const authRoute = require('./auth.route')
const clientsRoute = require('./client.route');
const walletsRoute = require('./wallet.route');

module.exports = (app) => {

    // swagger
    app.use('/api/v1/doc',
        swaggerUI.serve,
        swaggerUI.setup(swaggerJsDoc(swaggerSpec))
    );

    // autenticación
    app.use('/api/v1/auth', authRoute);

    // rutas que requiren permisos
    app.use('/api/v1/clients', middlewareAuth, clientsRoute);
    app.use('/api/v1/wallets', middlewareAuth, walletsRoute);

}