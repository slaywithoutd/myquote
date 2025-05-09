-- Habilita extensão necessária para gerar UUIDs aleatórios
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE users CASCADE;
DROP TABLE authors CASCADE;
DROP TABLE quotes CASCADE;
DROP TABLE topics CASCADE;
DROP TABLE quote_topic CASCADE;

-- Tabela de usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(16) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Tabela de autores
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(128) NOT NULL,
    nationality VARCHAR(64),
    bio TEXT
);

-- Tabela de citações
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    author_id UUID NOT NULL REFERENCES authors(id)
);

-- Tabela de tópicos
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(64) NOT NULL UNIQUE
);

-- Tabela de associação entre citações e tópicos
CREATE TABLE quote_topic (
    quote_id UUID NOT NULL REFERENCES quotes(id),
    topic_id UUID NOT NULL REFERENCES topics(id),
    PRIMARY KEY (quote_id, category_id)
);
