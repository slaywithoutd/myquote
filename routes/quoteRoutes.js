// routes/index.js
const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// Rotas para o CRUD de quotes
router.post('/', quoteController.create);
router.get('/', quoteController.getAll);
router.put('/:id', quoteController.update);
router.delete('/:id', quoteController.deleteQuote);

module.exports = router;