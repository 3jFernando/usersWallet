const mongoose = require('mongoose');

const wallet = mongoose.Schema({
    UserID: String,
    BalanceUSD: String,
    BalanceCOP: String,
});

const walletModel = mongoose.model('billeteras', wallet);
module.exports = walletModel;