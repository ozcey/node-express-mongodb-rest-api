const express = require('express');
const router = express.Router();
const PurchaseController =  require('../controllers/purchase');
const authCheck = require('../middleware/auth-check');

router.post('', authCheck, PurchaseController.SubmitPurchase);
router.put('/:id', authCheck, PurchaseController.UpdatePurchase);
router.get('', PurchaseController.retrivePurchase);
router.get('/:id', PurchaseController.retrivePurchaseById);
router.delete('/:id', authCheck, PurchaseController.deletePurchase);

module.exports = router;