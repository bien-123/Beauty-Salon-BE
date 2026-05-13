const express = require('express');
const router = express.Router();

const billController = require('../controllers/billController.js');

/**
 * @swagger
 * /bill:
 *   get:
 *     summary: Get all bills
 *     tags: [Bill]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', billController.getBill);

/**
 * @swagger
 * /bill/add:
 *   post:
 *     summary: Add new bill
 *     tags: [Bill]
 *     responses:
 *       200:
 *         description: Bill created
 */
router.post('/add', billController.addBill);

/**
 * @swagger
 * /bill/update/{id}:
 *   put:
 *     summary: Update bill
 *     tags: [Bill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bill updated
 */
router.put('/update/:id', billController.updateBill);

/**
 * @swagger
 * /bill/delete/{id}:
 *   delete:
 *     summary: Delete bill
 *     tags: [Bill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bill deleted
 */
router.delete('/delete/:id', billController.deleteBill);

/**
 * @swagger
 * /bill/search:
 *   get:
 *     summary: Search bill
 *     tags: [Bill]
 *     responses:
 *       200:
 *         description: Search result
 */
router.get('/search', billController.searchBill);

module.exports = router;
