const router = require('express').Router();
const { getAllClients, storeClient } = require('../controllers/client.controller');

router.get('/', getAllClients)
router.post('/', storeClient)

module.exports = router;