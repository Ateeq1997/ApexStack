import { ChangeEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable, DataTableColumn } from '@/components/ui/DataTable';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAppStore } from '@/store/useAppStore';
import { Role, User } from '@/types';

const PAGE_SIZE = 4;

export function UsersPage() {
  const users = useAppStore((state) => state.users);
  const updateUserRole = useAppStore((state) => state.updateUserRole);
  const toggleUserStatus = useAppStore((state) => state.toggleUserStatus);
  const bulkUpdateUserStatus = useAppStore((state) => state.bulkUpdateUserStatus);

  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | Role>('all');
  const [sortBy, setSortBy] = useState<'name' | 'joinedAt'>('name');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const bySearch = users.filter((user) =>
      `${user.name} ${user.email} ${user.company}`.toLowerCase().includes(query.toLowerCase())
    );
    const byRole = roleFilter === 'all' ? bySearch : bySearch.filter((user) => user.role === roleFilter);
    return [...byRole].sort((a, b) => (sortBy === 'name' ? a.name.localeCompare(b.name) : b.joinedAt.localeCompare(a.joinedAt)));
  }, [users, query, roleFilter, sortBy]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const allVisibleSelected = paginated.length > 0 && paginated.every((user) => selectedIds.includes(user.id));

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleSelectAllVisible = () => {
    const visibleIds = paginated.map((user) => user.id);
    setSelectedIds((prev) => {
      if (allVisibleSelected) {
        return prev.filter((id) => !visibleIds.includes(id));
      }
      const merged = new Set([...prev, ...visibleIds]);
      return Array.from(merged);
    });
  };

  const runBulkStatus = (status: 'active' | 'inactive') => {
    if (selectedIds.length === 0) return;
    bulkUpdateUserStatus(selectedIds, status);
    setSelectedIds([]);
  };

  const columns: DataTableColumn<User>[] = useMemo(
    () => [
      {
        key: 'select',
        header: (
          <input
            type="checkbox"
            checked={allVisibleSelected}
            onChange={toggleSelectAllVisible}
            aria-label="Select all visible"
          />
        ),
        render: (user) => (
          <input
            type="checkbox"
            checked={selectedIds.includes(user.id)}
            onChange={() => toggleSelection(user.id)}
            aria-label={`Select ${user.name}`}
          />
        )
      },
      {
        key: 'user',
        header: 'User',
        render: (user) => (
          <>
            <Link to={`/users/${user.id}`} className="font-semibold text-accent hover:underline">
              {user.name}
            </Link>
            <p className="text-xs text-muted">{user.email}</p>
          </>
        )
      },
      {
        key: 'role',
        header: 'Role',
        render: (user) => (
          <select
            value={user.role}
            className="rounded-lg border px-2 py-1"
            onChange={(event) => updateUserRole(user.id, event.target.value as Role)}
          >
            <option value="admin">admin</option>
            <option value="editor">editor</option>
            <option value="viewer">viewer</option>
          </select>
        )
      },
      {
        key: 'status',
        header: 'Status',
        render: (user) => <Badge value={user.status} tone={user.status === 'active' ? 'success' : 'warning'} />
      },
      {
        key: 'plan',
        header: 'Plan',
        render: (user) => user.plan
      },
      {
        key: 'action',
        header: 'Action',
        render: (user) => (
          <button className="rounded-lg border px-3 py-1 text-xs font-semibold" onClick={() => toggleUserStatus(user.id)}>
            Toggle
          </button>
        )
      }
    ],
    [allVisibleSelected, selectedIds, toggleUserStatus, toggleSelectAllVisible, updateUserRole]
  );

  const exportCsv = () => {
    const headers = ['id', 'name', 'email', 'role', 'status', 'plan', 'company', 'location', 'joinedAt'];
    const rows = filtered.map((user) =>
      [user.id, user.name, user.email, user.role, user.status, user.plan, user.company, user.location, user.joinedAt]
        .map((cell) => `"${cell}"`)
        .join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `users-export-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="User Management"
        description="Search, filter, sort, and maintain access roles from a single control surface."
        metrics={`${filtered.length} total users`}
      />
      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted">{selectedIds.length} selected</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={exportCsv}>Export CSV</Button>
            <Button variant="secondary" onClick={() => runBulkStatus('active')} disabled={selectedIds.length === 0}>
              Mark Active
            </Button>
            <Button variant="danger" onClick={() => runBulkStatus('inactive')} disabled={selectedIds.length === 0}>
              Mark Inactive
            </Button>
          </div>
        </div>
        <div className="mb-4 grid gap-3 md:grid-cols-4">
          <input
            className="rounded-xl border px-3 py-2 text-sm"
            placeholder="Search user"
            value={query}
            onChange={(event) => {
              setPage(1);
              setQuery(event.target.value);
            }}
          />
          <select
            className="rounded-xl border px-3 py-2 text-sm"
            value={roleFilter}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setPage(1);
              setRoleFilter(event.target.value as 'all' | Role);
            }}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          <select
            className="rounded-xl border px-3 py-2 text-sm"
            value={sortBy}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => setSortBy(event.target.value as 'name' | 'joinedAt')}
          >
            <option value="name">Sort: Name</option>
            <option value="joinedAt">Sort: Newest</option>
          </select>
          <div className="text-sm text-muted md:justify-self-end md:self-center">{filtered.length} users</div>
        </div>

        <DataTable
          columns={columns}
          rows={paginated}
          rowKey={(row) => row.id}
          emptyTitle="No users found"
          emptyDescription="Try a different search term or filter."
        />

        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-muted">
            Page {page} of {totalPages}
          </p>
          <div className="space-x-2">
            <button className="rounded-lg border px-3 py-1" disabled={page === 1} onClick={() => setPage((v) => v - 1)}>
              Prev
            </button>
            <button className="rounded-lg border px-3 py-1" disabled={page >= totalPages} onClick={() => setPage((v) => v + 1)}>
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
