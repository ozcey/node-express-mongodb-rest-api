const Customer = require('../models/customer');
const apiRes = require('../utils/apiRes');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.CreateCustomer = (req, res) => {
    bycrypt.hash(req.body.password, 10)
        .then((hash) => {
            const customer = new Customer({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hash,
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

exports.UpdateCustomer = (req, res) => {
    const customer = new Customer({
        _id: req.params.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
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
            console.log('error', err);
            apiRes.errorResponseWithData(res, 'Updating customer failed!', err)
        });
};

exports.retriveCustomers = (req, res) => {
    Customer
        .find()
        .then((customers) => {
            apiRes.successResponseWithOnlyData(res, customers);
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Fetching customers failed!', err));
};

exports.retriveCustomerById = (req, res) => {
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

exports.deleteCustomer = (req, res) => {
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

exports.LoginToAccount = (req, res) => {
    let fetchedCustomer;
    Customer
        .findOne({
            email: req.body.email
        })
        .then((customer) => {
            if (!customer) {
                return apiRes.unauthorizedResponse(res, 'Auth failed!');
            };
            fetchedCustomer = customer;
            return bycrypt.compare(req.body.password, customer.password);
        })
        .then((result) => {
            if (!result) {
                return apiRes.unauthorizedResponse(res, 'Auth failed!');
            };

            const token = jwt.sign({
                    email: fetchedCustomer.email,
                    customerId: fetchedCustomer._id
                },
                process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                }
            );

            res
                .status(200)
                .json({
                    token: token,
                    expiresIn: 3600
                })
        })
        .catch((err) => {
            return apiRes.unauthorizedResponse(res, 'Auth failed!');
        })
};