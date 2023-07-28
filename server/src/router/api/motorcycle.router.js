const router = require('express').Router();
const MotorcycleController = require('../../controllers/motorcycle.controller');
//const auth = require('../../utils/auth');

router.post('/',MotorcycleController.postMotorcycle);

router.get ('/',MotorcycleController.getMotorcycle);

router.get('/:id',MotorcycleController.getMotorcycleById);

router.put('/:MOTORCYCLE_ID',MotorcycleController.updateMotorcycleById)

router.delete('/:MOTORCYCLE_ID', MotorcycleController.deleteMotorcycleById);


module.exports = router;