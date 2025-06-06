const Topic = require('../models/topicModel');

const getAll = async (req, res) => {
  try {
    const topics = await topicModel.getAll();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const topic = await topicModel.getById(req.params.id);
    if (topic) {
      res.status(200).json(topic);
    } else {
      res.status(404).json({ error: 'Topico não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    
    const existingTopic = await Topic.getById(id);
    if (!existingTopic) {
      return res.status(404).json({ error: 'Tópico não encontrado' });
    }

    const updatedTopic = await Topic.update(id, { name });
    res.status(200).json(updatedTopic);
  } catch (error) {
    console.error('Error updating topic:', error);
    res.status(500).json({ error: 'Erro ao atualizar tópico' });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const deletedTopic = await topicModel.delete(req.params.id);
    if (deletedTopic) {
      res.status(200).json(deletedTopic);
    } else {
      res.status(404).json({ error: 'Topico não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add this new method
const getAllWithQuotes = async () => {
    try {
        const topics = await Topic.getAllWithQuotes();
        return topics;
    } catch (error) {
        throw new Error('Error fetching topics with quotes: ' + error.message);
    }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteTopic,
  getAllWithQuotes
};
