const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer');
const authCheck = require('../middleware/auth-check');

router.post('', CustomerController.CreateCustomer);
router.put('/:id', authCheck, CustomerController.UpdateCustomer);
router.get('', authCheck, CustomerController.RetriveCustomers);
router.get('/:id', authCheck, CustomerController.RetriveCustomerById);
router.delete('/:id', authCheck, CustomerController.DeleteCustomer);
router.post('/login', CustomerController.LoginToAccount);

module.exports = router;