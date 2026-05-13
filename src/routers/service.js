const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/serviceController.js');

/**
 * @swagger
 * /service:
 *   get:
 *     summary: Get all services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', serviceController.getService);

/**
 * @swagger
 * /service/add:
 *   post:
 *     summary: Add service
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Service created
 */
router.post('/add', serviceController.addService);

/**
 * @swagger
 * /service/update/{id}:
 *   put:
 *     summary: Update service
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service updated
 */
router.put('/update/:id', serviceController.updateService);

/**
 * @swagger
 * /service/delete/{id}:
 *   delete:
 *     summary: Delete service
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted
 */
router.delete('/delete/:id', serviceController.deleteService);

/**
 * @swagger
 * /service/search:
 *   get:
 *     summary: Search service
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Search result
 */
router.get('/search', serviceController.searchService);

/**
 * @swagger
 * /service/searchp:
 *   get:
 *     summary: Search service with pagination
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Pagination result
 */
router.get('/searchp', serviceController.searchPaginationService);

/**
 * @swagger
 * /service/searchbill:
 *   get:
 *     summary: Get service bill data
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Service bill data
 */
router.get('/searchbill', serviceController.getServiceBill);

module.exports = router;
