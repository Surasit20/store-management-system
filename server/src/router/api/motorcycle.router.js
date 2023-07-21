const router = require('express').Router();
const MotorcycleController = require('../../controllers/motorcycle.controller');
//const auth = require('../../utils/auth');

router.post('/',MotorcycleController.getMotorcycleById);

router.get('/:id([0-9])',MotorcycleController.getMotorcycleById);

router.delete('/:id([0-9])', MotorcycleController.deleteMotorcycleById);

//router.get('/profile',UsersController.getProfile);


module.exports = router;