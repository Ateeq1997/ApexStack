import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SubscriptionPlan } from '@/types';

interface PlanRevenueBarChartProps {
  data: SubscriptionPlan[];
}

export function PlanRevenueBarChart({ data }: PlanRevenueBarChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted))" />
          <YAxis stroke="hsl(var(--muted))" tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--surface))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px'
            }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Bar dataKey="mrr" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
