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

## <a name="c1"></a>1. Introdução (Semana 01)

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



### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

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
