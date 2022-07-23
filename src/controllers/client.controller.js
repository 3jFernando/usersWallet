const bcrypt = require('bcrypt'),
    Client = require('../models/client.model');

// listar todos los clientes
const getAll = async (req, res) => {

    return await Client.find()
        .then(clients => res.json({ message: "datos cargados con exito", clients }))
        .catch(() => res.status(500).json({ message: "No es posible cargar los clientes" }))
}

// creacion de clientes
const store = async (req, res) => {

    const password = generatePassword(req.body.Password);

    // procesar la data
    const dataRequest = {
        Email: req.body.Email,
        Password: password,
        FullName: req.body.FullName,
        Cedula: req.body.Cedula,
        Direccional: req.body.Direccional
    };

    try {

        // crear el cliente
        await Client.create(dataRequest)
            .then(client => res.json({ message: "Cliente creado", client }))
            .catch(err => {
                res.status(400).json({
                    message: "No es posible crear el cliente",
                    error: err
                });
            })
    } catch (err) {
        res.status(500).json({ message: "No es posible crear el cliente" + err })
    }
}

// generacion de clave encriptada
const generatePassword = password => bcrypt.hashSync(password, 10)

module.exports = { getAll, store };