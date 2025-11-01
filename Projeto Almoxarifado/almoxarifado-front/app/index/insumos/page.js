"use client";
import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function InsumosPage() {
  const [insumos, setInsumos] = useState([]);
  const [q, setQ] = useState('');
  const [form, setForm] = useState({ nome: '', descricao: '', quantidade: 0, minimo: 0, custo: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nome: '', descricao: '', quantidade: 0, minimo: 0, custo: 0 });

  async function load() {
    const res = await api.get(`/insumos?q=${encodeURIComponent(q)}`);
    setInsumos(res.data);
  }

  useEffect(() => { load(); }, []);

  function validateCommon(data) {
    if (!data.nome || !data.nome.trim()) {
      alert('Nome é obrigatório.');
      return false;
    }
    const numeros = ['quantidade', 'minimo', 'custo'];
    for (const k of numeros) {
      const v = data[k];
      if (v === '' || v === null || typeof v === 'undefined' || Number.isNaN(Number(v))) {
        alert(`${k} deve ser numérico.`);
        return false;
      }
      if (Number(v) < 0) {
        alert(`${k} não pode ser negativo.`);
        return false;
      }
    }
    return true;
  }

  async function create() {
    if (!validateCommon(form)) return;
    await api.post('/insumos', {
      ...form,
      quantidade: Number(form.quantidade),
      minimo: Number(form.minimo),
      custo: Number(form.custo)
    });
    setForm({ nome: '', descricao: '', quantidade: 0, minimo: 0, custo: 0 });
    load();
  }

  async function remove(id) {
    if (!confirm('Confirma exclusão?')) return;
    await api.delete(`/insumos/${id}`);
    load();
  }

  function startEdit(item) {
    setEditingId(item.id);
    setEditForm({
      nome: item.nome || '',
      descricao: item.descricao || '',
      quantidade: item.quantidade ?? 0,
      minimo: item.minimo ?? 0,
      custo: item.custo ?? 0
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ nome: '', descricao: '', quantidade: 0, minimo: 0, custo: 0 });
  }

  async function saveEdit(id) {
    if (!validateCommon(editForm)) return;
    await api.put(`/insumos/${id}`, {
      ...editForm,
      quantidade: Number(editForm.quantidade),
      minimo: Number(editForm.minimo),
      custo: Number(editForm.custo)
    });
    cancelEdit();
    load();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Cadastro de Insumo</h1>
      <div className="mb-4">
        <input placeholder="Busca" value={q} onChange={(e) => setQ(e.target.value)} className="p-2 border mr-2" />
        <button onClick={load} className="p-2 bg-slate-600 text-white">Buscar</button>
      </div>

      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="text-left"><th>Nome</th><th>Qtd</th><th>Mínimo</th><th>Custo</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {insumos.map(i => (
            <tr key={i.id} className="border-t">
              <td className="py-2 pr-2">
                {editingId === i.id ? (
                  <input
                    className="p-1 border w-full"
                    value={editForm.nome}
                    onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                  />
                ) : (
                  i.nome
                )}
              </td>
              <td className="py-2 pr-2">
                {editingId === i.id ? (
                  <input
                    type="number"
                    className="p-1 border w-24"
                    value={editForm.quantidade}
                    onChange={(e) => setEditForm({ ...editForm, quantidade: Number(e.target.value) })}
                  />
                ) : (
                  i.quantidade
                )}
              </td>
              <td className="py-2 pr-2">
                {editingId === i.id ? (
                  <input
                    type="number"
                    className="p-1 border w-24"
                    value={editForm.minimo}
                    onChange={(e) => setEditForm({ ...editForm, minimo: Number(e.target.value) })}
                  />
                ) : (
                  i.minimo
                )}
              </td>
              <td className="py-2 pr-2">
                {editingId === i.id ? (
                  <input
                    type="number"
                    className="p-1 border w-24"
                    value={editForm.custo}
                    onChange={(e) => setEditForm({ ...editForm, custo: Number(e.target.value) })}
                  />
                ) : (
                  i.custo
                )}
              </td>
              <td className="py-2">
                {editingId === i.id ? (
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(i.id)} className="text-green-700">Salvar</button>
                    <button onClick={cancelEdit} className="text-gray-600">Cancelar</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(i)} className="text-blue-700">Editar</button>
                    <button onClick={() => remove(i.id)} className="text-red-600">Excluir</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border">
        <h2 className="text-lg mb-2">Novo Insumo</h2>
        <label className="block mb-2">
          <span className="text-sm">Nome</span>
          <input id="insumo-nome" placeholder="Nome" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} className="p-2 border w-full mt-1" />
        </label>
        <label className="block mb-2">
          <span className="text-sm">Descrição</span>
          <input id="insumo-descricao" placeholder="Descrição" value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})} className="p-2 border w-full mt-1" />
        </label>
        <div className="flex gap-2">
          <label className="flex-1 flex flex-col">
            <span className="text-sm mb-1">Quantidade</span>
            <input id="insumo-quantidade" placeholder="Quantidade" type="number" value={form.quantidade} onChange={(e) => setForm({...form, quantidade: Number(e.target.value)})} className="p-2 border flex-1 mt-1" />
          </label>
          <label className="w-32 flex flex-col">
            <span className="text-sm mb-1">Minimo</span>
            <input id="insumo-minimo" placeholder="Minimo" type="number" value={form.minimo} onChange={(e) => setForm({...form, minimo: Number(e.target.value)})} className="p-2 border w-32 mt-1" />
          </label>
          <label className="w-32 flex flex-col">
            <span className="text-sm mb-1">Custo</span>
            <input id="insumo-custo" placeholder="Custo" type="number" value={form.custo} onChange={(e) => setForm({...form, custo: Number(e.target.value)})} className="p-2 border w-32 mt-1" />
          </label>
        </div>
        <div className="mt-2">
          <button onClick={create} className="p-2 bg-green-600 text-white">Criar</button>
        </div>
      </div>

      <div className="mt-6">
        <a href="/index" className="text-blue-600">Voltar</a>
      </div>
    </div>
  );
}
