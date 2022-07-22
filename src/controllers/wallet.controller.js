const Wallet = require('../models/wallet.model');

const getAllWallets = async (req, res) => {

    return await Wallet.find((err, payload) => {
        if (err) res.status(500).json({ message: "No es posible cargar los clientes", wallets: [] });
        res.json({ message: "datos cargados con exito", wallets: payload });
    })
};

const storeWallet = async (req, res) => {

    const dataRequest = { 
        UserID: req.body.UserID, 
        BalanceUSD: req.body.BalanceUSD, 
        BalanceCOP: req.body.BalanceCOP
    };

    Wallet.create(dataRequest, err => {
        if (err) res.status(500).json({ message: "No es posible crear la billetera" });
        res.json({ message: "Billetera creada" });
    });

}

module.exports = { getAllWallets, storeWallet };