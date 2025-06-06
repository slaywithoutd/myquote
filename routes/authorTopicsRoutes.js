const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const topicController = require('../controllers/topicController');

// Combined route for authors and topics page with quotes
router.get('/', async (req, res) => {
  try {
    console.log('Fetching authors and topics...');
    const authors = await authorController.getAllWithQuotes();
    const topics = await topicController.getAllWithQuotes(); 
    
    // Debug log to check the data
    console.log('Authors:', JSON.stringify(authors, null, 2));
    console.log('Topics:', JSON.stringify(topics, null, 2));
    
    res.render('pages/authors-topics', {
      authors,
      topics,
      user: req.session.user,
      error: null
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('pages/error', {
      error: 'Erro ao carregar autores e tópicos',
      user: req.session.user
    });
  }
});

module.exports = router;