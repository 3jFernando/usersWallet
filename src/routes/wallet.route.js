const router = require('express').Router();
const { getAllWallets, storeWallet } = require('../controllers/wallet.controller');

router.get('/', getAllWallets)
router.post('/', storeWallet)

module.exports = router;