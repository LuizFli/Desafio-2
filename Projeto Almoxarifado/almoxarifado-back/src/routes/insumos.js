const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// GET /insumos?q=term
router.get('/', async (req, res) => {
  const q = req.query.q || '';
  const insumos = await prisma.insumo.findMany({
    where: {
      nome: { contains: q }
    },
    include: { categoria: true }
  });
  res.json(insumos);
});

// POST /insumos
// protected: create insumo
router.post('/', auth, async (req, res) => {
  const { nome, descricao, categoriaId, quantidade = 0, minimo = 0, custo = 0 } = req.body;
  if (!nome) return res.status(400).json({ error: 'Nome do insumo é obrigatório' });
  const insumo = await prisma.insumo.create({ data: { nome, descricao, categoriaId, quantidade, minimo, custo } });
  res.status(201).json(insumo);
});

// PUT /insumos/:id
// protected: update insumo
router.put('/:id', auth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nome, descricao, categoriaId, quantidade, minimo, custo } = req.body;
  try {
    const updated = await prisma.insumo.update({ where: { id }, data: { nome, descricao, categoriaId, quantidade, minimo, custo } });
    res.json(updated);
  } catch (e) {
    res.status(404).json({ error: 'Insumo não encontrado' });
  }
});

// DELETE /insumos/:id
// protected: delete insumo
router.delete('/:id', auth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await prisma.insumo.delete({ where: { id } });
    res.json({ success: true });
  } catch (e) {
    res.status(404).json({ error: 'Insumo não encontrado' });
  }
});

module.exports = router;
