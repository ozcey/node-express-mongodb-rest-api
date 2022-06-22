const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const authCheck = require('../middleware/auth-check');
const verifyRoles = require('../middleware/verifyRoles');
const roles = require('../utils/role');

router.post('', customerController.createCustomer);
router.put('/:id', [authCheck.verifyToken, verifyRoles(roles.Customer)], customerController.updateCustomer);
router.get('', [authCheck.verifyToken, verifyRoles(roles.Admin, roles.User)], customerController.retriveCustomers);
router.get('/:id', [authCheck.verifyToken, verifyRoles(roles.Customer)], customerController.retriveCustomerById);
router.delete('/:id', [authCheck.verifyToken, verifyRoles(roles.Customer, roles.Admin)], customerController.deleteCustomer);
router.post('/login', customerController.loginToAccount);

module.exports = router;