require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const path = require('path');
const quoteRoutes = require('./routes/quoteRoutes');
const userRoutes = require('./routes/userRoutes');
const topicRoutes = require('./routes/topicRoutes');
const authorRoutes = require('./routes/authorRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Usando as rotas definidas
app.use('/api/quotes', quoteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/authors', authorRoutes);

// Middleware para lidar com erros de rota não encontrada
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada');
});

// Middleware para lidar com erros internos do servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro no servidor');
});

// Conectar ao banco e iniciar o servidor
db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
