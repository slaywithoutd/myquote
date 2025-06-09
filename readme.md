# MyQuote

MyQuote é uma aplicação web para registro, organização e consulta de frases marcantes, desenvolvida utilizando Node.js com Express.js como framework, EJS para templating e PostgreSQL como banco de dados relacional, seguindo o padrão arquitetural MVC (Model-View-Controller).

## Descrição do Projeto

A aplicação MyQuote funciona como um acervo pessoal de frases, permitindo que os usuários cadastrem citações, atribuam-nas a autores e as classifiquem por temas específicos. O sistema foi projetado para facilitar a curadoria de conteúdo textual, incentivando a organização e o armazenamento de citações que inspiram, motivam ou merecem ser guardadas.

### Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript), EJS-Mate, HTML5, CSS3, JavaScript
- **Banco de Dados**: PostgreSQL
- **Autenticação**: Express-session, bcrypt, JWT
- **Outras dependências**: body-parser, cors, method-override, dotenv

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
PORT=3000

# Configurações de Sessão
SESSION_SECRET=sua_chave_secreta_aqui
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
- **topics**: Temas/categorias das citações
- **quote_topic**: Tabela de associação entre citações e temas
    

Funcionalidades
---------------


* **Cadastro de Frases:** Permite que os usuários registrem frases marcantes, associando-as a autores e temas.
* **Consulta de Frases:** Possibilita a busca e filtragem de frases por autor, tema ou palavras-chave.
* **Organização por Temas:** Classificação das frases em categorias temáticas para facilitar a organização.
* **Edição e Exclusão:** Funcionalidades para editar ou remover frases cadastradas.
* **Autenticação de Usuáros:** Sistema de login para garantir que apenas usuários autenticados possam gerenciar suas frases.
* **Interface Amigável:** Design intuitivo para facilitar a navegação e o uso da aplicação.

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

Estrutura de Diretórios
-----------------------

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.
* **`views/`**: Views da aplicação (se aplicável).


Modelo do Banco de Dados
------------------------

O banco de dados utiliza o PostgreSQL e possui as seguintes entidades principais:

* **Users:** Armazena informações dos usuários, incluindo credenciais de login e dados pessoais.
* **Quotes:** Armazena as frases cadastradas pelos usuários, associando-as a autores e temas.
* **Authors:** Armazena informações sobre os autores das frases.
* **Themes:** Representa os temas ou categorias atribuídos às frases.

Licença
-------

Este projeto está licenciado sob a Licença MIT.

Este README.md fornece uma visão geral clara do boilerplate, incluindo instruções de instalação, configuração do banco de dados, funcionalidades principais, scripts disponíveis, estrutura de diretórios, como contribuir e informações de licença. Certifique-se de personalizar as seções com detalhes específicos do seu projeto conforme necessário.
