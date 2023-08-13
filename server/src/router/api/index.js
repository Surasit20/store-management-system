

const router = require('express').Router();

router.use('/users', require('./user.router'));
router.use('/motorcycles',require('./motorcycle.router'))
router.use('/summaries',require('./summary.router'))
router.use('/repaildataes',require('./repaildata.router'))
router.use('/installments',require('./installment.router'))
router.use('/auth',require('./auth.router'))
router.use('/month-installments',require('./month.installments.router'))

//router.use('/email', require('./sendEmail'));

//router.use('/', require('./authRouter'));

module.exports = router;