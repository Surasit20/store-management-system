const router = require('express').Router();
const InstallmentController = require('../../controllers/installment.controller');
//const auth = require('../../utils/auth');

router.post('/',InstallmentController.postInstallment);

router.get ('/',InstallmentController.getInstallment);

router.get('/:id',InstallmentController.getInstallmentById);

router.put('/:INSTALLMENTS_ID',InstallmentController.updateInstallmentById)

router.delete('/:INSTALLMENTS_ID', InstallmentController.deleteInstallmentById);

//router.get('/profile',UsersController.getProfile);


module.exports = router;