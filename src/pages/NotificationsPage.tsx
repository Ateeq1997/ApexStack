import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable, DataTableColumn } from '@/components/ui/DataTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAppStore } from '@/store/useAppStore';
import { ActivityLog } from '@/types';

export function NotificationsPage() {
  const notifications = useAppStore((state) => state.notifications);
  const activity = useAppStore((state) => state.activity);
  const markNotificationRead = useAppStore((state) => state.markNotificationRead);
  const markAllNotificationsRead = useAppStore((state) => state.markAllNotificationsRead);
  const [levelFilter, setLevelFilter] = useState<'all' | 'info' | 'warning' | 'critical'>('all');
  const [unreadOnly, setUnreadOnly] = useState(false);

  const filteredNotifications = useMemo(
    () =>
      notifications.filter((item) => {
        const levelMatch = levelFilter === 'all' ? true : item.level === levelFilter;
        const unreadMatch = unreadOnly ? !item.read : true;
        return levelMatch && unreadMatch;
      }),
    [notifications, levelFilter, unreadOnly]
  );
  const unreadCount = notifications.filter((item) => !item.read).length;
  const activityColumns: DataTableColumn<ActivityLog>[] = [
    { key: 'actor', header: 'Actor', render: (entry) => <span className="font-semibold">{entry.actor}</span> },
    { key: 'action', header: 'Action', render: (entry) => entry.action },
    { key: 'target', header: 'Target', render: (entry) => entry.target },
    { key: 'timestamp', header: 'Timestamp', render: (entry) => <span className="text-xs text-muted">{entry.timestamp}</span> }
  ];

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Notifications Center"
        description="Track platform alerts and user activity with operational context."
        metrics={`${unreadCount} unread`}
      />
      <div className="grid gap-4 lg:grid-cols-2">
      <Card title="System Notifications" subtitle="Alerts and platform events">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border px-2 py-1.5 text-xs"
            value={levelFilter}
            onChange={(event) => setLevelFilter(event.target.value as 'all' | 'info' | 'warning' | 'critical')}
          >
            <option value="all">All levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
          <label className="inline-flex items-center gap-2 text-xs text-muted">
            <input type="checkbox" checked={unreadOnly} onChange={(event) => setUnreadOnly(event.target.checked)} />
            Unread only
          </label>
          <Button variant="secondary" className="ml-auto" onClick={markAllNotificationsRead}>
            Mark All Read
          </Button>
        </div>
        <div className="space-y-3">
          {filteredNotifications.map((item) => (
            <article key={item.id} className="rounded-xl border p-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold">{item.title}</h4>
                <div className="flex items-center gap-2">
                  {!item.read && <Badge value="new" tone="success" />}
                  <Badge
                    value={item.level}
                    tone={item.level === 'critical' ? 'danger' : item.level === 'warning' ? 'warning' : 'neutral'}
                  />
                </div>
              </div>
              <p className="mt-2 text-sm text-muted">{item.message}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="text-xs text-muted">{item.time}</p>
                {!item.read && (
                  <button className="rounded-md border px-2 py-1 text-xs font-semibold" onClick={() => markNotificationRead(item.id)}>
                    Mark read
                  </button>
                )}
              </div>
            </article>
          ))}
          {filteredNotifications.length === 0 && (
            <EmptyState title="No matching notifications" description="Try adjusting filters or unread-only mode." />
          )}
        </div>
      </Card>

      <Card title="Activity Log" subtitle="Admin and user actions">
        <DataTable columns={activityColumns} rows={activity} rowKey={(entry) => entry.id} />
      </Card>
      </div>
    </div>
  );
}
