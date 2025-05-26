const authorModel = require('../models/authorModel');

const getAll = async (req, res) => {
  try {
    const authors = await authorModel.getAll();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const author = await authorModel.getById(req.params.id);
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
    console.log('Received request to create author:', req.body);
    if (!req.body || !req.body.name) {
        return res.status(400).json({ error: 'Dados inválidos' });
    }
    
    try {
        const { name, nationality, bio } = req.body;
        const newAuthor = await authorModel.create({ name, nationality, bio });
        if (!newAuthor) {
        return res.status(400).json({ error: 'Autor já existe ou dados inválidos' });
        }
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ error: error.message });
    }
    }

const update = async (req, res) => {
  try {
    const {name, nationality, bio} = req.body;
    const updatedAuthor = await authorModel.update(req.params.id, {name, nationality, bio});
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
    const deletedAuthor = await authorModel.deleteAuthor(req.params.id);
    if (deletedAuthor) {
      res.status(200).json(deletedAuthor);
    } else {
      res.status(404).json({ error: 'Autor não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteAuthor
};
