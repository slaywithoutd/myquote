const quoteModel = require('../models/quoteModel');

const getAll = async () => {
  try {
    const quotes = await quoteModel.getAll();
    return quotes;
  } catch (error) {
    throw new Error('Error fetching quotes: ' + error.message);
  }
};

const getById = async (req, res) => {
  try {
    const quote = await quoteModel.getById(req.params.id);
    if (quote) {
      res.status(200).json(quote);
    } else {
      res.status(404).json({ error: 'Frase não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  console.log('Received request to create quote:', req.body);
  if (!req.body || !req.body.text || !req.body.username) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const { text, description, username, author_name, topics } = req.body;
    const newQuote = await quoteModel.create({ text, description, username, author_name, topics });
    if (!newQuote) {
      return res.status(400).json({ error: 'Frase já existe ou dados inválidos' });
    }
    res.status(201).json(newQuote);
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ error: error.message });
  }
}

const update = async (req, res) => {
  try {
    const { text, description, author_id, topics } = req.body;

    // Update quote basic info
    const updatedQuote = await quoteModel.update(req.params.id, {
      text,
      description,
      author_id
    });

    if (!updatedQuote) {
      return res.status(404).json({ error: 'Frase não encontrada' });
    }

    // Update topics if provided
    if (topics && Array.isArray(topics)) {
      await quoteModel.updateTopics(req.params.id, topics);
    }

    res.status(200).json({
      success: true,
      message: 'Frase atualizada com sucesso',
      quote: updatedQuote
    });
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({ error: error.message });
  }
}

const deleteQuote = async (req, res) => {
  try {
    const deletedQuote = await quoteModel.delete(req.params.id);
    if (deletedQuote) {
      res.status(200).json({
        success: true,
        message: 'Frase deletada com sucesso',
        quote: deletedQuote
      });
    } else {
      res.status(404).json({ error: 'Frase não encontrada' });
    }
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteQuote
};
