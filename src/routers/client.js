const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController.js');

/**
 * @swagger
 * /client:
 *   get:
 *     summary: Get all clients
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', clientController.getClient);

/**
 * @swagger
 * /client/add:
 *   post:
 *     summary: Add new client
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: Client created
 */
router.post('/add', clientController.addClient);

/**
 * @swagger
 * /client/update/{id}:
 *   put:
 *     summary: Update client
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/update/:id', clientController.updateClient);

/**
 * @swagger
 * /client/delete/{id}:
 *   delete:
 *     summary: Delete client
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/delete/:id', clientController.deleteClient);

/**
 * @swagger
 * /client/search:
 *   get:
 *     summary: Search client
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: Search result
 */
router.get('/search', clientController.searchClient);
module.exports = router;
