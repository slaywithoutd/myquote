const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.get('/', topicController.getAll);
router.get('/:id', topicController.getById);
router.post('/', topicController.create);
router.put('/:id', topicController.update);
router.delete('/:id', topicController.deleteTopic);

module.exports = router;
