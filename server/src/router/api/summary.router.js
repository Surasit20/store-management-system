const router = require('express').Router();
const SummaryController = require('../../controllers/summary.controller');
//const auth = require('../../utils/auth');

router.post('/',SummaryController.postSummary);

router.get ('/',SummaryController.getSummary);

router.get('/:id',SummaryController.getSummaryById);

router.put('/:SUMMARY_DAILT_INSTALLMENTS_ID',SummaryController.updateSummaryById)

router.delete('/:SUMMARY_DAILT_INSTALLMENTS_ID', SummaryController.deleteSummaryById);



module.exports = router;