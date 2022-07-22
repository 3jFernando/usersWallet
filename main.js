const express = require('express');
const http = require('http');
const databaseConection = require('./src/config/database');

// configuracion para uso de varibales de entorno
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();
const port = process.env.PORT || 3100;

// configuraciones
app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({ urlencoded: false }));

// conexion a la database mongo
databaseConection();

// configuracion de rutas 
app.use('/api/v1/clients', require('./src/routes/client.route'));
app.use('/api/v1/wallets', require('./src/routes/wallet.route'));

const server = http.createServer(app);
server.listen(port);