import { Menu, Moon, Search, Sun } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface TopbarProps {
  onMenu: () => void;
}

export function Topbar({ onMenu }: TopbarProps) {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const logout = useAppStore((state) => state.logout);
  const currentUserRole = useAppStore((state) => state.currentUserRole);

  return (
    <header className="sticky top-0 z-20 border-b bg-[hsl(var(--bg))]/90 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            className="rounded-lg border p-2 text-muted hover:text-[hsl(var(--text))] lg:hidden"
            onClick={onMenu}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden items-center gap-2 rounded-xl border px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-[hsl(var(--text))]/70" />
            <input
              className="w-60 bg-transparent text-sm text-[hsl(var(--text))] outline-none placeholder:text-[hsl(var(--text))]/55"
              placeholder="Search users, invoices, content"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="rounded-lg border p-2 text-muted transition hover:text-[hsl(var(--text))]"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="rounded-lg border px-3 py-2 text-xs font-semibold" onClick={logout}>
            Sign out
          </button>
          <div className="rounded-xl border px-3 py-2 text-right">
            <p className="text-xs text-muted">Signed in as</p>
            <p className="text-sm font-bold">Admin User</p>
            <p className="text-xs uppercase text-muted">{currentUserRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
