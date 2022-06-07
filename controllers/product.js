const Product = require('../models/product');
const apiRes = require('../utils/apiRes');

exports.CreateProduct = (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        demographic: req.body.demographic,
        category: req.body.category,
        type: req.body.type,
        quantity: req.body.quantity,
        imageURL: req.body.imageURL,
        customerId: req.customerData.customerId
    });

    product
        .save()
        .then((savedProduct) => {
            apiRes.createdResponseWithData(res, 'Product created successfully!', savedProduct);
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Product created failed!', err));
};

exports.UpdateProduct = (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        demographic: req.body.demographic,
        category: req.body.category,
        type: req.body.type,
        quantity: req.body.quantity,
        imageURL: req.body.imageURL,
        customerId: req.customerData.customerId
    });

    Product
        .updateOne({
            _id: req.params.id,
            customerId: req.customerData.customerId
        }, product)
        .then((result) => {
            if (result.modifiedCount > 0) {
                apiRes.successResponse(res, 'Product updated successfully!');
            } else {
                apiRes.notFoundResponse(res, 'Product not found!');
            }
        })
        .catch((err) => {
            apiRes.errorResponseWithData(res, 'Updating product failed!', err)
        });
};

exports.retriveProducts = (req, res) => {
    Product
        .find()
        .then((products) => {
            apiRes.successResponseWithOnlyData(res, products);
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Fetching products failed!', err));
};

exports.retriveProductById = (req, res) => {
    Product
        .findById(req.params.id)
        .then((product) => {
            if (product) {
                apiRes.successResponseWithOnlyData(res, product);
            } else {
                apiResponses.successResponseWithOnlyData(res, product);
            }
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Fetching product by id failed!', err));
};

exports.deleteProduct = (req, res) => {
    Product
        .deleteOne({
            _id: req.params.id
        })
        .then((result) => {
            if (result.deletedCount > 0) {
                apiRes.successResponse(res, 'Product deleted successfully!');
            } else {
                apiRes.notFoundResponse(res, 'Product not found!');
            }
        })
        .catch((err) => apiRes.errorResponse(res, 'Deleting product failed!'));
};