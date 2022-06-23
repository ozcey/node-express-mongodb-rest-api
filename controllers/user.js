const User = require('../models/user');
const Customer = require('../models/customer');
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
                roles: req.body.roles
            });
            user
                .save()
                .then((savedUser) => {
                    apiRes.createdResponseWithData(res, 'User created successfully!', savedUser);
                })
                .catch((err) => apiRes.errorResponseWithData(res, 'User created failed!', err));
        })
};

const updateUser = (req, res) => {
    bycrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                _id: req.params.id,
                name: req.body.name,
                email: req.body.email,
                password: hash,
                roles: req.body.roles
            });
            User
                .updateOne({
                    _id: req.params.id
                }, user)
                .then((result) => {
                    if (result.modifiedCount > 0) {
                        apiRes.successResponse(res, 'User updated successfully!');
                    } else {
                        apiRes.notFoundResponse(res, 'User not found!');
                    }
                })
                .catch((err) => {
                    apiRes.errorResponseWithData(res, 'Updating user failed!', err)
                });
        })
};

const retriveUsers = (req, res) => {
    User
        .find()
        .then((users) => {
            apiRes.successResponseWithOnlyData(res, users);
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Fetching users failed!', err));
};

const retriveUserById = (req, res) => {
    User
        .findById(req.params.id)
        .then((user) => {
            if (user) {
                apiRes.successResponseWithOnlyData(res, user);
            } else {
                apiResponses.errorResponseWithData(res, user);
            }
        })
        .catch((err) => apiRes.errorResponseWithData(res, 'Fetching user failed!', err));
};

const deleteUser = (req, res) => {
    User
        .deleteOne({
            _id: req.params.id
        })
        .then((result) => {
            if (result.deletedCount > 0) {
                apiRes.successResponse(res, 'User deleted successfully!');
            } else {
                apiRes.notFoundResponse(res, 'User not found!');
            }
        })
        .catch((err) => apiRes.errorResponse(res, 'Deleting user failed!'));
};

const hasCustomerRole = async (req, res) => {
    let hasRole = false;
    await Customer
        .findOne({
            email: req.body.email
        })
        .then((customer) => {
            if (customer.roles.includes('ROLE_CUSTOMER')) {
                hasRole = true;
                return;
            };
            hasRole = false;
        })
        .catch((err) => {
            hasRole = false;
        });
    return hasRole;
}

const login = async (req, res) => {
    const isCustomer = await hasCustomerRole(req, res);
    if (isCustomer) {
        loginToAccount(req, res, Customer);
    } else {
        loginToAccount(req, res, User);
    }
};

const loginToAccount = (req, res, model) => {
    let fetchedUser;
    model
        .findOne({
            email: req.body.email
        })
        .then((user) => {
            if (!user) {
                return apiRes.unauthorizedResponse(res, 'Auth failed!');
            };
            console.log('user logged In');
            fetchedUser = user;
            return bycrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return apiRes.unauthorizedResponse(res, 'Auth failed!');
            };

            const token = jwt.sign({
                    email: fetchedUser.email,
                    userId: fetchedUser._id,
                    userRole: fetchedUser.roles
                },
                process.env.JWT_SECRET_KEY, {
                    expiresIn: '1d'
                }
            );

            res
                .status(200)
                .json({
                    token: token,
                    expiresIn: 86400
                })
        })
        .catch((err) => {
            return apiRes.unauthorizedResponse(res, 'Auth failed!');
        });
};

module.exports = {
    createUser,
    updateUser,
    retriveUsers,
    retriveUserById,
    deleteUser,
    login
};