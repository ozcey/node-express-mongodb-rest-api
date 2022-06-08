const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const authCheck = require('../middleware/auth-check');

router.post('', authCheck, ProductController.CreateProduct);
router.put('/:id', authCheck, ProductController.UpdateProduct);
router.get('', ProductController.retriveProducts);
router.get('/:id', ProductController.retriveProductById);
router.get('/search/:name', ProductController.retriveProductByName);
router.delete('/:id', authCheck, ProductController.deleteProduct);

module.exports = router;