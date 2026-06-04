import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAppStore } from '@/store/useAppStore';

const accentPalette = {
  ocean: {
    light: { accent: '203 88% 45%', soft: '203 80% 94%' },
    dark: { accent: '194 84% 56%', soft: '203 40% 20%' }
  },
  emerald: {
    light: { accent: '158 81% 37%', soft: '155 62% 92%' },
    dark: { accent: '160 84% 45%', soft: '160 35% 19%' }
  },
  amber: {
    light: { accent: '32 95% 44%', soft: '37 92% 92%' },
    dark: { accent: '35 92% 53%', soft: '31 44% 19%' }
  }
} as const;

const themePalette = {
  light: {
    bg: '236 40% 97%',
    surface: '0 0% 100%',
    surfaceElevated: '0 0% 100%',
    text: '222 30% 12%',
    muted: '220 20% 24%',
    border: '220 18% 88%'
  },
  dark: {
    bg: '226 32% 9%',
    surface: '226 26% 13%',
    surfaceElevated: '225 24% 17%',
    text: '210 40% 96%',
    muted: '216 18% 72%',
    border: '224 18% 24%'
  }
} as const;

function LoadingView() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <Skeleton className="h-10 w-1/3" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
      <Skeleton className="h-80" />
    </div>
  );
}

function ErrorView() {
  return (
    <div className="p-4 md:p-6">
      <Card title="Something went wrong" subtitle="Unable to load dashboard data.">
        <p className="text-sm text-muted">Please refresh or check system status logs.</p>
      </Card>
    </div>
  );
}

export default function App() {
  const theme = useAppStore((state) => state.theme);
  const accentPreset = useAppStore((state) => state.accentPreset);
  const isLoading = useAppStore((state) => state.isLoading);
  const hasError = useAppStore((state) => state.hasError);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');

    const modeTokens = theme === 'dark' ? themePalette.dark : themePalette.light;
    const tokenSet = theme === 'dark' ? accentPalette[accentPreset].dark : accentPalette[accentPreset].light;

    document.documentElement.style.setProperty('--bg', modeTokens.bg);
    document.documentElement.style.setProperty('--surface', modeTokens.surface);
    document.documentElement.style.setProperty('--surface-elevated', modeTokens.surfaceElevated);
    document.documentElement.style.setProperty('--text', modeTokens.text);
    document.documentElement.style.setProperty('--muted', modeTokens.muted);
    document.documentElement.style.setProperty('--border', modeTokens.border);
    document.documentElement.style.setProperty('--accent', tokenSet.accent);
    document.documentElement.style.setProperty('--accent-soft', tokenSet.soft);
  }, [theme, accentPreset]);

  if (isLoading) return <LoadingView />;
  if (hasError) return <ErrorView />;

  return <RouterProvider router={router} />;
}
