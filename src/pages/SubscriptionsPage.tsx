import { Suspense, lazy, useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { DataTable, DataTableColumn } from '@/components/ui/DataTable';
import { DeferredRender } from '@/components/ui/DeferredRender';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useAppStore } from '@/store/useAppStore';
import { BillingEntry } from '@/types';

const PlanRevenueBarChart = lazy(() =>
  import('@/components/charts/PlanRevenueBarChart').then((module) => ({ default: module.PlanRevenueBarChart }))
);

function ChartPlaceholder() {
  return <div className="h-72 w-full animate-pulse rounded-xl bg-[hsl(var(--accent-soft))]" />;
}

export function SubscriptionsPage() {
  const plans = useAppStore((state) => state.plans);
  const billing = useAppStore((state) => state.billing);
  const [growthScenario, setGrowthScenario] = useState(12);
  const totalMrr = useMemo(() => plans.reduce((sum, plan) => sum + plan.mrr, 0), [plans]);
  const forecastMrr = Math.round(totalMrr * (1 + growthScenario / 100));
  const billingColumns: DataTableColumn<BillingEntry>[] = [
    { key: 'id', header: 'Invoice', render: (entry) => <span className="font-semibold">{entry.id}</span> },
    { key: 'customer', header: 'Customer', render: (entry) => entry.customer },
    { key: 'amount', header: 'Amount', render: (entry) => entry.amount },
    { key: 'date', header: 'Date', render: (entry) => entry.date },
    { key: 'status', header: 'Status', render: (entry) => entry.status }
  ];

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Subscription System"
        description="Plan performance, billing operations, and invoice workflow management."
        metrics={`${plans.length} active plans`}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} title={plan.name} subtitle={`${plan.price} · ${plan.conversion} conversion`}>
            <p className="text-2xl font-extrabold">{plan.users}</p>
            <p className="text-sm text-muted">Subscribers</p>
            <p className="mt-2 text-sm font-semibold">MRR: ${plan.mrr.toLocaleString()}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card title="Plan Revenue Mix" subtitle="MRR by subscription tier" className="xl:col-span-2">
          <DeferredRender placeholder={<ChartPlaceholder />} rootMargin="250px">
            <Suspense fallback={<ChartPlaceholder />}>
              <PlanRevenueBarChart data={plans} />
            </Suspense>
          </DeferredRender>
        </Card>
        <Card title="Forecast Scenario" subtitle="Projected 90-day MRR">
          <p className="text-xs text-muted">Growth assumption</p>
          <input
            className="mt-3 w-full"
            type="range"
            min={0}
            max={35}
            value={growthScenario}
            onChange={(event) => setGrowthScenario(Number(event.target.value))}
          />
          <p className="mt-2 text-sm font-semibold">{growthScenario}% projected growth</p>
          <p className="mt-4 text-xs text-muted">Current MRR</p>
          <p className="text-xl font-extrabold">${totalMrr.toLocaleString()}</p>
          <p className="mt-3 text-xs text-muted">Projected MRR</p>
          <p className="text-2xl font-extrabold text-accent">${forecastMrr.toLocaleString()}</p>
        </Card>
      </div>

      <Card title="Billing History" subtitle="Recent invoice status">
        <DataTable
          columns={billingColumns}
          rows={billing}
          rowKey={(entry) => entry.id}
          emptyTitle="No billing entries"
          emptyDescription="Invoices will appear here when generated."
        />
      </Card>

      <Card title="Invoice Generator (Mock)" subtitle="Preview invoice creation form">
        <form className="grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border px-3 py-2 text-sm" placeholder="Customer name" />
          <input className="rounded-xl border px-3 py-2 text-sm" placeholder="Amount" />
          <input className="rounded-xl border px-3 py-2 text-sm" placeholder="Due date" type="date" />
          <select className="rounded-xl border px-3 py-2 text-sm">
            <option>Basic</option>
            <option>Pro</option>
            <option>Enterprise</option>
          </select>
          <textarea className="rounded-xl border px-3 py-2 text-sm md:col-span-2" rows={4} placeholder="Invoice notes" />
          <button className="rounded-xl bg-[hsl(var(--accent))] px-4 py-2 text-sm font-semibold text-white md:col-span-2">
            Generate Invoice (Mock)
          </button>
        </form>
      </Card>

      {billing.length === 0 && <EmptyState title="No billing entries" description="New invoices will appear here once generated." />}
    </div>
  );
}
