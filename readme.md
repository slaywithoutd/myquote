# MyQuote

MyQuote é uma aplicação web completa para registro, organização e consulta de frases marcantes, desenvolvida utilizando Node.js com Express.js como framework, EJS para templating e PostgreSQL como banco de dados relacional, seguindo o padrão arquitetural MVC (Model-View-Controller).

## Descrição do Projeto

A aplicação MyQuote funciona como um acervo pessoal de frases, permitindo que os usuários cadastrem, editem, excluam e consultem citações, atribuam-nas a autores e as classifiquem por tópicos específicos. O sistema foi projetado para facilitar a curadoria de conteúdo textual, incentivando a organização e o armazenamento de citações que inspiram, motivam ou merecem ser guardadas.

### Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript), EJS-Mate, HTML5, CSS3, JavaScript
- **Banco de Dados**: PostgreSQL
- **Autenticação**: Express-session, bcrypt
- **Outras dependências**: body-parser, cors, method-override, dotenv, jsonwebtoken
- **Testes**: Jest, Supertest

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 16.x ou superior)
- **npm** (geralmente incluído com Node.js)
- **PostgreSQL** (versão 12.x ou superior)

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/Inteli-College/2025-1A-T17-IN01-G03.git
cd 2025-1A-T17-IN01-G03/myquote
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=myquote_db
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres

# Configurações do Servidor
PORT=5500
```

**Importante**: Substitua os valores pelos dados do seu ambiente PostgreSQL.

## Configuração do Banco de Dados

### 1. Criar o banco de dados

Conecte-se ao PostgreSQL e crie o banco de dados:

```sql
CREATE DATABASE myquote_db;
```

### 2. Executar o script de inicialização

Execute o comando para criar as tabelas e estrutura do banco:

```bash
npm run init-db
```

Este comando criará as seguintes tabelas:
- **users**: Armazena informações dos usuários
- **authors**: Informações sobre autores das citações
- **quotes**: Citações cadastradas pelos usuários
- **topics**: Tópicos/categorias das citações
- **quote_topic**: Tabela de associação entre citações e tópicos

## Executando a Aplicação

### Passo a Passo Completo:

#### 1. Preparar o ambiente
```bash
# Certifique-se de que o PostgreSQL está rodando
# No Windows: Inicie o serviço PostgreSQL
# No Linux/Mac: sudo service postgresql start
```

#### 2. Inicializar o banco de dados
```bash
# Execute o script de inicialização (cria todas as tabelas)
npm run init-db
```

#### 3. Iniciar o servidor
Para desenvolvimento (recomendado - reinicia automaticamente):
```bash
npm run dev
```

Para produção:
```bash
npm start
```

#### 4. Acessar a aplicação
Abra seu navegador e acesse: **http://localhost:3000**

#### 5. Primeiro uso
1. **Registrar:** Clique em "Registrar" e crie sua conta
2. **Login:** Faça login com suas credenciais
3. **Explorar:** Navegue pela interface e comece a adicionar suas frases!

### Funcionalidades Disponíveis:
- **Página Inicial:** Visualize todas as frases cadastradas
- **Nova Frase:** Adicione frases com autor e tópicos
- **Gerenciar Autores:** Cadastre e edite informações de autores
- **Gerenciar Tópicos:** Organize suas frases por categorias
- **Filtros:** Busque frases por autor ou tópico

## Funcionalidades

* **Cadastro de Frases:** Permite que os usuários registrem frases marcantes, associando-as a autores e tópicos.
* **Edição de Frases:** Funcionalidade completa para editar frases existentes, incluindo texto, descrição, autor e tópicos.
* **Exclusão de Frases:** Permite remover frases cadastradas com confirmação de segurança.
* **Gerenciamento de Autores:** Cadastro, edição e exclusão de autores com informações detalhadas (nome, nacionalidade, biografia).
* **Gerenciamento de Tópicos:** Criação, edição e exclusão de tópicos para categorização das frases.
* **Consulta e Filtragem:** Busca e filtragem de frases por autor, tópico ou palavras-chave.
* **Autenticação de Usuários:** Sistema de login seguro para garantir que apenas usuários autenticados possam gerenciar suas frases.
* **Interface Responsiva:** Design intuitivo com tema de biblioteca para facilitar a navegação e o uso da aplicação.

## Scripts Disponíveis

* **`npm start`**: Inicia o servidor Node.js em modo de produção.
* **`npm run dev`**: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código (recomendado para desenvolvimento).
* **`npm run init-db`**: Executa o script de inicialização do banco de dados, criando todas as tabelas necessárias.
* **`npm run test`**: Executa os testes automatizados.
* **`npm run test:coverage`**: Executa os testes e gera um relatório de cobertura de código.

## Estrutura de Diretórios

```
myquote/
├── assets/                 # Recursos estáticos (favicon, etc.)
├── config/                 # Configurações do banco de dados
├── controllers/            # Controladores da aplicação (lógica de negócio)
│   ├── authorController.js
│   ├── quoteController.js
│   ├── topicController.js
│   └── userController.js
├── documentos/             # Documentação do projeto
├── models/                 # Modelos da aplicação (interações com o banco de dados)
│   ├── authorModel.js
│   ├── quoteModel.js
│   ├── topicModel.js
│   └── userModel.js
├── public/                 # Arquivos estáticos (CSS, JavaScript, imagens)
│   ├── css/
│   └── js/
├── routes/                 # Definição das rotas da aplicação
│   ├── authorRoutes.js
│   ├── frontRoutes.js
│   ├── quoteRoutes.js
│   ├── topicRoutes.js
│   └── userRoutes.js
├── scripts/                # Scripts auxiliares
│   ├── init.sql           # Script de inicialização do banco de dados
│   └── runSQLScript.js    # Executor de scripts SQL
├── services/               # Serviços da aplicação
│   └── userService.js
├── tests/                  # Testes automatizados
├── views/                  # Templates EJS
│   ├── components/        # Componentes reutilizáveis
│   ├── layout/           # Layouts principais
│   ├── pages/            # Páginas da aplicação
│   └── partials/         # Partials reutilizáveis
├── jest.config.js         # Configuração do Jest
├── rest.http             # Arquivo para testes de API
└── server.js             # Arquivo principal do servidor
```



## Modelo do Banco de Dados

O banco de dados utiliza o PostgreSQL e possui as seguintes entidades principais:

* **Users:** Armazena informações dos usuários, incluindo credenciais de login (username, email, password).
* **Quotes:** Armazena as frases cadastradas pelos usuários, incluindo texto, descrição, data de criação e associações com autores.
* **Authors:** Armazena informações detalhadas sobre os autores das frases (nome, nacionalidade, biografia).
* **Topics:** Representa os tópicos ou categorias atribuídos às frases para organização.
* **Quote_Topic:** Tabela de associação many-to-many entre frases e tópicos.

### Relacionamentos:
- Um usuário pode ter muitas frases (1:N)
- Uma frase pode ter um autor (N:1)
- Uma frase pode ter muitos tópicos (N:M)
- Um tópico pode estar associado a muitas frases (N:M)

## Testando a Aplicação

### Executar todos os testes:
```bash
npm test
```

### Executar testes com relatório de cobertura:
```bash
npm run test:coverage
```

### Testar APIs manualmente:
Use o arquivo `rest.http` na raiz do projeto para testar as APIs diretamente no VS Code com a extensão REST Client.

## Solução de Problemas

### Erro de conexão com o banco:
1. Verifique se o PostgreSQL está rodando
2. Confirme as credenciais no arquivo `.env`
3. Certifique-se de que o banco `myquote_db` foi criado

### Erro "tabelas não encontradas":
Execute o comando de inicialização do banco:
```bash
npm run init-db
```

### Porta já em uso:
Altere a variável `PORT` no arquivo `.env` para uma porta diferente (ex: 3001).

## Licença

Este projeto está licenciado sob a Licença MIT.


