const express = require('express'),
    http = require('http'),
    path = require('path');

// importar la database
const databaseConection = require('./src/config/database');

// configuracion para uso de varibales de entorno
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// configuracion de swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Clientes wallet",
            version: "0.0.1"
        },
        servers: [
            {
                url: "http://localhost:3100"
            }
        ]
    },
    apis: [
        `${path.join(__dirname, './src/routes/*.route.js')}`
    ]
}

const app = express();

// configuraciones
const port = process.env.PORT || 3100;
app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({ urlencoded: false }));

// conexion a la database mongo
databaseConection();

// configuracion de rutas 
app.use('/api/v1/clients', require('./src/routes/client.route'));
app.use('/api/v1/wallets', require('./src/routes/wallet.route'));
app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

const server = http.createServer(app);
server.listen(port);