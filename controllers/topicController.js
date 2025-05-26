const topicModel = require('../models/topicModel');

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
    console.log('Received request to create topic:', req.body);
    if (!req.body || !req.body.name) {
        return res.status(400).json({ error: 'Dados inválidos' });
    }
    
    try {
        const { name, description } = req.body;
        const newTopic = await topicModel.create({ name, description });
        if (!newTopic) {
        return res.status(400).json({ error: 'Tópico já existe ou dados inválidos' });
        }
        res.status(201).json(newTopic);
    } catch (error) {
        console.error('Error creating topic:', error);
        res.status(500).json({ error: error.message });
    }
    }

const update = async (req, res) => {
  try {
    const {name} = req.body;
    const updatedTopic = await topicModel.update(req.params.id, name);
    if (updatedTopic) {
      res.status(200).json(updatedTopic);
    } else {
      res.status(404).json({ error: 'Tópico não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const deletedTopic = await topicModel.deleteTopic(req.params.id);
    if (deletedTopic) {
      res.status(200).json(deletedTopic);
    } else {
      res.status(404).json({ error: 'Topico não encontrado' });
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
  deleteTopic
};
