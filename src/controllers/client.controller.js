const Client = require('../models/client.model');

// listar todos los clientes
const getAllClients = async (req, res) => {

    return await Client.find()
        .then(clients => res.json({ message: "datos cargados con exito", clients }))
        .catch(() => res.status(500).json({ message: "No es posible cargar los clientes" }))
}

// creacion de clientes
const storeClient = async (req, res) => {

    // procesar la data
    const dataRequest = {
        Email: req.body.Email,
        Password: req.body.Password,
        FullName: req.body.FullName,
        Cedula: req.body.Cedula,
        Direccional: req.body.Direccional
    };

    try {
        // crear el cliente
        await Client.create(dataRequest)
            .then(client => res.json({ message: "Cliente creado", client }))
            .catch(() => res.status(500).json({ message: "No es posible crear el cliente" }))
    } catch (e) { }
}

module.exports = { getAllClients, storeClient };