const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, walletController.getWallet);
router.post('/deposit', auth, walletController.deposit);
router.post('/withdraw', auth, walletController.withdraw);
router.post('/escrow', auth, walletController.escrow);
router.get('/transactions', auth, walletController.getTransactions);

module.exports = router;
