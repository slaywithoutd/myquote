// routes/index.js
const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const authorModel = require('../models/authorModel');
const topicModel = require('../models/topicModel');

// Other quote routes
router.post('/', quoteController.create);
router.put('/:id', quoteController.update);
router.delete('/:id', quoteController.deleteQuote);

module.exports = router;