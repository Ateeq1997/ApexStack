import { LayoutDashboard, Users, CreditCard, FileText, Bell, Settings } from 'lucide-react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { to: '/content', label: 'Content', icon: FileText },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings }
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 w-72 border-r bg-elevated px-5 py-6 transition-transform lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-muted">ApexStack</p>
          <h1 className="mt-2 text-xl font-extrabold">Admin Console</h1>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
                    isActive
                      ? 'bg-[hsl(var(--accent-soft))] text-accent'
                      : 'text-muted hover:bg-[hsl(var(--accent-soft))]/60 hover:text-[hsl(var(--text))]'
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {open && <button className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} aria-label="Close menu" />}
    </>
  );
}
