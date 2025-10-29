/**
 * Simple Prisma seed script to create initial data.
 * Run with: node prisma/seed.js (or `npm run seed`)
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // create users
  const passwordHash = await bcrypt.hash('senha123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@empresa.com' },
    update: {},
    create: { name: 'Administrador', email: 'admin@empresa.com', password: passwordHash }
  });

  await prisma.user.upsert({
    where: { email: 'joao@empresa.com' },
    update: {},
    create: { name: 'João Silva', email: 'joao@empresa.com', password: passwordHash }
  });

  await prisma.user.upsert({
    where: { email: 'maria@empresa.com' },
    update: {},
    create: { name: 'Maria Souza', email: 'maria@empresa.com', password: passwordHash }
  });

  // categorias
  const papelaria = await prisma.categoria.upsert({ where: { id: 1 }, update: {}, create: { nome: 'Papelaria' } });
  const toners = await prisma.categoria.upsert({ where: { id: 2 }, update: {}, create: { nome: 'Toners' } });
  const arquivo = await prisma.categoria.upsert({ where: { id: 3 }, update: {}, create: { nome: 'Material de Arquivo' } });

  // insumos
  const papel = await prisma.insumo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Papel A4', descricao: 'Pacote com 500 folhas', categoriaId: papelaria.id, quantidade: 100, minimo: 10, custo: 25.0
    }
  });

  const toner = await prisma.insumo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: 'Toner HP 85A', descricao: 'Compatível com impressora modelo X', categoriaId: toners.id, quantidade: 5, minimo: 2, custo: 450.0
    }
  });

  const pasta = await prisma.insumo.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nome: 'Pasta Arquivo A4', descricao: 'Pasta plástica para documentos', categoriaId: arquivo.id, quantidade: 40, minimo: 5, custo: 3.5
    }
  });

  // movimentacoes
  await prisma.movimentacao.upsert({
    where: { id: 1 },
    update: {},
    create: { insumoId: papel.id, tipo: 'entrada', quantidade: 100, data_movimentacao: new Date(), requisitante: 'Compra fornecedor', usuarioId: 1 }
  });

  await prisma.movimentacao.upsert({
    where: { id: 2 },
    update: {},
    create: { insumoId: toner.id, tipo: 'entrada', quantidade: 5, data_movimentacao: new Date(), requisitante: 'Compra fornecedor', usuarioId: 1 }
  });

  await prisma.movimentacao.upsert({
    where: { id: 3 },
    update: {},
    create: { insumoId: pasta.id, tipo: 'entrada', quantidade: 40, data_movimentacao: new Date(), requisitante: 'Compra fornecedor', usuarioId: 1 }
  });

  console.log('Seed finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
