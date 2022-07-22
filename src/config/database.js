const mongoose = require('mongoose');

const poolConnection = async () => {

    const endPoint = `mongodb+srv://userapp:${process.env.PASSWORD_CLUSTER_MONGO}@cluster0.7sj4r.mongodb.net/test`

    return await mongoose.connect(endPoint, { dbName: "user-wallets" })
        .then(() => console.log("conexion exitosa"))
        .catch(error => console.error("Error de conexión a Mongo, ", error))
}

module.exports = poolConnection;