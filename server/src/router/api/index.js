

const router = require('express').Router();

router.use('/users', require('./user.router'));
router.use('/motorcycles',require('./motorcycle.router'))

//router.use('/email', require('./sendEmail'));

//router.use('/', require('./authRouter'));

module.exports = router;