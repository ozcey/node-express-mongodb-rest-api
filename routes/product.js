const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const authCheck = require('../middleware/auth-check');
const roles = require('../utils/role');
const verifyRoles = require('../middleware/verifyRoles');

router.post('', [authCheck.verifyToken, verifyRoles(roles.Admin, roles.User)], productController.createProduct);
router.put('/:id', [authCheck.verifyToken, verifyRoles(roles.Admin, roles.User)], productController.updateProduct);
router.get('', productController.retriveProducts);
router.get('/:id', productController.retriveProductById);
router.get('/search/:name', productController.retriveProductByName);
router.delete('/:id', [authCheck.verifyToken, verifyRoles(roles.Admin)], productController.deleteProduct);

module.exports = router;