-- SQL script to create database and sample data for Almoxarifado
-- Assumption: MySQL is used. Database name: manutencao

DROP DATABASE IF EXISTS manutencao;
CREATE DATABASE manutencao CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE manutencao;

-- users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- categorias (optional)
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

-- insumos table
CREATE TABLE insumos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  descricao TEXT,
  categoria_id INT,
  quantidade INT NOT NULL DEFAULT 0,
  minimo INT NOT NULL DEFAULT 0,
  custo DECIMAL(10,2) DEFAULT 0.00,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- movimentacoes (history)
CREATE TABLE movimentacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  insumo_id INT NOT NULL,
  tipo ENUM('entrada','saida') NOT NULL,
  quantidade INT NOT NULL,
  data_movimentacao DATETIME NOT NULL,
  requisitante VARCHAR(150) NOT NULL,
  usuario_id INT,
  FOREIGN KEY (insumo_id) REFERENCES insumos(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed data: at least 3 records for each table
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
(1,'entrada',100,NOW(),'Compra fornecedor',1),
(2,'entrada',5,NOW(),'Compra fornecedor',1),
(3,'entrada',40,NOW(),'Compra fornecedor',1);
