"use client";
import { useState } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      // save token in localStorage (simple approach)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      router.push('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.error || 'Falha na autenticação';
      setError(msg);
      // after showing message, user remains on login page
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border" />
        <input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border" />
        {error && <div className="text-red-600">{error}</div>}
        <button className="bg-blue-600 text-white p-2">Entrar</button>
      </form>
    </div>
  );
}
