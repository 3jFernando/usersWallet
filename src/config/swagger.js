// configuracion de swagger
const path = require('path');

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
            },
            {
                url: "https://users-wallet.herokuapp.com"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    in: "header",
                    name: "Authorization"
                }
            }
        }
    },
    apis: [
        `${path.join(__dirname, '../routes/*.route.js')}`
    ]
}

module.exports = swaggerSpec;