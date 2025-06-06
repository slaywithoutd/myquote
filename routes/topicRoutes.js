const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.get('/', topicController.getAll);
router.get('/:id', topicController.getById);
router.post('/', topicController.create);
router.put('/:id', topicController.update);
router.delete('/:id', topicController.deleteTopic);


// In topicRoutes.js
router.get('/:id/quotes', async (req, res) => {
    try {
        const quotes = await quoteModel.getByTopic(req.params.id);
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
