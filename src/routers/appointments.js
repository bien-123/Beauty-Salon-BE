const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController.js');

router.post('/add', appointmentController.addAppointment);
router.get('/', appointmentController.getAppointment);
router.put('/update/:id', appointmentController.updateAppointment);
router.delete('/delete/:id', appointmentController.deleteAppointment);
router.get('/search', appointmentController.searchAppointment);
router.get('/welcome', appointmentController.searchWelcome);
module.exports = router;
