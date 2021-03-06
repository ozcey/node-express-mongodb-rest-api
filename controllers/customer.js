const Customer = require('../models/customer');
const apiRes = require('../utils/apiRes');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roles = require('../utils/role');

const createCustomer = (req, res) => {
    bycrypt.hash(req.body.password, 10)
        .then((hash) => {
            const customer = new Customer({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hash,
                roles: [roles.Customer],
                address: {
                    street: req.body.address.street,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    zipcode: req.body.address.zipcode
                }
            });
            customer
                .save()
                .then((savedCustomer) => {
                    apiRes.createdResponseWithData(res, 'Customer created successfully!', savedCustomer);
                })
                .catch((err) => apiRes.errorResponseWithData(res, 'Customer created failed!', err));
        })
};

const updateCustomer = (req, res) => {
    bycrypt.hash(req.body.password, 10)
        .then((hash) => {
            const customer = new Customer({
                _id: req.params.id,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hash,
                roles: [roles.Customer],
                address: {
                    street: req.body.address.street,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    zipcode: req.body.address.zipcode
                }
            });
            Customer
                .updateOne({
                    _id: req.params.id
                }, customer)
                .then((result) => {
                    if (result.modifiedCount > 0) {
                        apiRes.successResponse(res, 'Customer updated successfully!');
                    } else {
                        apiRes.notFoundResponse(res, 'Customer not found!');
                    }
                })
                .catch((err) => {
                    apiRes.errorResponseWithData(res, 'Updating customer failed!', err)
                });
        });
};

const retriveCustomers = (req, res) => {
    Customer
        .find()
        .then((customers) => {
            apiRes.successResponseWithOnlyData(res, customers);
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Fetching customers failed!', err));
};

const retriveCustomerById = (req, res) => {
    Customer
        .findById(req.params.id)
        .then((customer) => {
            if (customer) {
                apiRes.successResponseWithOnlyData(res, customer);
            } else {
                apiResponses.successResponseWithOnlyData(res, customer);
            }
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Fetching customer by id failed!', err));
};

const deleteCustomer = (req, res) => {
    Customer
        .deleteOne({
            _id: req.params.id
        })
        .then((result) => {
            if (result.deletedCount > 0) {
                apiRes.successResponse(res, 'Customer deleted successfully!');
            } else {
                apiRes.notFoundResponse(res, 'Customer not found!');
            }
        })
        .catch((err) => apiRes.errorResponse(res, 'Deleting customer failed!'));
};

module.exports = {
    createCustomer,
    updateCustomer,
    retriveCustomers,
    retriveCustomerById,
    deleteCustomer,
};