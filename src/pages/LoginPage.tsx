import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import { Role } from '@/types';

export function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const login = useAppStore((state) => state.login);
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const [selectedRole, setSelectedRole] = useState<Role>('admin');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    login(selectedRole);
    navigate('/');
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-6 rounded-3xl border bg-[hsl(var(--surface))] p-6 shadow-card lg:grid-cols-2 lg:p-10">
          <section className="rounded-2xl border bg-[hsl(var(--surface-elevated))] p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">ApexStack Enterprise</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">SaaS Admin Platform</h1>
            <p className="mt-4 text-sm text-muted">
              Unified control plane for user operations, subscriptions, analytics, and platform health.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted">Availability</p>
                <p className="mt-1 text-lg font-bold">99.99%</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted">Active Tenants</p>
                <p className="mt-1 text-lg font-bold">1,204</p>
              </div>
              <div className="rounded-xl border p-3">
                <p className="text-xs text-muted">Monthly Events</p>
                <p className="mt-1 text-lg font-bold">32M</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Sign In</h2>
              <button
                className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
                type="button"
                onClick={toggleTheme}
              >
                Theme: {theme}
              </button>
            </div>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Work email" defaultValue="admin@apexstack.io" />
              <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Password" type="password" defaultValue="password" />
              <select
                className="w-full rounded-xl border px-3 py-2 text-sm"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value as Role)}
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-muted">
                <input type="checkbox" defaultChecked /> Keep me signed in
              </label>
              <Button className="w-full" type="submit">
                Continue to Dashboard
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted">Static login screen for demo flow. Any input is accepted.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
