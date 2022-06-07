const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer');

router.post('', CustomerController.CreateCustomer);
router.put('/:id', CustomerController.UpdateCustomer);
router.get('', CustomerController.retriveCustomers);
router.get('/:id', CustomerController.retriveCustomerById);
router.delete('/:id', CustomerController.deleteCustomer);

module.exports = router;