const express = require('express'),
    http = require('http'),
    cors = require('cors');

const app = express();
const port = process.env.PORT || 3100;
const databaseConection = require('./src/config/database');

// configuracion para uso de varibales de entorno
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// configuraciones
app.set('port', port);
app.use(express.json());
app.use(cors());
//app.use(express.urlencoded({ urlencoded: false }));

// conexion a la database mongo
databaseConection();

// configuracion de rutas 
let configRoutes = require('./src/routes/api');
configRoutes(app)

const server = http.createServer(app);
server.listen(port);