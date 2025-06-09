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

#### Persona 1: Maria Eduarda - A Estudante Universitária

**Dados Demográficos:**
- **Idade**: 22 anos
- **Profissão**: Estudante de Literatura na USP
- **Localização**: São Paulo, SP
- **Escolaridade**: Ensino Superior em andamento

**Perfil Comportamental:**
- Apaixonada por literatura clássica e contemporânea
- Ativa em redes sociais, especialmente Instagram e Pinterest
- Gosta de compartilhar citações inspiradoras em suas redes
- Utiliza smartphone como principal dispositivo de acesso à internet
- Valoriza design estético e experiência visual agradável

**Objetivos e Necessidades:**
- Coletar e organizar citações de livros que está lendo
- Encontrar citações por autor ou tema específico
- Compartilhar descobertas literárias com amigos
- Ter acesso rápido às suas citações favoritas
- Descobrir novos autores através de citações interessantes

**Frustrações:**
- Dificuldade em encontrar citações organizadas por tema
- Perda de citações anotadas em cadernos físicos
- Falta de contexto sobre a origem das citações
- Interfaces complexas que não funcionam bem no mobile

**Cenário de Uso:**
Maria está preparando um trabalho sobre "Amor na Literatura Brasileira" e precisa encontrar citações relevantes de autores como Machado de Assis e Clarice Lispector. Ela acessa o MyQuote pelo smartphone entre as aulas, filtra por tópico "Amor" e autor "Machado de Assis", encontra várias citações com contexto e descrição, e salva as mais relevantes para usar em seu trabalho.

#### Persona 2: Professor Carlos - O Educador Inspirador

**Dados Demográficos:**
- **Idade**: 45 anos
- **Profissão**: Professor de Filosofia no Ensino Médio
- **Localização**: Belo Horizonte, MG
- **Escolaridade**: Mestrado em Filosofia

**Perfil Comportamental:**
- Utiliza citações para iniciar discussões em sala de aula
- Prefere desktop para trabalhos mais elaborados
- Valoriza precisão e contexto histórico das citações
- Gosta de descobrir conexões entre diferentes pensadores
- Compartilha conhecimento de forma didática

**Objetivos e Necessidades:**
- Encontrar citações adequadas para diferentes temas de aula
- Verificar a autenticidade e contexto das citações
- Organizar material didático por tópicos filosóficos
- Descobrir citações de filósofos menos conhecidos
- Preparar aulas com conteúdo inspirador e reflexivo

**Frustrações:**
- Citações sem fonte ou contexto adequado
- Dificuldade em encontrar citações por tema específico
- Falta de informações sobre os autores
- Sistemas que não permitem organização personalizada

**Cenário de Uso:**
Carlos está preparando uma aula sobre "Ética e Moral" e precisa de citações que provoquem reflexão nos alunos. Ele acessa o MyQuote, filtra por tópico "Ética", encontra citações de Aristóteles, Kant e outros filósofos, lê as descrições contextuais para entender melhor cada citação, e seleciona as mais adequadas para estimular o debate em sala de aula.

#### Persona 3: Ana Beatriz - A Profissional Criativa

**Dados Demográficos:**
- **Idade**: 32 anos
- **Profissão**: Designer Gráfica e Social Media Manager
- **Localização**: Rio de Janeiro, RJ
- **Escolaridade**: Superior Completo em Design

**Perfil Comportamental:**
- Utiliza citações para criar conteúdo visual para clientes
- Trabalha principalmente no desktop, mas usa mobile para inspiração
- Valoriza design limpo e funcionalidade intuitiva
- Busca citações que se alinhem com diferentes marcas e públicos
- Aprecia organização visual e facilidade de navegação

**Objetivos e Necessidades:**
- Encontrar citações adequadas para diferentes campanhas publicitárias
- Buscar inspiração para conteúdo de redes sociais
- Organizar citações por tema e tom (motivacional, reflexivo, etc.)
- Acessar rapidamente citações durante o processo criativo
- Descobrir autores que se alinhem com valores de marca

**Frustrações:**
- Citações clichês ou muito utilizadas
- Falta de variedade de autores e perspectivas
- Interfaces que não facilitam a busca rápida
- Ausência de informações sobre o contexto cultural dos autores

**Cenário de Uso:**
Ana está criando uma campanha para uma marca de lifestyle focada em empoderamento feminino. Ela acessa o MyQuote, busca por tópicos como "Empoderamento" e "Força", filtra por autoras mulheres, encontra citações de Maya Angelou, Simone de Beauvoir e outras pensadoras, e seleciona aquelas que melhor representam os valores da marca para usar em posts e materiais visuais.

INSERT IMAGE: [Infográfico visual das três personas mostrando fotos representativas, dados demográficos principais e objetivos de cada uma]

### 2.2. User Stories (Semana 01 - opcional)

#### User Stories Implementadas

**US01 - Cadastro de Usuário**
- **Como** uma pessoa interessada em citações
- **Eu quero** criar uma conta no sistema
- **Para que** eu possa gerenciar minhas citações pessoais
- **Critérios de Aceitação:**
  - O sistema deve validar email único
  - A senha deve ser criptografada
  - Deve haver confirmação visual de cadastro bem-sucedido
- **Status**: ✅ Implementada

**US02 - Login de Usuário**
- **Como** um usuário cadastrado
- **Eu quero** fazer login no sistema
- **Para que** eu possa acessar minhas funcionalidades personalizadas
- **Critérios de Aceitação:**
  - Autenticação por email e senha
  - Sessão persistente durante navegação
  - Redirecionamento após login bem-sucedido
- **Status**: ✅ Implementada

**US03 - Visualizar Citações**
- **Como** um visitante do site
- **Eu quero** ver citações disponíveis
- **Para que** eu possa me inspirar e descobrir novos autores
- **Critérios de Aceitação:**
  - Listagem de citações na página inicial
  - Informações do autor e tópicos visíveis
  - Interface responsiva para diferentes dispositivos
- **Status**: ✅ Implementada

**US04 - Criar Nova Citação**
- **Como** um usuário logado
- **Eu quero** adicionar uma nova citação
- **Para que** eu possa compartilhar descobertas literárias
- **Critérios de Aceitação:**
  - Formulário com campos obrigatórios (texto, autor)
  - Seleção de autor existente ou criação de novo
  - Associação com múltiplos tópicos
  - Campo opcional para descrição/contexto
- **Status**: ✅ Implementada

**US05 - Filtrar por Autor**
- **Como** um usuário interessado em um autor específico
- **Eu quero** ver todas as citações de um autor
- **Para que** eu possa estudar seu pensamento de forma organizada
- **Critérios de Aceitação:**
  - Lista de autores disponíveis
  - Filtro funcional por autor selecionado
  - Informações biográficas do autor
- **Status**: ✅ Implementada

**US06 - Filtrar por Tópico**
- **Como** um usuário buscando inspiração sobre um tema
- **Eu quero** filtrar citações por tópico
- **Para que** eu possa encontrar conteúdo relevante rapidamente
- **Critérios de Aceitação:**
  - Lista de tópicos disponíveis
  - Filtro funcional por tópico selecionado
  - Indicadores visuais de tópicos nas citações
- **Status**: ✅ Implementada

**US07 - Gerenciar Autores**
- **Como** um usuário contribuidor
- **Eu quero** cadastrar novos autores
- **Para que** eu possa expandir a base de conhecimento
- **Critérios de Aceitação:**
  - Formulário com nome, nacionalidade e biografia
  - Validação de dados obrigatórios
  - Prevenção de duplicatas
- **Status**: ✅ Implementada

**US08 - Gerenciar Tópicos**
- **Como** um usuário organizador
- **Eu quero** criar e gerenciar tópicos
- **Para que** eu possa categorizar citações eficientemente
- **Critérios de Aceitação:**
  - Criação de novos tópicos
  - Associação flexível com citações
  - Representação visual diferenciada
- **Status**: ✅ Implementada

#### User Stories Futuras (Não Implementadas)

**US09 - Favoritar Citações**
- **Como** um usuário frequente
- **Eu quero** marcar citações como favoritas
- **Para que** eu possa acessá-las rapidamente depois
- **Status**: 📋 Planejada

**US10 - Busca Textual**
- **Como** um usuário procurando conteúdo específico
- **Eu quero** buscar citações por palavras-chave
- **Para que** eu possa encontrar citações que contenham termos específicos
- **Status**: 📋 Planejada

**US11 - Compartilhar Citações**
- **Como** um usuário inspirado
- **Eu quero** compartilhar citações em redes sociais
- **Para que** eu possa inspirar outros com descobertas interessantes
- **Status**: 📋 Planejada

**US12 - Perfil de Usuário**
- **Como** um usuário ativo
- **Eu quero** ter um perfil personalizado
- **Para que** eu possa ver minhas contribuições e estatísticas
- **Status**: 📋 Planejada

#### Análise INVEST - US04 (Criar Nova Citação)

**I - Independent (Independente):**
✅ A user story é independente de outras funcionalidades. Pode ser desenvolvida e testada isoladamente, embora se beneficie da existência de autores e tópicos.

**N - Negotiable (Negociável):**
✅ Os detalhes de implementação foram discutidos e refinados durante o desenvolvimento. Por exemplo, a decisão de usar modal para seleção de autor foi uma negociação de UX.

**V - Valuable (Valiosa):**
✅ Entrega valor direto ao usuário, permitindo que contribua com conteúdo para a plataforma e compartilhe conhecimento com outros usuários.

**E - Estimable (Estimável):**
✅ A complexidade foi bem compreendida, envolvendo frontend (formulário), backend (API), e banco de dados (relacionamentos). Estimada em 8 story points.

**S - Small (Pequena):**
✅ Pode ser completada em uma sprint, incluindo desenvolvimento, testes e validação. Não é excessivamente complexa para uma iteração.

**T - Testable (Testável):**
✅ Possui critérios de aceitação claros e mensuráveis. Pode ser testada através de testes unitários, integração e testes de interface do usuário.

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
`models/userModel.js`: Define o modelo User, correspondente à tabela users. Permite criar, consultar, atualizar e remover usuários, além de autenticar credenciais através de hash bcrypt e validação de email único.

`models/authorModel.js`: Define o modelo Author, correspondente à tabela authors. Permite cadastrar, consultar, atualizar e excluir autores, incluindo métodos especializados como `getAllWithQuotes()` para buscar autores com suas respectivas citações.

`models/quoteModel.js`: Define o modelo Quote, correspondente à tabela quotes. Implementa CRUD completo para citações, incluindo associação automática com autores e tópicos. Gerencia relacionamentos N:N com tópicos através de métodos como `updateTopics()` e consultas especializadas `getByAuthor()` e `getByTopic()`.

`models/topicModel.js`: Define o modelo Topic, correspondente à tabela topics. Permite criar, consultar, atualizar e excluir tópicos, incluindo método `getAllWithQuotes()` para buscar tópicos com suas citações associadas.

**Nota sobre Relacionamentos N:N:** Os relacionamentos entre quotes e topics são gerenciados diretamente no modelo Quote através de métodos especializados, eliminando a necessidade de um modelo separado para a tabela intermediária quote_topic. Esta abordagem simplifica a arquitetura mantendo a funcionalidade completa.

Os Models são importados e utilizados pelos controllers, implementando toda a lógica CRUD (Create, Read, Update, Delete) para cada entidade do sistema. Seguindo boas práticas como separação de responsabilidades, uso de consultas SQL parametrizadas e transações para operações complexas, os models encapsulam a lógica de negócios e o acesso ao banco de dados, facilitando a manutenção, testes e expansões futuras do sistema.
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
- Authors (id, name, nationality, bio)
- Quotes (id, text, description, created_at, user_id, author_id)
- Topics (id, name)
- Quote_Topic (quote_id, topic_id) - tabela intermediária

As relações entre entidades seguem o diagrama apresentado anteriormente, com users tendo várias quotes, quotes pertencendo a authors, e quotes tendo múltiplos topics através da tabela intermediária quote_topic. O relacionamento N:N entre quotes e topics é gerenciado através de métodos especializados no modelo Quote.

##### Controllers (Controladores)
Os principais controllers implementados são:

- **UserController**: Gerencia registro, login e operações de usuários
    - getAll(req, res): Lista todos os usuários
    - getById(req, res): Obtém usuário específico
    - create(req, res): Cria novo usuário com validação e hash de senha
    - update(req, res): Atualiza dados do usuário
    - deleteUser(req, res): Remove usuário
    - login(req, res): Autentica usuário e cria sessão

- **QuoteController**: Gerencia operações completas com citações
    - getAll(): Retorna todas as citações (usado internamente)
    - getById(req, res): Obtém citação específica
    - create(req, res): Adiciona nova citação com associação automática de autor e tópicos
    - update(req, res): Atualiza citação e seus relacionamentos
    - deleteQuote(req, res): Remove citação e associações

- **AuthorController**: Gerencia operações com autores
    - getAll(req, res): Lista todos os autores
    - getById(req, res): Obtém autor específico
    - create(req, res): Cria novo autor
    - update(req, res): Atualiza dados do autor
    - deleteAuthor(req, res): Remove autor

- **TopicController**: Gerencia operações com tópicos
    - getAll(req, res): Lista todos os tópicos
    - getById(req, res): Obtém tópico específico
    - create(req, res): Cria novo tópico
    - update(req, res): Atualiza tópico com validação de duplicatas
    - deleteTopic(req, res): Remove tópico

Os controllers interagem com os models para operações no banco e implementam validação de dados, tratamento de erros e respostas HTTP apropriadas.


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

A API RESTful do MyQuote foi implementada seguindo padrões de desenvolvimento web modernos, oferecendo endpoints estruturados para gerenciamento de usuários, citações, autores e tópicos. A API utiliza códigos de status HTTP apropriados, validação de dados e tratamento de erros, garantindo uma integração funcional entre frontend e backend através de requisições AJAX com Fetch API.

#### 3.6.1 Arquitetura da API

**Tecnologias Utilizadas:**
- **Express.js**: Framework web para Node.js
- **JSON**: Formato padrão para troca de dados
- **HTTP Status Codes**: Códigos padronizados para respostas
- **Middleware**: Validação, autenticação e tratamento de erros
- **CORS**: Configuração para requisições cross-origin

**Estrutura de Resposta Implementada:**
```json
// Resposta de sucesso (exemplo: criação de citação)
{
  "id": "uuid",
  "text": "Texto da citação",
  "description": "Descrição opcional",
  "author_name": "Nome do Autor",
  "topics": [{"id": "uuid", "name": "tópico"}]
}
```

**Tratamento de Erros:**
```json
{
  "error": "Descrição do erro específico"
}
```

#### 3.6.2 Endpoints Implementados

A API do MyQuote expõe os seguintes endpoints funcionais para gerenciamento de usuários, citações, autores e tópicos:

##### Usuários
- `GET /api/users` - Lista todos os usuários
    - 200: Lista retornada
    - 500: Erro interno
- `GET /api/users/:id` - Obtém usuário específico
    - 200: Usuário encontrado
    - 404: Usuário não encontrado
- `POST /api/users` - Cria novo usuário
    - 201: Usuário criado com sucesso
    - 400: Dados inválidos ou email já cadastrado
    - 500: Erro interno
- `PUT /api/users/:id` - Atualiza usuário
    - 200: Usuário atualizado
    - 404: Usuário não encontrado
    - 500: Erro interno
- `DELETE /api/users/:id` - Remove usuário
    - 200: Usuário removido
    - 404: Usuário não encontrado
- `POST /api/users/login` - Autentica usuário
    - 200: Login bem sucedido com criação de sessão
    - 401: Credenciais inválidas
    - 500: Erro interno
- `GET /api/users/logout` - Encerra sessão do usuário
    - Redirect: Redireciona para página inicial

##### Citações
- `POST /api/quotes` - Cria nova citação
    - 201: Citação criada com associação automática de autor e tópicos
    - 400: Dados inválidos
    - 500: Erro interno
- `PUT /api/quotes/:id` - Atualiza citação
    - 200: Citação atualizada com relacionamentos
    - 404: Citação não encontrada
    - 500: Erro interno
- `DELETE /api/quotes/:id` - Remove citação
    - 200: Citação removida com limpeza de associações
    - 404: Citação não encontrada
    - 500: Erro interno

##### Autores
- `GET /api/authors` - Lista todos os autores
    - 200: Lista retornada com contadores de citações
- `GET /api/authors/:id` - Obtém autor específico
    - 200: Autor encontrado
    - 404: Autor não encontrado
- `POST /api/authors` - Adiciona novo autor
    - 201: Autor criado
    - 500: Erro interno
- `PUT /api/authors/:id` - Atualiza autor
    - 200: Autor atualizado
    - 404: Autor não encontrado
    - 500: Erro interno
- `DELETE /api/authors/:id` - Remove autor
    - 200: Autor removido
    - 404: Autor não encontrado
    - 500: Erro interno
- `GET /api/authors/:id/quotes` - Obtém citações do autor
    - 200: Citações retornadas
    - 500: Erro interno

##### Tópicos
- `GET /api/topics` - Lista todos os tópicos
    - 200: Lista retornada com contadores de citações
- `GET /api/topics/:id` - Obtém tópico específico
    - 200: Tópico encontrado
    - 404: Tópico não encontrado
- `POST /api/topics` - Cria novo tópico
    - 201: Tópico criado
    - 500: Erro interno
- `PUT /api/topics/:id` - Atualiza tópico
    - 200: Tópico atualizado
    - 404: Tópico não encontrado
    - 500: Erro interno (incluindo violação de unicidade)
- `DELETE /api/topics/:id` - Remove tópico
    - 200: Tópico removido
    - 404: Tópico não encontrado
    - 500: Erro interno
- `GET /api/topics/:id/quotes` - Obtém citações do tópico
    - 200: Citações retornadas
    - 500: Erro interno

**Nota:** Os relacionamentos N:N entre citações e tópicos são gerenciados automaticamente através dos métodos do modelo Quote, não requerendo endpoints específicos para associações.


### 3.7 Interface e Navegação (Semana 07) 

O frontend do sistema MyQuote foi completamente implementado seguindo uma abordagem de design responsivo com tema library elegante, priorizando a usabilidade, acessibilidade e experiência do usuário. A interface foi construída utilizando EJS (Embedded JavaScript) como engine de templates, integrada com Bootstrap 5 e CSS customizado para criar uma identidade visual única e coesa que remete ao ambiente de uma biblioteca clássica.

#### 3.7.1 Arquitetura Frontend e Tecnologias Utilizadas

**Engine de Templates:**
- **EJS (Embedded JavaScript)**: Utilizado para renderização dinâmica de conteúdo
- **EJS-Mate**: Implementado para sistema de layouts e herança de templates
- **Estrutura Modular**: Organização em layouts, páginas, componentes e partials

**Tecnologias de Estilização:**
- **Bootstrap 5.1.3**: Framework CSS para responsividade e componentes base
- **CSS Customizado**: Estilização personalizada seguindo tema library
- **Arquitetura CSS Modular**: Organização em base, components e pages

**Estrutura de Arquivos Frontend Implementada:**
```
views/
├── layout/main.ejs          # Layout principal da aplicação
├── pages/                   # Páginas principais do sistema
│   ├── index.ejs           # Página inicial com listagem de frases
│   ├── login.ejs           # Página de autenticação
│   ├── register.ejs        # Página de cadastro
│   ├── quote-form.ejs      # Formulário de criação/edição de frases
│   ├── authors-topics.ejs  # Página de gerenciamento de autores e tópicos
│   ├── filtered-quotes.ejs # Página de frases filtradas
│   ├── author-form.ejs     # Formulário de criação/edição de autores
│   ├── topic-form.ejs      # Formulário de criação/edição de tópicos
│   ├── users.ejs           # Página de perfil do usuário
│   └── error.ejs           # Página de tratamento de erros
├── components/             # Componentes reutilizáveis
│   └── header.ejs         # Cabeçalho com navegação responsiva
└── partials/              # Elementos parciais
    ├── hero.ejs           # Seção hero da página inicial
    └── _quote_card.ejs    # Card de exibição de frases
```

#### 3.7.2 Sistema de Design e Identidade Visual

**Paleta de Cores (Tema Library):**
- **Primária**: Mahogany Brown (#8b4513) - Evoca madeira de biblioteca clássica
- **Secundária**: Dark Slate Gray (#2f4f4f) - Representa elegância e sobriedade
- **Accent**: Peru (#cd853f) - Tons quentes complementares
- **Background**: Cream (#f8f6f0) - Fundo suave que remete a páginas de livros antigos
- **Surface**: White (#ffffff) - Superfícies limpas para contraste

**Tipografia:**
- **Serif**: Playfair Display - Para títulos e elementos de destaque
- **Sans-serif**: Inter - Para texto corrido e interface

**Componentes Visuais:**
- **Cards com Gradientes**: Efeitos sutis que remetem a páginas de livros
- **Sombras Elegantes**: Profundidade visual sem exageros
- **Bordas Coloridas**: Indicadores visuais seguindo a paleta
- **Ícones Geométricos**: Representação visual de tópicos

<div align="center">
<sup>Figura 4 - Tela Inicial</sup>
<img src="/documentos/assets/hero.png"/>
<sup>Fonte: Autoria própria, 2025</sup>
</div>

#### 3.7.3 Navegação e Estrutura de Páginas

**Sistema de Navegação:**
O sistema implementa uma navegação intuitiva e responsiva através de um navbar fixo que se adapta a diferentes dispositivos:

**Desktop Navigation:**
- Logo/Brand: "MyQuote" (canto superior esquerdo)
- Menu Principal: "Autores & Tópicos" (centro)
- Área do Usuário: Login/Registrar ou Perfil/Logout (direita)

**Mobile Navigation:**
- Botão hamburger responsivo com animações suaves
- Menu collapse com estilização consistente ao tema
- Botões touch-friendly (44px mínimo)
- Fechamento automático ao selecionar item

<div align="center">
<sup>Figura 5 - Tela inicial versão mobile</sup>
<img src="/documentos/assets/mobile.png"/>
<sup>Fonte: Autoria própria, 2025</sup>
</div>

**Páginas Implementadas e Funcionais:**

1. **Página Inicial (index.ejs)**
   - Hero Section com call-to-action "Nova Frase"
   - Listagem dinâmica de frases recentes ordenadas por data
   - Cards de frases elegantes com informações do autor e nacionalidade
   - Integração com backend via EJS para renderização server-side
   - Layout responsivo que se adapta a diferentes dispositivos

<div align="center">
<sup>Figura 6 - Tela inicial, seção de frases recentes</sup>
<img src="/documentos/assets/quotes.png"/>
<sup>Fonte: Autoria própria, 2025</sup>
</div>

2. **Formulário de Frases (quote-form.ejs)**
   - Interface intuitiva para criação e edição de frases
   - Seleção de autor via modal com busca e criação automática
   - Seleção múltipla de tópicos com checkboxes estilizados
   - Campo de descrição opcional para contexto
   - Validação client-side e server-side
   - Integração via Fetch API para operações CRUD

<div align="center">
<sup>Figura 7 - Formulário de criação de uma nova frase</sup>
<img src="/documentos/assets/quoteforms.png"/>
<sup>Fonte: Autoria própria, 2025</sup>
</div>

3. **Autores & Tópicos (authors-topics.ejs)**
   - Visualização organizada em duas colunas responsivas
   - Cards informativos com contadores dinâmicos de citações
   - Links funcionais para filtros específicos por autor/tópico
   - Botões de edição e criação (quando usuário logado)
   - Layout em grid que se adapta ao conteúdo

<div align="center">
<sup>Figura 8 - Segunda Página, com os autores e tópicos</sup>
<img src="/documentos/assets/secondPage.png"/>
<sup>Fonte: Autoria própria, 2025</sup>
</div>

4. **Páginas de Autenticação (login.ejs, register.ejs)**
   - Formulários estilizados seguindo o tema library
   - Validação de campos em tempo real
   - Feedback visual de erros e sucessos
   - Design centrado e responsivo
   - Integração com sistema de sessões do backend

<div align="center">
<sup>Figura 9 - Formulário de Registro</sup>
<img src="/documentos/assets/registerform.png"/>
<sup>Fonte: Autoria própria, 2025</sup>
</div>


#### 3.7.4 Componentes e Funcionalidades Interativas

**Quote Cards (Componente Principal):**
```html
<!-- Estrutura do card de frase -->
<figure class="quote-card">
  <blockquote class="quote-text">"Texto da frase"</blockquote>
  <figcaption class="quote-author">Autor - [nacionalidade]</figcaption>
  <div class="quote-description">Descrição contextual</div>
  <div class="topic-geometric-indicators">
    <!-- Indicadores visuais de tópicos -->
  </div>
</figure>
```

**Características dos Quote Cards:**
- **Semântica HTML**: Uso correto de `<figure>` e `<blockquote>`
- **Indicadores Visuais**: Formas geométricas coloridas para tópicos
- **Responsividade**: Adaptação automática a diferentes telas
- **Interatividade**: Efeitos hover sutis e informativos

**Sistema de Tópicos Visuais:**
- **Formas Geométricas**: Pentágonos, hexágonos, círculos
- **Cores Diferenciadas**: Cada tópico possui cor única
- **Posicionamento**: Canto superior direito dos cards
- **Tooltip**: Informações adicionais no hover

INSERT IMAGE: [Close-up dos quote cards implementados mostrando a estrutura semântica HTML, tipografia elegante, informações do autor com nacionalidade e integração com dados do backend]

#### 3.7.5 Responsividade e Acessibilidade

**Design Mobile-First:**
- **Breakpoints**: Implementação de breakpoints Bootstrap customizados
- **Touch Targets**: Elementos interativos com tamanho mínimo de 44px
- **Navegação Mobile**: Menu hamburger com animações suaves
- **Tipografia Responsiva**: Ajuste automático de tamanhos de fonte

**Acessibilidade Implementada:**
- **Semântica HTML**: Uso correto de tags semânticas
- **ARIA Labels**: Atributos de acessibilidade em elementos interativos
- **Contraste**: Paleta de cores com contraste adequado (WCAG)
- **Navegação por Teclado**: Suporte completo para navegação via teclado
- **Screen Readers**: Estrutura compatível com leitores de tela

**Otimizações de Performance:**
- **CSS Modular**: Carregamento otimizado de estilos
- **Imagens Responsivas**: Adaptação automática de imagens
- **Lazy Loading**: Implementação para elementos não críticos
- **Minificação**: CSS e JavaScript otimizados para produção



#### 3.7.6 Integração Frontend-Backend

**Comunicação AJAX:**
- **Fetch API**: Requisições assíncronas para operações CRUD
- **JSON**: Formato padrão para troca de dados
- **Error Handling**: Tratamento robusto de erros
- **Loading States**: Feedback visual durante operações

**Renderização Dinâmica:**
- **Server-Side Rendering**: EJS renderiza conteúdo no servidor
- **Data Binding**: Integração dinâmica de dados do backend
- **Template Inheritance**: Reutilização eficiente de layouts
- **Partial Rendering**: Componentes modulares e reutilizáveis

**Exemplo de Integração Implementada (Criação de Frase):**
```javascript
// Frontend: Envio de dados via Fetch API (quote-form.ejs)
const response = await fetch('/api/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        text: document.getElementById('text').value,
        description: document.getElementById('description').value,
        username: '<%= user.username %>',
        author_name: selectedAuthor,
        topics: selectedTopics
});

// Backend: Processamento e resposta (quoteController.js)
const { text, description, username, author_name, topics } = req.body;
const newQuote = await quoteModel.create({ text, description, username, author_name, topics });
res.status(201).json(newQuote);
```

#### 3.7.7 Estados da Interface e Feedback Visual

**Estados Implementados:**
- **Loading**: Indicadores visuais durante carregamento
- **Success**: Confirmações de ações bem-sucedidas
- **Error**: Mensagens de erro contextuais
- **Empty States**: Interfaces para quando não há dados
- **Hover/Focus**: Feedback visual para interações

**Sistema de Notificações:**
- **Toast Messages**: Notificações não-intrusivas
- **Inline Validation**: Validação em tempo real
- **Modal Dialogs**: Confirmações importantes
- **Progress Indicators**: Feedback de progresso


#### 3.7.8 Conclusão da Implementação Frontend

O frontend do MyQuote foi desenvolvido com foco na experiência do usuário, implementando um design system coeso que reflete o tema de biblioteca clássica. A arquitetura modular facilita manutenção e expansões futuras, enquanto a responsividade garante acessibilidade em todos os dispositivos. A integração com o backend é fluida e eficiente, proporcionando uma experiência de uso moderna e intuitiva.

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