import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';

export function UnauthorizedPage() {
  return (
    <div className="mx-auto max-w-xl py-10">
      <Card title="Access Restricted" subtitle="You do not have permission to view this page.">
        <p className="text-sm text-muted">Contact your organization admin to request elevated access.</p>
        <Link to="/" className="mt-4 inline-block rounded-lg border px-3 py-2 text-sm font-semibold">
          Back to Dashboard
        </Link>
      </Card>
    </div>
  );
}
