const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Senha inválida' });
  const token = jwt.sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
