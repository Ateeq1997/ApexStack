interface SectionHeaderProps {
  title: string;
  description: string;
  metrics?: string;
}

export function SectionHeader({ title, description, metrics }: SectionHeaderProps) {
  return (
    <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-[hsl(var(--text))]">{title}</h2>
        <p className="mt-1 text-sm text-[hsl(var(--text))]">{description}</p>
      </div>
      {metrics && <p className="rounded-xl border bg-elevated px-3 py-1.5 text-xs font-semibold text-muted">{metrics}</p>}
    </header>
  );
}
