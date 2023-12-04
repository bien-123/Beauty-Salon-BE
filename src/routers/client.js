const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController.js');

router.post('/add', clientController.addClient);
router.get('/', clientController.getClient);
router.put('/update/:id', clientController.updateClient);
router.delete('/delete/:id', clientController.deleteClient);
router.get('/search', clientController.searchClient);
module.exports = router;
