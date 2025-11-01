-- SQLite-compatible schema and seed for manutencao.db
-- Run with: sqlite3 manutencao.db < manutencao_sqlite.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS movimentacoes;
DROP TABLE IF EXISTS insumos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL
);

CREATE TABLE insumos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria_id INTEGER,
  quantidade INTEGER NOT NULL DEFAULT 0 CHECK (quantidade >= 0),
  minimo INTEGER NOT NULL DEFAULT 0 CHECK (minimo >= 0),
  custo REAL DEFAULT 0 CHECK (custo >= 0),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

CREATE TABLE movimentacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  insumo_id INTEGER NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('entrada','saida')),
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  data_movimentacao TEXT NOT NULL, -- ISO datetime string
  requisitante TEXT NOT NULL,
  usuario_id INTEGER,
  FOREIGN KEY (insumo_id) REFERENCES insumos(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed data (passwords here are placeholders; app uses bcrypt)
INSERT INTO users (name, email, password) VALUES
('Administrador','admin@empresa.com','$2a$10$examplehash000000000000000000000000000000000000000'),
('João Silva','joao@empresa.com','$2a$10$examplehash000000000000000000000000000000000000000'),
('Maria Souza','maria@empresa.com','$2a$10$examplehash000000000000000000000000000000000000000');

INSERT INTO categorias (nome) VALUES
('Papelaria'),
('Toners'),
('Material de Arquivo');

INSERT INTO insumos (nome, descricao, categoria_id, quantidade, minimo, custo) VALUES
('Papel A4', 'Pacote com 500 folhas', 1, 100, 10, 25.00),
('Toner HP 85A', 'Compatível com impressora modelo X', 2, 5, 2, 450.00),
('Pasta Arquivo A4', 'Pasta plástica para documentos', 3, 40, 5, 3.50);

INSERT INTO movimentacoes (insumo_id, tipo, quantidade, data_movimentacao, requisitante, usuario_id) VALUES
(1,'entrada',100,datetime('now'),'Compra fornecedor',1),
(2,'entrada',5,datetime('now'),'Compra fornecedor',1),
(3,'entrada',40,datetime('now'),'Compra fornecedor',1);
