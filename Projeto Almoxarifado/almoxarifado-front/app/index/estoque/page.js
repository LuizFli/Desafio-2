"use client";
import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function EstoquePage() {
  const [insumos, setInsumos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectFocused, setSelectFocused] = useState(false);
  const [selectFocusedTipo, setSelectFocusedTipo] = useState(false);
  const [form, setForm] = useState({ tipo: 'entrada', quantidade: 0, data_movimentacao: '', requisitante: '' });

  async function load() {
    const res = await api.get('/insumos');
    // sort alphabetically by nome (requirement 7.1.1 uses an algorithm; here native sort used)
    res.data.sort((a, b) => a.nome.localeCompare(b.nome));
    setInsumos(res.data);
  }

  useEffect(() => { load(); }, []);

  async function submit() {
    if (!selected) return alert('Selecione um insumo');
    if (!form.quantidade || !form.requisitante) return alert('Quantidade e requisitante são obrigatórios');
  const payload = { insumoId: selected.id, tipo: form.tipo, quantidade: Number(form.quantidade), data_movimentacao: form.data_movimentacao, requisitante: form.requisitante };
  const res = await api.post('/movimentacoes', payload);
    if (res.data.alerta) alert('ALERTA: ' + res.data.mensagem);
    setSelected(null);
    setForm({ tipo: 'entrada', quantidade: 0, data_movimentacao: '', requisitante: '' });
    load();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Gestão de Estoque</h1>
      <div className="mb-4">
        <h2 className="text-lg">Selecione Insumo</h2>
        <select
          onChange={(e) => setSelected(insumos.find(i => i.id === Number(e.target.value)))}
          onFocus={() => setSelectFocused(true)}
          onBlur={() => setSelectFocused(false)}
          className={`p-2 border ${selectFocused ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
          <option value="" style={{ backgroundColor: selectFocused ? '#000' : '#fff', color: selectFocused ? '#fff' : '#000' }}>-- selecione --</option>
          {insumos.map(i => (
            <option key={i.id} value={i.id} style={{ backgroundColor: selectFocused ? '#000' : '#fff', color: selectFocused ? '#fff' : '#000' }}>
              {i.nome} (Qtd: {i.quantidade})
            </option>
          ))}
        </select>
      </div>

      <div className="p-4 border mb-4">
        <label className="block mb-1">Tipo</label>
        <select
          value={form.tipo}
          onChange={(e) => setForm({...form, tipo: e.target.value})}
          onFocus={() => setSelectFocusedTipo(true)}
          onBlur={() => setSelectFocusedTipo(false)}
          className={`p-2 border mb-2 ${selectFocusedTipo ? 'bg-black text-white' : 'bg-white text-black'}`}
        >
          <option value="entrada" style={{ backgroundColor: selectFocusedTipo ? '#000' : '#fff', color: selectFocusedTipo ? '#fff' : '#000' }}>Entrada</option>
          <option value="saida" style={{ backgroundColor: selectFocusedTipo ? '#000' : '#fff', color: selectFocusedTipo ? '#fff' : '#000' }}>Saída</option>
        </select>
        <label className="block mb-1">Quantidade</label>
        <input type="number" value={form.quantidade} onChange={(e) => setForm({...form, quantidade: Number(e.target.value)})} className="p-2 border mb-2" />
        <label className="block mb-1">Data</label>
        <input type="datetime-local" value={form.data_movimentacao} onChange={(e) => setForm({...form, data_movimentacao: e.target.value})} className="p-2 border mb-2" />
        <label className="block mb-1">Requisitante</label>
        <input value={form.requisitante} onChange={(e) => setForm({...form, requisitante: e.target.value})} className="p-2 border mb-2" />
        <div>
          <button onClick={submit} className="p-2 bg-blue-600 text-white">Registrar Movimentação</button>
        </div>
      </div>

      <div>
        <a href="/dashboard" className="text-blue-600">Voltar</a>
      </div>
    </div>
  );
}
