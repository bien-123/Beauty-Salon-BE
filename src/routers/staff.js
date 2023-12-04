const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staffController.js');

router.post('/add', staffController.addStaff);
router.get('/', staffController.getStaff);
router.put('/updatePassword/:maNV', staffController.updatePassword);
router.put('/update/:id', staffController.updateStaff);
router.delete('/delete/:id', staffController.deleteStaff);

router.post('/login', staffController.loginStaff);
router.get('/search', staffController.searchStaff);
router.get('/searchAccount', staffController.searchAccount);
router.get('/:maNV', staffController.getAStaff);
module.exports = router;
