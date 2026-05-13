const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController.js');

/**
 * @swagger
 * /appointment:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', appointmentController.getAppointment);

/**
 * @swagger
 * /appointment/add:
 *   post:
 *     summary: Add appointment
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Appointment created
 */
router.post('/add', appointmentController.addAppointment);

/**
 * @swagger
 * /appointment/update/{id}:
 *   put:
 *     summary: Update appointment
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment updated
 */
router.put('/update/:id', appointmentController.updateAppointment);

/**
 * @swagger
 * /appointment/delete/{id}:
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted
 */
router.delete('/delete/:id', appointmentController.deleteAppointment);

/**
 * @swagger
 * /appointment/search:
 *   get:
 *     summary: Search appointment
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Search result
 */
router.get('/search', appointmentController.searchAppointment);

/**
 * @swagger
 * /appointment/welcome:
 *   get:
 *     summary: Welcome endpoint
 *     tags: [Appointment]
 *     responses:
 *       200:
 *         description: Welcome message
 */
router.get('/welcome', appointmentController.searchWelcome);

module.exports = router;
