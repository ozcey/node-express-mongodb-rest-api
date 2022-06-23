const apiRes = require('../utils/apiRes');

const verifyRoles = (...roles) => {
    return (req, res, next) => {
        const userRoles = req.userData.userRole;
        if(!userRoles){
            return apiRes.forbiddenResponse(res, 'You do not have the permission to perform this action!');
        }
        const roleList = [...roles];
        const result = userRoles
            .map((role) => roleList.includes(role))
            .find((val) => val === true);
        if(!result){
            return apiRes.forbiddenResponse(res, 'You do not have the permission to perform this action!');
        };
        next();
    }
}

module.exports = verifyRoles;