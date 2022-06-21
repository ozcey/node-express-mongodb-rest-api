const jwt = require('jsonwebtoken');
const apiRes = require('../utils/apiRes');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
    try {
          const token = req.headers.authorization.split(' ')[1];
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
          req.userData = {
              email: decodedToken.email,
              userId: decodedToken.userId
          };
          next();
    } catch (error) {
        apiRes.unauthorizedResponse(res, 'Auth failed!')
    }
};

const isAdmin = (req, res, next) => {
    User.findById(req.userData.userId)
    .then((user) => {
        if(!user){
            return apiRes.errorResponse(res, 'User not found!');
        }
        if(user.role === 'ROLE_ADMIN'){
            next()
        };
    })
    .catch((err) => {
        apiRes.unauthorizedResponse(err, 'Auth failed!')
    })
};

const isUser = (req, res, next) => {
    User.findById(req.userData.userId)
    .then((user) => {
        if(!user){
            return apiRes.errorResponse(res, 'User not found!');
        }
        if(user.role === 'ROLE_USER'){
            next()
        };
    })
    .catch((err) => {
        apiRes.unauthorizedResponse(err, 'Auth failed!')
    })
};

module.exports = {
    verifyToken,
    isAdmin,
    isUser
};