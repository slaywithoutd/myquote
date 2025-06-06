const Author = require('../models/authorModel');

const getAll = async (req, res) => {
  try {
    const authors = await Author.getAll();
    res.status(200).json(authors);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const author = await Author.getById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ error: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const {name, nationality, bio} = req.body;
    const updatedAuthor = await Author.update(req.params.id, {name, nationality, bio});
    if (updatedAuthor) {
      res.status(200).json(updatedAuthor);
    } else {
      res.status(404).json({ error: 'Autor não encontrado' });
    }
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.delete(req.params.id);
    if (deletedAuthor) {
      res.status(200).json(deletedAuthor);
    } else {
      res.status(404).json({ error: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add this new method
const getAllWithQuotes = async (req, res) => {
  try {
    console.log('Getting authors with quotes from model...');
    const authors = await Author.getAllWithQuotes();
    console.log('Authors retrieved:', authors);
    res.status(200).json(authors);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteAuthor,
  getAllWithQuotes
};
