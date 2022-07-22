const Wallet = require('../models/wallet.model');

// cargar todas las billeteras
const getAllWallets = async (req, res) => {

    return await Wallet.find()
        .then(wallets => res.json({ message: "datos cargados con exito", wallets }))
        .catch(() => res.status(500).json({ message: "No es posible cargar los clientes", wallets: [] }));
};

// crear billeteras
const storeWallet = async (req, res) => {

    // obtener los datos
    const dataRequest = {
        UserID: req.body.UserID,
        BalanceUSD: req.body.BalanceUSD,
        BalanceCOP: req.body.BalanceCOP
    };

    try {

        // verificar si ya tiene un billetera creada 
        await Wallet.findOne({ UserID: dataRequest.UserID })
            .then(wallet => {

                if (wallet) {
                    res.status(404).json({ message: "El cliente ya tiene una Billetera creada", wallet })
                } else {
                    // crear billetera
                    Wallet.create(dataRequest)
                        .then(wallet => res.json({ message: "Billetera creada", wallet }))
                        .catch(() => res.status(404).json({ message: "No es posible crear la billetera" }));
                }

            })
            .catch(() => res.status(404).json({ message: "No fue posible identificar si el cliente ya había creado previamente una billetera." }));

    } catch (e) {
        // control de errores
    }
}

// recargar billetera
const toUpWallet = async (req, res) => {

    let valueCurrentlyUSD = 4300; // valor actual del USD en COP

    // validar datos requeridos
    if (!req.params.id) {
        res.status(400).send({ message: "Las propiedad id es obligatoría en la URL!" });
        return;
    }
    if (!req.body.Balance) {
        res.status(400).send({ message: "Las propiedad Balance es obligatoría!" });
        return;
    }

    // procesar datos    
    const Balance = req.body.Balance; // el valor que se agregara al balance actual
    const typeTopUp = req.body.typeTopUp || 'USD'; // el tipo de ingreso: USD/COP

    try {
        /**
         * encontrar la billeteras
         * 
         * verificar si el ID de la wallet existe 
         */
        await Wallet.findById(req.params.id).then(wallet => {

            /* 
            * si son USD los ingresados solo se suma en usd, pero 
            * de locontrario se convierte el cop a usd y lo mismo con el balance de COP
            **/
            let BalanceUSD = wallet.BalanceUSD;
            let BalanceCOP = wallet.BalanceCOP;

            if (typeTopUp === 'USD') {
                BalanceUSD = (parseFloat(wallet.BalanceUSD) + parseFloat(Balance))

                // calcular los USD ingresados y convertirlos a COP para agregarlos al balance actual
                const convertUSDtoCOP = (parseFloat(valueCurrentlyUSD) * parseFloat(Balance))
                BalanceCOP = (parseFloat(wallet.BalanceCOP) + parseFloat(convertUSDtoCOP))
            } else {
                BalanceCOP = (parseFloat(wallet.BalanceCOP) + parseFloat(Balance))

                // calcular los COP ingresados y convertirlos a USD para agregarlos al balance actual
                const convertCOPtoUSD = (parseFloat(Balance) / parseFloat(valueCurrentlyUSD))
                BalanceUSD = (parseFloat(wallet.BalanceUSD) + parseFloat(convertCOPtoUSD))
            }
            const newData = {
                BalanceUSD: BalanceUSD.toFixed(2),
                BalanceCOP: BalanceCOP.toFixed(2)
            }

            // actualizarla los balances (USD, COP)
            Wallet.updateOne({ _id: req.params.id }, newData)
                .then(payload => {
                    res.json({ message: "Billetera recargada.", wallet: payload });
                })
                .catch(() => res.status(500).json({ message: "Upps, no fue posible recargar la billetera." }));

        }).catch(() => {
            res.status(404).json({ message: "La billetera que intentas procesar, esta presentando problemas." });
        });
    } catch (e) {
        res.status(500).json({ message: "Upps, problemas con proceso de recargar billetera", error: e.message });
    }
}

module.exports = { getAllWallets, storeWallet, toUpWallet };