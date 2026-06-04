import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { RevenuePoint } from '@/types';
import { currency } from '@/utils/format';

interface RevenueLineChartProps {
  data: RevenuePoint[];
}

export function RevenueLineChart({ data }: RevenueLineChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted))" />
          <YAxis stroke="hsl(var(--muted))" tickFormatter={(value) => `$${value / 1000}k`} />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--surface))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px'
            }}
            formatter={(value: number) => currency(value)}
          />
          <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
