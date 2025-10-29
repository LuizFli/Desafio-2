"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) router.push('/login');
    else setUser(JSON.parse(u));
  }, [router]);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl">Painel Principal</h1>
      <p className="mt-2">Usuário: {user?.name}</p>
      <div className="mt-4 flex gap-3">
        <h2 className="text-xl">Bem vindo!</h2>
      </div>
      <div className="mt-6">
        
      </div>
    </div>
  );
}
