const User = require('../models/user');
const apiRes = require('../utils/apiRes');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
    bycrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role: req.body.role
            });
            user
                .save()
                .then((savedUser) => {
                    apiRes.createdResponseWithData(res, 'User created successfully!', savedUser);
                })
                .catch((err) => apiRes.errorResponseWithData(res, 'User created failed!', err));
        })
};

// const updateCustomer = (req, res) => {
//     const customer = new Customer({
//         _id: req.params.id,
//         name: req.body.name,
//         phone: req.body.phone,
//         email: req.body.email,
//         password: req.body.password,
//         address: {
//             street: req.body.address.street,
//             city: req.body.address.city,
//             state: req.body.address.state,
//             zipcode: req.body.address.zipcode
//         }

//     });

//     Customer
//         .updateOne({
//             _id: req.params.id
//         }, customer)
//         .then((result) => {
//             if (result.modifiedCount > 0) {
//                 apiRes.successResponse(res, 'Customer updated successfully!');
//             } else {
//                 apiRes.notFoundResponse(res, 'Customer not found!');
//             }
//         })
//         .catch((err) => {
//             apiRes.errorResponseWithData(res, 'Updating customer failed!', err)
//         });
// };

// const retriveCustomers = (req, res) => {
//     Customer
//         .find()
//         .then((customers) => {
//             apiRes.successResponseWithOnlyData(res, customers);
//         })
//         .catch((err) => apiRes.errorResponseWithData(res, 'Fetching customers failed!', err));
// };

// const retriveCustomerById = (req, res) => {
//     Customer
//         .findById(req.params.id)
//         .then((customer) => {
//             if (customer) {
//                 apiRes.successResponseWithOnlyData(res, customer);
//             } else {
//                 apiResponses.successResponseWithOnlyData(res, customer);
//             }
//         })
//         .catch((err) => apiRes.errorResponseWithData(res, 'Fetching customer by id failed!', err));
// };

// const deleteCustomer = (req, res) => {
//     Customer
//         .deleteOne({
//             _id: req.params.id
//         })
//         .then((result) => {
//             if (result.deletedCount > 0) {
//                 apiRes.successResponse(res, 'Customer deleted successfully!');
//             } else {
//                 apiRes.notFoundResponse(res, 'Customer not found!');
//             }
//         })
//         .catch((err) => apiRes.errorResponse(res, 'Deleting customer failed!'));
// };

const login = (req, res) => {
    let fetchedUser;
    User
        .findOne({
            email: req.body.email
        })
        .then((user) => {
            if (!user) {
                return apiRes.unauthorizedResponse(res, 'Auth failed!');
            };
            fetchedUser = user;
            return bycrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return apiRes.unauthorizedResponse(res, 'Auth failed!');
            };

            const token = jwt.sign({
                    email: fetchedUser.email,
                    userId: fetchedUser._id
                },
                process.env.JWT_SECRET_KEY, {
                    expiresIn: '1d'
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

module.exports = {
    createUser,
    updateCustomer,
    retriveCustomers,
    retriveCustomerById,
    deleteCustomer,
    login
};