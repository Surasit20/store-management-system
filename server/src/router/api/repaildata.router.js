const router = require('express').Router();
const RepailDataController = require('../../controllers/repaildata.controller');
//const auth = require('../../utils/auth');

router.post('/',RepailDataController.postRepailData);

router.get ('/',RepailDataController.getRepailData);

router.get('/:id',RepailDataController.getRepailDataById);

router.put('/:REPAILDATA_ID',RepailDataController.updateRepailDataById)

router.delete('/:REPAILDATA_ID', RepailDataController.deleteRepailDataById);

//router.get('/profile',UsersController.getProfile);


module.exports = router;