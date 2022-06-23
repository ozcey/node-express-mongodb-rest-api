const express = require('express');
const router = express.Router();
const purchaseController =  require('../controllers/purchase');
const authCheck = require('../middleware/auth-check');
const roles = require('../utils/role');
const verifyRoles = require('../middleware/verifyRoles');

router.post('', authCheck.verifyToken, purchaseController.submitPurchase);
router.put('/:id', authCheck.verifyToken, purchaseController.updatePurchase);
router.get('', [authCheck.verifyToken, verifyRoles(roles.Admin)], purchaseController.retrivePurchase);
router.get('/:id', [authCheck.verifyToken, verifyRoles(roles.Customer, roles.Admin, roles.User)], purchaseController.retrivePurchaseById);
router.delete('/:id', authCheck.verifyToken, purchaseController.deletePurchase);

module.exports = router;