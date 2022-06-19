const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const authCheck = require('../middleware/auth-check');

router.post('', authCheck, ProductController.CreateProduct);
router.put('/:id', authCheck, ProductController.UpdateProduct);
router.get('', ProductController.RetriveProducts);
router.get('/:id', ProductController.RetriveProductById);
router.get('/search/:name', ProductController.RetriveProductByName);
router.delete('/:id', authCheck, ProductController.DeleteProduct);

module.exports = router;