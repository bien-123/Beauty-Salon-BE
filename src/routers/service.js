const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/serviceController.js');

router.post('/add', serviceController.addService);
router.get('/', serviceController.getService);
router.put('/update/:id', serviceController.updateService);
router.delete('/delete/:id', serviceController.deleteService);
router.get('/search', serviceController.searchService);
router.get('/searchp', serviceController.searchPaginationService);
router.get('/searchbill', serviceController.getServiceBill);
module.exports = router;
