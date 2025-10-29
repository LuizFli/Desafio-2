require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const insumosRoutes = require('./routes/insumos');
const movimentacoesRoutes = require('./routes/movimentacoes');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/insumos', insumosRoutes);
app.use('/movimentacoes', movimentacoesRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
