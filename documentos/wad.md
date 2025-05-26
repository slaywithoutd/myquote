# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## Nome do Projeto

#### Autor do projeto

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução 

O sistema a ser desenvolvido é uma aplicação web voltada para o registro, organização e consulta de frases marcantes, chamado MyQuote. A proposta surgiu da motivação pessoal de coletar citações que despertam reflexões, inspiram ações ou simplesmente merecem ser guardadas. O sistema funciona como um acervo pessoal de frases, em que cada usuário pode cadastrar pensamentos, atribuí-los a autores e classificá-los por temas específicos.

A aplicação será desenvolvida com Node.js e Express.js, utilizando a arquitetura MVC. A visualização será renderizada com EJS, e o banco de dados relacional será estruturado em PostgreSQL, com entidades como usuários, frases, autores e tópicos.

O objetivo é criar uma plataforma funcional para armazenar e organizar frases, incentivando a curadoria de conteúdo textual. O projeto também consolida os conhecimentos adquiridos em desenvolvimento web, como modularização, rotas e interação com banco de dados.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web
A arquitetura do sistema MyQuote (nome fictício, que lembra vagamente "MySQL") segue o padrão MVC (Model-View-Controller), permitindo uma separação clara de responsabilidades e facilitando a manutenção e escalabilidade da aplicação.

### 3.1. Modelagem do banco de dados 

A modelagem do banco de dados consiste em criar uma estrutura organizada para armazenar as informações essenciais do sistema MyQuote. Esse processo envolve identificar as principais entidades, como usuários, frases, autores e tópicos, além de definir seus atributos e os relacionamentos entre elas. O resultado é um esquema relacional que orienta a implementação do banco de dados, garantindo integridade, consistência e suporte às funcionalidades planejadas para a aplicação.

O modelo relacional do banco de dados da aplicação MyQuote foi desenvolvido para possibilitar que os usuários registrem, organizem e associem frases a autores e temas específicos. A estrutura do banco de dados, implementada em PostgreSQL, foi projetada com base nos princípios de normalização, garantindo a eliminação de redundâncias e a manutenção da integridade dos dados.

O diagrama abaixo apresenta a estrutura completa do banco de dados com todas as tabelas e seus relacionamentos:

Diagrama do banco no dbdiagram.io:
<div align="center"> <sup>Figura 1 - Diagrama do Banco de Dados no dbdiagram.io</sup> <img src="/documentos/assets/myQuote.png"/> <sup>Fonte: Autoria própria, 2025</sup> </div>

Diagrama do banco no Supabase:

<div align="center"> <sup>Figura 2 - Diagrama do Banco de Dados no Supabase</sup> <img src="/documentos/assets/supabaseDiagram.png"/> <sup>Fonte: Autoria própria, 2025</sup> </div>
O modelo do banco de dados também está disponível no formato DBML no arquivo database-structure.dbml

##### Resumo da Tabelas:
- Users: Armazena as credenciais dos usuários da plataforma (nome de usuário, email e senha);
- Authors: Contém informações sobre os autores das frases (nome, nacionalidade, biografia);
- Quotes: Registra as frases adicionadas pelos usuários, associando cada uma a um autor e ao usuário que a cadastrou;
- Topics: Representa os temas que podem ser atribuídos às frases (ex: “engraçado”, “filosofia”, “educacional”);
- Quote_Topic: Tabela intermediária que representa a relação N:N entre frases e tópicos.

##### Relações:
- Um usuário pode adicionar várias frases;
- Cada frase pertence a um autor;
- Cada frase pode estar associada a vários tópicos;
- Cada tópico pode estar relacionado a várias frases;
- A associação entre frases e tópicos é feita pela tabela intermediária quote_topic.



### 3.1.1 BD e Models 
A camada de Models em uma aplicação MVC (Model-View-Controller) é responsável por representar e gerenciar os dados essenciais do sistema, bem como implementar as regras de negócio relacionadas a esses dados. No projeto MyQuote, os Models desempenham um papel central ao definir a estrutura das entidades principais — como usuários, autores, frases e tópicos — e ao fornecer métodos para criar, consultar, atualizar e remover registros no banco de dados PostgreSQL.

Cada Model no MyQuote corresponde a uma tabela do banco de dados e encapsula toda a lógica de acesso e manipulação dos dados dessa entidade. Por exemplo, o model `User` gerencia as informações dos usuários, enquanto o model `Quote` lida com as frases cadastradas, suas associações com autores e tópicos, e assim por diante. Essa abordagem garante que toda a interação com o banco de dados seja feita de maneira organizada, segura e reutilizável.

Além disso, os Models do MyQuote são responsáveis por validar dados, aplicar regras de integridade e facilitar a manutenção do sistema. Caso haja mudanças na estrutura do banco de dados, as alterações podem ser concentradas nos Models, reduzindo o impacto no restante da aplicação. Dessa forma, os Models promovem o encapsulamento, a clareza e a escalabilidade do código, tornando o desenvolvimento e a evolução do sistema mais eficientes.



##### Models Implementados:
`models/User.js`: Define o modelo User, correspondente à tabela users. Permite criar, consultar, atualizar e remover usuários, além de autenticar credenciais.

`models/Author.js`: Define o modelo Author, correspondente à tabela authors. Permite cadastrar, consultar, atualizar e excluir autores, bem como buscar autores por nome ou nacionalidade.

`models/Quote.js`: Define o modelo Quote, correspondente à tabela quotes. Permite criar, listar, editar e remover frases, além de associá-las a autores, usuários e tópicos.

`models/Topic.js`: Define o modelo Topic, correspondente à tabela topics. Permite criar, consultar, atualizar e excluir tópicos, além de listar frases relacionadas a cada tema.

`models/QuoteTopic.js`: Define o modelo QuoteTopic, correspondente à tabela quote_topic, que representa a relação N:N entre quotes e topics. Permite associar e desassociar frases e tópicos.

Os Models são importados e utilizados pelos controllers em `controllers/`, implementando toda a lógica CRUD (Create, Read, Update, Delete) para cada entidade do sistema. Seguindo boas práticas como separação de responsabilidades e uso de consultas SQL parametrizadas, os models encapsulam a lógica de negócios e o acesso ao banco de dados, facilitando a manutenção, testes e expansões futuras do sistema.
### 3.2. Arquitetura 

A arquitetura do sistema MyQuote segue o padrão MVC (Model-View-Controller), que promove a separação de responsabilidades em camadas distintas, tornando o código mais organizado, reutilizável e manutenível. Abaixo está o diagrama da arquitetura implementada, ilustrando como as diferentes partes do sistema interagem entre si e como os dados fluem através da aplicação de gerenciamento de citações.

<div align="center">
<sup>Figura 3 - Diagrama de Arquitetura MVC do MyQuote</sup>
<img src="/documentos/assets/MVCdiagram.png"/>
<sup>Fonte: Autoria própria, 2025</sup>
</div>

#### Detalhamento da Arquitetura MVC

##### Models (Modelos)
As principais entidades do sistema são:
- Users (id, username, email, password)
- Authors (id, name, nationality, biography)
- Quotes (id, text, user_id, author_id)
- Topics (id, name, description) 
- QuoteTopic (quote_id, topic_id)

As relações entre entidades seguem o diagrama apresentado anteriormente, com users tendo várias quotes, quotes pertencendo a authors, e quotes tendo múltiplos topics através da tabela intermediária.

##### Controllers (Controladores)
Os principais controllers são:

- UserController: Gerencia registro, login e perfil de usuários
    - register(req, res): Cria novo usuário
    - login(req, res): Autentica usuário
    - profile(req, res): Exibe/atualiza perfil

- QuoteController: Gerencia operações com citações
    - create(req, res): Adiciona nova citação
    - list(req, res): Lista citações
    - update(req, res): Atualiza citação
    - delete(req, res): Remove citação

- AuthorController e TopicController seguem padrão similar para suas entidades

Os controllers interagem com os models para operações no banco e com as views para renderização.


##### Views (Visualizações)
As views do MyQuote são implementadas usando EJS (Embedded JavaScript) e fornecem a interface do usuário.

##### Infraestrutura
- Node.js/Express fornecem o servidor web
- PostgreSQL via Supabase para persistência
- EJS para templates dinâmicos
- Middlewares para autenticação e validação

A integração acontece através dos models que abstraem o acesso ao banco, controllers que coordenam o fluxo, e views que apresentam os dados.

##### Implicações
- Escalabilidade: Separação clara permite escalar componentes independentemente
- Manutenção: Mudanças localizadas em módulos específicos
- Testabilidade: Camadas isoladas facilitam testes unitários
- Desenvolvimento: Equipes podem trabalhar em paralelo em diferentes camadas


### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints 

A API do MyQuote expõe os seguintes endpoints para gerenciamento de usuários, citações, autores e tópicos:

##### Usuários
- `POST /api/users/register` - Registra novo usuário
    - 201: Usuário criado com sucesso
    - 400: Dados inválidos
    - 409: Email já cadastrado
- `POST /api/users/login` - Autentica usuário
    - 200: Login bem sucedido
    - 401: Credenciais inválidas
- `GET /api/users/profile` - Obtém perfil do usuário
    - 200: Perfil retornado
    - 401: Não autorizado
- `PUT /api/users/profile` - Atualiza perfil do usuário
    - 200: Perfil atualizado
    - 400: Dados inválidos
    - 401: Não autorizado

##### Citações
- `POST /api/quotes` - Cria nova citação
    - 201: Citação criada
    - 400: Dados inválidos
    - 401: Não autorizado
- `GET /api/quotes` - Lista todas as citações
    - 200: Lista retornada
- `GET /api/quotes/:id` - Obtém citação específica
    - 200: Citação encontrada
    - 404: Citação não encontrada
- `PUT /api/quotes/:id` - Atualiza citação
    - 200: Citação atualizada
    - 400: Dados inválidos
    - 404: Citação não encontrada
- `DELETE /api/quotes/:id` - Remove citação
    - 204: Citação removida
    - 404: Citação não encontrada

##### Autores
- `POST /api/authors` - Adiciona novo autor
    - 201: Autor criado
    - 400: Dados inválidos
- `GET /api/authors` - Lista todos os autores
    - 200: Lista retornada
- `GET /api/authors/:id` - Obtém autor específico
    - 200: Autor encontrado
    - 404: Autor não encontrado
- `PUT /api/authors/:id` - Atualiza autor
    - 200: Autor atualizado
    - 400: Dados inválidos
    - 404: Autor não encontrado
- `DELETE /api/authors/:id` - Remove autor
    - 204: Autor removido
    - 404: Autor não encontrado

##### Tópicos
- `POST /api/topics` - Cria novo tópico
    - 201: Tópico criado
    - 400: Dados inválidos
- `GET /api/topics` - Lista todos os tópicos
    - 200: Lista retornada
- `GET /api/topics/:id` - Obtém tópico específico
    - 200: Tópico encontrado
    - 404: Tópico não encontrado
- `PUT /api/topics/:id` - Atualiza tópico
    - 200: Tópico atualizado
    - 400: Dados inválidos
    - 404: Tópico não encontrado
- `DELETE /api/topics/:id` - Remove tópico
    - 204: Tópico removido
    - 404: Tópico não encontrado

##### Associações
- `POST /api/quotes/:id/topics` - Associa tópicos à citação
    - 201: Associação criada
    - 400: Dados inválidos
    - 404: Citação ou tópico não encontrado
- `DELETE /api/quotes/:id/topics/:topicId` - Remove tópico da citação
    - 204: Associação removida
    - 404: Associação não encontrada


### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---
