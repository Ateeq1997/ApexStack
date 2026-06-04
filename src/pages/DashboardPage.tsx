import { Suspense, lazy } from 'react';
import { AlertTriangle, ArrowDownRight, ArrowUpRight, CheckCircle2, Server } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { DeferredRender } from '@/components/ui/DeferredRender';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { kpis, revenueSeries, systemHealth } from '@/data/seed';

const RevenueLineChart = lazy(() =>
  import('@/components/charts/RevenueLineChart').then((module) => ({ default: module.RevenueLineChart }))
);
const UserGrowthBarChart = lazy(() =>
  import('@/components/charts/UserGrowthBarChart').then((module) => ({ default: module.UserGrowthBarChart }))
);

function ChartPlaceholder({ height }: { height: string }) {
  return <div className={`${height} w-full animate-pulse rounded-xl bg-[hsl(var(--accent-soft))]`} />;
}

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Overview Dashboard"
        description="Realtime KPIs, revenue movement, and platform system health."
        metrics="Refreshed 2m ago"
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <p className="text-sm text-[hsl(var(--text))]/80">{kpi.label}</p>
            <p className="mt-3 text-2xl font-extrabold tracking-tight">{kpi.value}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold">
              {kpi.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-rose-500" />
              )}
              {kpi.change}
            </p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card title="Revenue Trend" subtitle="Last 6 months" className="xl:col-span-2">
          <DeferredRender
            placeholder={<ChartPlaceholder height="h-80" />}
            rootMargin="250px"
          >
            <Suspense fallback={<ChartPlaceholder height="h-80" />}>
              <RevenueLineChart data={revenueSeries} />
            </Suspense>
          </DeferredRender>
        </Card>

        <Card title="System Health" subtitle="Realtime services">
          <div className="space-y-3">
            {systemHealth.map((service) => (
              <div key={service.name} className="rounded-xl border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{service.name}</p>
                  {service.status === 'healthy' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  {service.status === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                  {service.status === 'critical' && <Server className="h-4 w-4 text-rose-500" />}
                </div>
                <p className="mt-2 text-xs text-[hsl(var(--text))]/75">Uptime: {service.uptime}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card title="User Growth" subtitle="Monthly active users" className="xl:col-span-2">
          <DeferredRender
            placeholder={<ChartPlaceholder height="h-72" />}
            rootMargin="250px"
          >
            <Suspense fallback={<ChartPlaceholder height="h-72" />}>
              <UserGrowthBarChart data={revenueSeries} />
            </Suspense>
          </DeferredRender>
        </Card>
        <Card title="Quick Actions" subtitle="Operational shortcuts">
          <div className="space-y-2 text-sm">
            <button className="w-full rounded-xl border px-3 py-2 text-left font-semibold">Provision API Key</button>
            <button className="w-full rounded-xl border px-3 py-2 text-left font-semibold">Create Enterprise Invoice</button>
            <button className="w-full rounded-xl border px-3 py-2 text-left font-semibold">Export Weekly Report</button>
            <button className="w-full rounded-xl border px-3 py-2 text-left font-semibold">Open Incident Timeline</button>
          </div>
        </Card>
      </section>
    </div>
  );
}
