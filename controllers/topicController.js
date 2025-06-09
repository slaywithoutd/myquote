const Topic = require('../models/topicModel');

const getAll = async (req, res) => {
  try {
    const topics = await Topic.getAll();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const topic = await Topic.getById(req.params.id);
    if (topic) {
      res.status(200).json(topic);
    } else {
      res.status(404).json({ error: 'Tópico não encontrado' });
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
    const deletedTopic = await Topic.delete(req.params.id);
    if (deletedTopic) {
      res.status(200).json({
        success: true,
        message: 'Tópico excluído com sucesso',
        topic: deletedTopic
      });
    } else {
      res.status(404).json({ error: 'Tópico não encontrado' });
    }
  } catch (error) {
    console.error('Error deleting topic:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteTopic,
};
