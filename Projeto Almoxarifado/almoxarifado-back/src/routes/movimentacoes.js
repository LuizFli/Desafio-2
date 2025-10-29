const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// GET /movimentacoes
// protected: only authenticated users can view movements
router.get('/', auth, async (req, res) => {
  const list = await prisma.movimentacao.findMany({ include: { insumo: true, usuario: true }, orderBy: { data_movimentacao: 'desc' } });
  res.json(list);
});

// POST /movimentacoes
// body: { insumoId, tipo: 'entrada'|'saida', quantidade, data_movimentacao, requisitante, usuarioId }
// protected: only authenticated users can create movements
router.post('/', auth, async (req, res) => {
  const { insumoId, tipo, quantidade, data_movimentacao, requisitante } = req.body;
  // prefer user id from token if available
  const usuarioId = req.body.usuarioId || req.user?.userId || null;
  if (!insumoId || !tipo || !quantidade || !requisitante) return res.status(400).json({ error: 'Dados incompletos' });

  const insumo = await prisma.insumo.findUnique({ where: { id: insumoId } });
  if (!insumo) return res.status(404).json({ error: 'Insumo não encontrado' });

  // apply movement
  let newQty = insumo.quantidade;
  if (tipo === 'entrada') {
    newQty = newQty + Number(quantidade);
  } else if (tipo === 'saida') {
    newQty = newQty - Number(quantidade);
    if (newQty < 0) return res.status(400).json({ error: 'Quantidade insuficiente em estoque' });
  } else {
    return res.status(400).json({ error: 'Tipo inválido' });
  }

  // create movimentacao and update insumo
  const movimento = await prisma.movimentacao.create({ data: {
    insumoId,
    tipo,
    quantidade: Number(quantidade),
    data_movimentacao: data_movimentacao ? new Date(data_movimentacao) : new Date(),
    requisitante,
    usuarioId: usuarioId || null
  }});

  await prisma.insumo.update({ where: { id: insumoId }, data: { quantidade: newQty } });

  // check minimum
  const updatedInsumo = await prisma.insumo.findUnique({ where: { id: insumoId } });
  const alerta = updatedInsumo.quantidade < updatedInsumo.minimo;

  res.status(201).json({ movimento, insumo: updatedInsumo, alerta, mensagem: alerta ? 'Estoque abaixo do mínimo configurado' : null });
});

module.exports = router;
