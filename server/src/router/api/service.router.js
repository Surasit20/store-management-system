const router = require('express').Router();
const ServiceController = require('../../controllers/service.controller');
//const auth = require('../../utils/auth');

router.get('/notification',ServiceController.sendNotification);


//router.get('/profile',UsersController.getProfile);


module.exports = router;