const router = require('express').Router();
const { getAllWallets, storeWallet, toUpWallet } = require('../controllers/wallet.controller');

router.get('/', getAllWallets)
router.post('/', storeWallet)
router.put('/:id', toUpWallet)

module.exports = router;