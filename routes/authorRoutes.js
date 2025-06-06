const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const quoteModel = require('../models/quoteModel');

router.get('/', authorController.getAll);
router.get('/:id', authorController.getById);
router.post('/', authorController.create);
router.put('/:id', authorController.update);
router.delete('/:id', authorController.deleteAuthor);
router.get('/:id/quotes', async (req, res) => {
    try {
        const quotes = await quoteModel.getByAuthor(req.params.id);
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// In authorRoutes.js
router.get('/:id/quotes', async (req, res) => {
    try {
        const quotes = await quoteModel.getByAuthor(req.params.id);
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
