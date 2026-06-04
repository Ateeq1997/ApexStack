import clsx from 'clsx';

interface BadgeProps {
  value: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
}

const tones = {
  neutral: 'bg-slate-500/10 text-slate-500',
  success: 'bg-emerald-500/15 text-emerald-500',
  warning: 'bg-amber-500/15 text-amber-500',
  danger: 'bg-rose-500/15 text-rose-500'
};

export function Badge({ value, tone = 'neutral' }: BadgeProps) {
  return <span className={clsx('rounded-full px-2.5 py-1 text-xs font-semibold', tones[tone])}>{value}</span>;
}
