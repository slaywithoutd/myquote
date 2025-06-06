const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteUser);
// Add login route
router.post('/login', userController.login);
// Update logout route to handle errors properly
router.get('/logout', (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Erro ao fazer logout' });
      }
      // Redirect to home page after successful logout
      res.redirect('/');
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
});

module.exports = router;
