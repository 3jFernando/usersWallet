const Client = require('../models/client.model');

const getAllClients = async (req, res) => {

    return await Client.find((err, clientes) => {
        if (err) res.status(500).json({ message: "No es posible cargar los clientes", clientes: [] });
        res.json({ message: "datos cargados con exito", clientes: clientes });
    })
};

const storeClient = async (req, res) => {

    const dataRequest = { 
        Email: req.body.Email, 
        Password: req.body.Password, 
        FullName: req.body.FullName, 
        Cedula: req.body.Cedula, 
        Direccional: req.body.Direccional 
    };

    Client.create(dataRequest, err => {
        if (err) res.status(500).json({ message: "No es posible crear el cliente" });
        res.json({ message: "Cliente creado" });
    });

}

module.exports = { getAllClients, storeClient };