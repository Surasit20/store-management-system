const router = require('express').Router();
const UsersController = require('../../controllers/user.controller');
//const auth = require('../../utils/auth');

router.post('/',UsersController.getUserById);

router.get('/:id([0-9])',UsersController.getUserById);

router.delete('/:id([0-9])', UsersController.deleteById);

//router.get('/profile',UsersController.getProfile);


module.exports = router;