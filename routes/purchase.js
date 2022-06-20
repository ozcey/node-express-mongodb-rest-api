const express = require('express');
const router = express.Router();
const purchaseController =  require('../controllers/purchase');
const authCheck = require('../middleware/auth-check');

router.post('', authCheck, purchaseController.submitPurchase);
router.put('/:id', authCheck, purchaseController.updatePurchase);
router.get('', purchaseController.retrivePurchase);
router.get('/:id', purchaseController.retrivePurchaseById);
router.delete('/:id', authCheck, purchaseController.deletePurchase);

module.exports = router;