const jwt = require('jsonwebtoken'),
    Client = require('../models/client.model');
const bcrypt = require('bcrypt');

// login de clientes
const login = async (req, res) => {

    const email = req.body.Email;
    const password = req.body.Password;

    try {

        await Client.findOne({ Email: email })
            .then(client => {

                if (!bcrypt.compareSync(password, client.Password)) {
                    return res.status(401).json({
                        message: "Login fallido, email o password incorrectos.",
                        Email: email
                    });
                }

                res.json({
                    message: "Login exitoso.",
                    token: jwt.sign({ _id: client._id, FullName: client.FullName, Email: client.Email }, 'API_AUTH_TOKEN')
                });
            })
            .catch(e => res.status(500).json({ message: "No fue posible procesar la solicitud.", error: e }))
    } catch (e) {
        res.status(500).json({ message: "Upps, No fue posible procesar la solicitud.", error: e })
    }

}

module.exports = { login };