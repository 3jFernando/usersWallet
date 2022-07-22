const mongoose = require('mongoose');

const client = new mongoose.Schema({
    Email: String,
    Password: String,
    FullName: String,
    Cedula: String,
    Direccional: String
});

const clientModel = mongoose.model("cliente", client);
module.exports = clientModel;