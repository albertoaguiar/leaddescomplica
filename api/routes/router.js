const express = require('express');
const leadsController = require('../controllers/LeadsController');

const router = express.Router();

router.get('/leads/:id?', leadsController.get);
router.post('/leads', leadsController.insert);
router.delete('/leads/:id', leadsController.deleteLead);
router.get('/download-leads', leadsController.exportExcel);

module.exports = router;