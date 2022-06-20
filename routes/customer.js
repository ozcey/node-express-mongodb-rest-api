const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const authCheck = require('../middleware/auth-check');

router.post('', customerController.createCustomer);
router.put('/:id', authCheck, customerController.updateCustomer);
router.get('', authCheck, customerController.retriveCustomers);
router.get('/:id', authCheck, customerController.retriveCustomerById);
router.delete('/:id', authCheck, customerController.deleteCustomer);
router.post('/login', customerController.loginToAccount);

module.exports = router;