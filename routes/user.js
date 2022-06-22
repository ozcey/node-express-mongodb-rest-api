const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authCheck = require('../middleware/auth-check');
const roles = require('../utils/role');
const verifyRoles = require('../middleware/verifyRoles');

router.post('', userController.createUser);
router.put('/:id', [authCheck.verifyToken, verifyRoles(roles.Admin)], userController.updateUser);
router.get('',  [authCheck.verifyToken, verifyRoles(roles.Admin, roles.User)], userController.retriveUsers);
router.get('/:id',   [authCheck.verifyToken, verifyRoles(roles.Admin, roles.User)], userController.retriveUserById);
router.delete('/:id',  [authCheck.verifyToken, verifyRoles(roles.Admin)], userController.deleteUser);
router.post('/login', userController.login);

module.exports = router;