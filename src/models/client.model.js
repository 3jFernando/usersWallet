const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const client = new mongoose.Schema({
    Email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    Password: String,
    FullName: {
        type: String,
        required: true
    },
    Cedula: {
        type: Number,
        required: true
    },
    Direccional: {
        type: String,
        required: true
    }
});

// metodo para comprar contraseñas
client.methods.verificPassword = password => bcrypt.compareSync(password, this.Password);

const clientModel = mongoose.model("cliente", client);

module.exports = clientModel;