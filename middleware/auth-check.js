const jwt = require('jsonwebtoken');
const apiRes = require('../utils/apiRes');

module.exports = (req, res, next) => {
    try {
          const token = req.headers.authorization.split(' ')[1];
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
          req.customerData = {
              email: decodedToken.email,
              customerId: decodedToken.customerId
          };
          next();
    } catch (error) {
        apiRes.unauthorizedResponse(res, 'Auth failed!')
    }
};