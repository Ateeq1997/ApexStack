import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAppStore } from '@/store/useAppStore';

export function UserProfilePage() {
  const { userId = '' } = useParams();
  const users = useAppStore((state) => state.users);

  const user = useMemo(() => users.find((item) => item.id === userId), [users, userId]);

  if (!user) {
    return <EmptyState title="User not found" description="The selected user record is unavailable." />;
  }

  return (
    <div className="space-y-4">
      <SectionHeader
        title="User Profile"
        description="Identity, organization details, and access posture for the selected user."
        metrics={user.id}
      />
      <div className="grid gap-4 md:grid-cols-2">
      <Card title="User Profile" subtitle={user.id}>
        <div className="space-y-3 text-sm">
          <p>
            <span className="text-muted">Name:</span> {user.name}
          </p>
          <p>
            <span className="text-muted">Email:</span> {user.email}
          </p>
          <p>
            <span className="text-muted">Company:</span> {user.company}
          </p>
          <p>
            <span className="text-muted">Location:</span> {user.location}
          </p>
        </div>
      </Card>

      <Card title="Access & Subscription">
        <div className="space-y-3 text-sm">
          <p>
            <span className="text-muted">Role:</span> {user.role}
          </p>
          <p>
            <span className="text-muted">Plan:</span> {user.plan}
          </p>
          <p>
            <span className="text-muted">Joined:</span> {user.joinedAt}
          </p>
          <div>
            <Badge value={user.status} tone={user.status === 'active' ? 'success' : 'warning'} />
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
}
