"use client";
import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function InsumosPage() {
  const [insumos, setInsumos] = useState([]);
  const [q, setQ] = useState('');
  const [form, setForm] = useState({ nome: '', descricao: '', quantidade: 0, minimo: 0, custo: 0 });

  async function load() {
    const res = await api.get(`/insumos?q=${encodeURIComponent(q)}`);
    setInsumos(res.data);
  }

  useEffect(() => { load(); }, []);

  async function create() {
    if (!form.nome) return alert('Nome obrigatório');
    await api.post('/insumos', form);
    setForm({ nome: '', descricao: '', quantidade: 0, minimo: 0, custo: 0 });
    load();
  }

  async function remove(id) {
    if (!confirm('Confirma exclusão?')) return;
    await api.delete(`/insumos/${id}`);
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
            <tr key={i.id} className="border-t"><td>{i.nome}</td><td>{i.quantidade}</td><td>{i.minimo}</td><td>{i.custo}</td><td><button onClick={() => remove(i.id)} className="text-red-600">Excluir</button></td></tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 border">
        <h2 className="text-lg mb-2">Novo Insumo</h2>
        <input placeholder="Nome" value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} className="p-2 border w-full mb-2" />
        <input placeholder="Descrição" value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})} className="p-2 border w-full mb-2" />
        <div className="flex gap-2">
          <input placeholder="Quantidade" type="number" value={form.quantidade} onChange={(e) => setForm({...form, quantidade: Number(e.target.value)})} className="p-2 border flex-1" />
          <input placeholder="Minimo" type="number" value={form.minimo} onChange={(e) => setForm({...form, minimo: Number(e.target.value)})} className="p-2 border w-32" />
          <input placeholder="Custo" type="number" value={form.custo} onChange={(e) => setForm({...form, custo: Number(e.target.value)})} className="p-2 border w-32" />
        </div>
        <div className="mt-2">
          <button onClick={create} className="p-2 bg-green-600 text-white">Criar</button>
        </div>
      </div>

      <div className="mt-6">
        <a href="/dashboard" className="text-blue-600">Voltar</a>
      </div>
    </div>
  );
}
