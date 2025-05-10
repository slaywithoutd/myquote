# MyQuote

Este projeto é uma aplicação web para registro, organização e consulta de frases marcantes, desenvolvido utilizando Node.js com Express.js como framework e PostgreSQL como banco de dados relacional, seguindo o padrão MVC (Model-View-Controller).


### Descrição do Projeto  
A aplicação MyQuote é uma plataforma que funciona como um acervo pessoal de frases, permitindo que os usuários cadastrem pensamentos, atribuam-nos a autores e os classifiquem por temas específicos. O sistema foi projetado para facilitar a curadoria de conteúdo textual, incentivando a organização e o armazenamento de citações que inspiram, motivam ou merecem ser guardadas.


## Requisitos
Node.js (versão 14.x ou superior)
PostgreSQL (versão 12.x ou superior)

## Instalação

1. **Clonar o repositório:**

```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto
```

2. **Instalar as dependências:**
    
```bash
npm install
```
    
3. **Configurar o arquivo `.env`:**
    
Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como as configurações do banco de dados PostgreSQL.
    

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
    Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run init-db
```
    
Isso criará a tabela `users` no seu banco de dados PostgreSQL com UUID como chave primária e inserirá alguns registros de exemplo.
    

Funcionalidades
---------------

Funcionalidades
---------------

* **Cadastro de Frases:** Permite que os usuários registrem frases marcantes, associando-as a autores e temas.
* **Consulta de Frases:** Possibilita a busca e filtragem de frases por autor, tema ou palavras-chave.
* **Organização por Temas:** Classificação das frases em categorias temáticas para facilitar a organização.
* **Edição e Exclusão:** Funcionalidades para editar ou remover frases cadastradas.
* **Autenticação de Usuários:** Sistema de login para garantir que apenas usuários autenticados possam gerenciar suas frases.
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