const jwt = require('jsonwebtoken');
const apiRes = require('../utils/apiRes');

const verifyToken = (req, res, next) => {
    try {
          const token = req.headers.authorization.split(' ')[1];
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
          req.userData = {
              email: decodedToken.email,
              userId: decodedToken.userId,
              userRole: decodedToken.userRole
          };
          next();
    } catch (error) {
        apiRes.unauthorizedResponse(res, 'Auth failed!')
    }
};

module.exports = {
    verifyToken
};