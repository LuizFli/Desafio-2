"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }


  return (
    <nav aria-label="Main navigation">
      <ul className="space-y-1">

        <li>
          <Link
            href="/index"
            className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Home
          </Link>
        </li>
        
        <li>
          <Link
            href="/index/insumos"
            className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Insumos
          </Link>
        </li>
        <li>
          <Link
            href="/index/estoque"
            className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Estoque
          </Link>
        </li>
        <li>
          <Link
            onClick={logout}
            href="/login"
            className="block rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Exit
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
