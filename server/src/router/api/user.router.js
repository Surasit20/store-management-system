const router = require('express').Router();
const UsersController = require('../../controllers/user.controller');
//const auth = require('../../utils/auth');

router.post('/',UsersController.postUser);

router.get ('/',UsersController.getUser);

router.get('/:id',UsersController.getUserById);

router.put('/:USER_ID',UsersController.updateUserById)

router.delete('/:USER_ID', UsersController.deleteUserById);

//router.get('/profile',UsersController.getProfile);


module.exports = router;