# Casos de Teste — Almoxarifado

Ambiente e ferramentas
- Frontend: Next.js 16, React 19, Axios.
- Backend: Node.js (Express), Prisma.
- Banco de dados: SQLite (arquivo manutencao.db) para a entrega do script; em desenvolvimento, MySQL via Prisma (opcional).
- SO: Windows 10/11 (informar a sua versão). Navegador: Chrome/Edge (versão atual).

## CT-01 — Login com sucesso
- Pré-condição: Usuário existente (admin@empresa.com / senha válida).
- Passos: Acessar /login, preencher e-mail/senha, enviar.
- Resultado esperado: Redirecionar para /index e exibir nome do usuário.

## CT-02 — Login com falha (usuário inexistente)
- Passos: E-mail não cadastrado, senha qualquer; enviar.
- Resultado esperado: Exibir mensagem "Usuário não encontrado" e permanecer na tela de login.

## CT-03 — Login com falha (senha inválida)
- Passos: E-mail válido, senha incorreta; enviar.
- Resultado esperado: Exibir mensagem "Senha inválida" e permanecer na tela de login.

## CT-04 — Listar insumos
- Passos: Autenticar, acessar /index/insumos.
- Resultado esperado: Tabela com insumos carregada automaticamente.

## CT-05 — Buscar insumos
- Passos: Digitar termo (ex.: "Papel"), clicar Buscar.
- Resultado esperado: Tabela atualiza mostrando apenas registros correspondentes.

## CT-06 — Criar insumo com sucesso
- Passos: Preencher nome, descrição, quantidade >=0, mínimo >=0, custo >=0; clicar Criar.
- Resultado esperado: Insumo criado, tabela atualizada, campos limpos.

## CT-07 — Criar insumo com dados inválidos
- Passos: Deixar nome vazio ou informar valores negativos/não numéricos.
- Resultado esperado: Alertas claros informando o(s) campo(s) inválido(s).

## CT-08 — Editar insumo
- Passos: Na linha do insumo, clicar Editar, alterar campos, clicar Salvar.
- Resultado esperado: Atualizar no backend e refletir na tabela.

## CT-09 — Cancelar edição
- Passos: Iniciar edição e clicar Cancelar.
- Resultado esperado: Voltar à exibição da linha sem alterações.

## CT-10 — Excluir insumo
- Passos: Clicar Excluir e confirmar.
- Resultado esperado: Remover insumo e atualizar listagem.

## CT-11 — Listagem ordenada na Gestão de Estoque
- Passos: Acessar /index/estoque.
- Resultado esperado: Lista de insumos ordenada alfabeticamente por algoritmo (insertion sort).

## CT-12 — Registrar entrada
- Passos: Selecionar insumo, tipo Entrada, informar quantidade>0, data, requisitante; salvar.
- Resultado esperado: Quantidade do insumo aumenta; histórico criado.

## CT-13 — Registrar saída com estoque suficiente
- Passos: Selecionar insumo, tipo Saída, quantidade <= estoque atual; salvar.
- Resultado esperado: Quantidade diminui; histórico criado; sem alerta de mínimo (se >= mínimo).

## CT-14 — Registrar saída com estoque abaixo do mínimo
- Passos: Selecionar insumo com mínimo definido, saída que deixa abaixo do mínimo; salvar.
- Resultado esperado: Movimento criado; alerta exibido: "Estoque abaixo do mínimo configurado".

## CT-15 — Logout
- Passos: Clicar "Exit" na navbar.
- Resultado esperado: Limpar token e redirecionar para /login.
