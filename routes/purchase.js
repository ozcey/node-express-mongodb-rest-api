const express = require('express');
const router = express.Router();
const PurchaseController =  require('../controllers/purchase');
const authCheck = require('../middleware/auth-check');

router.post('', authCheck, PurchaseController.SubmitPurchase);

module.exports = router;