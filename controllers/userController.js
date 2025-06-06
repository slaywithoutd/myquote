const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const getAll = async (req, res) => {
  try {
    const users = await userModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const user = await userModel.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Frase não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const { username, email, password } = req.body;
    const newUser = await userModel.create({username, email, password});
    if (!newUser) {
      return res.status(400).json({ error: 'Usuário já existe ou dados inválidos' });
    }
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const update = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await userModel.update(req.params.id, {username, email});
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
      console.log('Usuário deletado com sucesso');
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Add this new login method
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await userModel.getByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Store user info in session
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    
    res.status(200).json({ 
      id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteUser,
  login
};
