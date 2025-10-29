import Navbar from '../components/navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
        <div className="flex min-h-screen">
          {/* Sidebar on the left */}
          <aside className="w-64 bg-gray-600 dark:bg-zinc-600 border-r border-zinc-200 dark:border-zinc-800 p-4">
            <Navbar />
          </aside>

          {/* Right column: header on top, children below */}
          <div className="flex-1 flex flex-col">
            <header className="w-full bg-gray-600 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-3 shadow-sm">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-lg font-semibold">Cafeteria</h1>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Bem-vindo</div>
              </div>
            </header>

            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}