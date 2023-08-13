const router = require('express').Router();
const MonthInstallmentsController = require('../../controllers/month.installments.controller');
//const auth = require('../../utils/auth');

router.post('/',MonthInstallmentsController.postMonthInstallments);

router.get ('/',MonthInstallmentsController.getMonthInstallments);

router.get('/:id',MonthInstallmentsController.getMonthInstallmentsById);

router.put('/:MONTH_INSTALLMENTS_ID',MonthInstallmentsController.updateMonthInstallmentsById)

router.delete('/:MONTH_INSTALLMENTS_ID', MonthInstallmentsController.deleteMonthInstallmentsById);

//router.get('/profile',UsersController.getProfile);


module.exports = router;