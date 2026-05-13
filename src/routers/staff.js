const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staffController.js');

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Get all staff
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', staffController.getStaff);

/**
 * @swagger
 * /staff/add:
 *   post:
 *     summary: Add staff
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Staff created
 */
router.post('/add', staffController.addStaff);

/**
 * @swagger
 * /staff/updatePassword/{maNV}:
 *   put:
 *     summary: Update staff password
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: maNV
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
router.put('/updatePassword/:maNV', staffController.updatePassword);

/**
 * @swagger
 * /staff/update/{id}:
 *   put:
 *     summary: Update staff info
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff updated
 */
router.put('/update/:id', staffController.updateStaff);

/**
 * @swagger
 * /staff/delete/{id}:
 *   delete:
 *     summary: Delete staff
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff deleted
 */
router.delete('/delete/:id', staffController.deleteStaff);

/**
 * @swagger
 * /staff/login:
 *   post:
 *     summary: Staff login
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Login success
 */
router.post('/login', staffController.loginStaff);

/**
 * @swagger
 * /staff/search:
 *   get:
 *     summary: Search staff
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Search result
 */
router.get('/search', staffController.searchStaff);

/**
 * @swagger
 * /staff/searchAccount:
 *   get:
 *     summary: Search staff account
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Account search result
 */
router.get('/searchAccount', staffController.searchAccount);

/**
 * @swagger
 * /staff/{maNV}:
 *   get:
 *     summary: Get staff by maNV
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: maNV
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff detail
 */
router.get('/:maNV', staffController.getAStaff);

module.exports = router;
