const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const authCheck = require('../middleware/auth-check');

router.post('', authCheck, productController.createProduct);
router.put('/:id', authCheck, productController.updateProduct);
router.get('', productController.retriveProducts);
router.get('/:id', productController.retriveProductById);
router.get('/search/:name', productController.retriveProductByName);
router.delete('/:id', authCheck, productController.deleteProduct);

module.exports = router;