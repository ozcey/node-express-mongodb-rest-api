const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authCheck = require('../middleware/auth-check');

router.post('', userController.createUser);
router.put('/:id', [authCheck.verifyToken, authCheck.isAdmin], userController.updateUser);
router.get('', [authCheck.verifyToken, authCheck.isAdmin, authCheck.isUser], userController.retriveUsers);
router.get('/:id', [authCheck.verifyToken, authCheck.isAdmin, authCheck.isUser], userController.retriveUserById);
router.delete('/:id', [authCheck.verifyToken, authCheck.isAdmin], userController.deleteUser);
router.post('/login', userController.loginToAccount);

module.exports = router;