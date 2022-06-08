const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const authCheck = require('../middleware/auth-check');

router.post('', authCheck, ProductController.CreateProduct);
router.put('/:id', authCheck, ProductController.UpdateProduct);
router.get('', authCheck, ProductController.retriveProducts);
router.get('/:id', authCheck, ProductController.retriveProductById);
router.delete('/:id', authCheck, ProductController.deleteProduct);

module.exports = router;