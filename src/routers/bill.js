const express = require('express');
const router = express.Router();

const billController = require('../controllers/billController.js');

router.post('/add', billController.addBill);
router.get('/', billController.getBill);
router.put('/update/:id', billController.updateBill);
router.delete('/delete/:id', billController.deleteBill);
router.get('/search', billController.searchBill);
module.exports = router;
