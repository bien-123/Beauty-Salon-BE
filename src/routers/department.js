const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/departmentController.js');

/**
 * @swagger
 * /department:
 *   get:
 *     summary: Get all department
 *     tags: [Department]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', departmentController.getDepartments);

/**
 * @swagger
 * /department/add:
 *   post:
 *     summary: Add new department
 *     tags: [Department]
 *     responses:
 *       200:
 *         description: Department created
 */
router.post('/add', departmentController.createDepartment);

/**
 * @swagger
 * /department/update/{id}:
 *   put:
 *     summary: Update department
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department updated
 */
router.put('/update/:id', departmentController.updateDepartment);

/**
 * @swagger
 * /department/delete/{id}:
 *   delete:
 *     summary: Delete department
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department deleted
 */
router.delete('/delete/:id', departmentController.deleteDepartment);
module.exports = router;
