require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const path = require('path');
const quoteRoutes = require('./routes/quoteRoutes');
const userRoutes = require('./routes/userRoutes');
const topicRoutes = require('./routes/topicRoutes');
const authorRoutes = require('./routes/authorRoutes');
const methodOverride = require('method-override');
const authorModel = require('./models/authorModel');
const topicModel = require('./models/topicModel');
const quoteModel = require('./models/quoteModel');
const quoteController = require('./controllers/quoteController');
const authorController = require('./controllers/authorController');
const ejsMate = require('ejs-mate'); // Importe o ejs-mate

const app = express();
const PORT = process.env.PORT || 3000;

// Configure o EJS-Mate como motor de visualização
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
console.log('Static directory path:', path.join(__dirname, 'public'));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  next();
};

// Add this middleware before your routes
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get('/', async (req, res) => {
  try {
    const quotes = await quoteController.getAll();
    const topics = await topicModel.getAll();
    
    res.render('pages/index', { 
      pageTitle: 'Home', // Adicione esta linha
      quotes: quotes || [], 
      topics: topics || [],
      user: req.session.user || undefined,
      error: null
    });
  } catch (error) {
    console.error('Error loading home page:', error);
    res.render('pages/index', {
      pageTitle: 'Home', // Adicione esta linha
      quotes: [],
      topics: [],
      user: req.session.user || undefined,
      error: 'Erro ao carregar conteúdo'
    });
  }
});

// Usando as rotas definidas
app.use('/api/quotes', quoteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/authors', authorRoutes);
app.get('/authors-topics', async (req, res) => {
    try {
        console.log('Loading authors and topics with quotes...');
        const authors = await authorModel.getAllWithQuotes();
        const topics = await topicModel.getAllWithQuotes();
        console.log(`Loaded ${authors.length} authors and ${topics.length} topics`);

        res.render('pages/authors-topics', {
          pageTitle: 'Autores & Tópicos',
          authors,
          topics,
          user: req.session.user
        });
    } catch (error) {
      console.error('Error loading authors and topics:', error);
        res.status(500).render('pages/error', {
          pageTitle: 'Erro',
          error: 'Erro ao carregar autores e tópicos',
          user: req.session.user
        });
    }
});

// Page routes
app.get('/login', (req, res) => {
  res.render('pages/login', {
    pageTitle: 'Login',
    error: null
  });
});

app.get('/register', (req, res) => {
  res.render('pages/register', {
    pageTitle: 'Registrar',
    error: null
  });
});

app.get('/quotes/new', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  try {
    const authors = await authorModel.getAll();
    const topics = await topicModel.getAll();
    res.render('pages/quote-form', {
      pageTitle: 'Nova Frase',
      quote: null,
      authors: authors,
      topics: topics,
      user: req.session.user
    });
  } catch (error) {
    console.error('Error loading quote form:', error);
    res.status(500).render('pages/error', {
      error: 'Erro ao carregar formulário',
      user: req.session.user
    });
  }
});

// Route for editing quotes
app.get('/quotes/edit/:id', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  try {
    const quote = await quoteModel.getById(req.params.id);
    if (!quote) {
      return res.status(404).render('pages/error', {
        pageTitle: 'Erro',
        error: 'Frase não encontrada',
        user: req.session.user
      });
    }

    const authors = await authorModel.getAll();
    const topics = await topicModel.getAll();

    // Get quote topics
    const quoteTopics = await db.query(`
      SELECT topic_id FROM quote_topic WHERE quote_id = $1
    `, [req.params.id]);

    quote.topics = quoteTopics.rows.map(row => row.topic_id);

    res.render('pages/quote-form', {
      pageTitle: 'Editar Frase',
      quote,
      authors,
      topics,
      user: req.session.user
    });
  } catch (error) {
    console.error('Error loading quote for edit:', error);
    res.status(500).render('pages/error', {
      pageTitle: 'Erro',
      error: 'Erro ao carregar frase para edição',
      user: req.session.user
    });
  }
});

// Add this with other page routes
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).render('pages/error', {
        error: 'Erro ao fazer logout',
        user: null
      });
    }
    res.redirect('/');
  });
});

// Add these routes for filtering quotes
app.get('/quotes/by-author/:id', async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await authorModel.getById(authorId);
    const quotes = await quoteModel.getByAuthor(authorId);
    
    res.render('pages/filtered-quotes', {
      pageTitle: `Frases de ${author.name}`,
      filterType: 'author',
      filterName: author.name,
      quotes: quotes,
      user: req.session.user || undefined,
      error: null
    });
  } catch (error) {
    console.error('Error loading author quotes:', error);
    res.status(500).render('pages/error', {
      error: 'Erro ao carregar frases do autor',
      user: req.session.user || undefined
    });
  }
});

app.get('/quotes/by-topic/:id', async (req, res) => {
  try {
    const topicId = req.params.id;
    const topic = await topicModel.getById(topicId);
    const quotes = await quoteModel.getByTopic(topicId);
    
    res.render('pages/filtered-quotes', {
      pageTitle: `Frases sobre ${topic.name}`,
      filterType: 'topic',
      filterName: topic.name,
      quotes: quotes,
      user: req.session.user || undefined,
      error: null
    });
  } catch (error) {
    console.error('Error loading topic quotes:', error);
    res.status(500).render('pages/error', {
      error: 'Erro ao carregar frases do tópico',
      user: req.session.user || undefined
    });
  }
});

// Add these routes in server.js
app.get('/authors/new', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('pages/author-form', {
    pageTitle: 'Novo Autor',
    author: null,
    user: req.session.user
  });
});

app.get('/topics/new', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('pages/topic-form', {
    pageTitle: 'Novo Tópico',
    topic: null,
    user: req.session.user
  });
});

app.get('/authors/edit/:id', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  try {
    const author = await authorModel.getById(req.params.id);
    res.render('pages/author-form', {
      pageTitle: 'Editar Autor',
      author,
      user: req.session.user
    });
  } catch (error) {
    res.status(500).render('pages/error', {
      error: 'Erro ao carregar autor',
      user: req.session.user
    });
  }
});

app.get('/topics/edit/:id', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  try {
    const topic = await topicModel.getById(req.params.id);
    res.render('pages/topic-form', {
      pageTitle: 'Editar Tópico',
      topic,
      user: req.session.user
    });
  } catch (error) {
    res.status(500).render('pages/error', {
      error: 'Erro ao carregar tópico',
      user: req.session.user
    });
  }
});

// Middleware para lidar com erros de rota não encontrada
app.use((req, res, next) => {
  res.status(404).render('pages/error', { 
    error: 'Página não encontrada',
    user: req.session.user
  });
});

// Middleware para lidar com erros internos do servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', {
    error: 'Erro no servidor',
    user: req.session.user
  });
});

// Conectar ao banco e iniciar o servidor
const startServer = async () => {
  try {
    console.log('Checking database connection...');
    const client = await db.connect();
    await client.query('SELECT 1');
    client.release();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    setTimeout(startServer, 5000);
  }
};

startServer();
