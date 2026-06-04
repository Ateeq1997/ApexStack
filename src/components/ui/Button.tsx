import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary: 'bg-[hsl(var(--accent))] text-white hover:opacity-90',
  secondary: 'bg-[hsl(var(--accent-soft))] text-[hsl(var(--text))] hover:opacity-90',
  danger: 'bg-rose-500 text-white hover:bg-rose-600'
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
