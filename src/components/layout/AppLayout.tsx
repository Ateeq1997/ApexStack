import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { useAppStore } from '@/store/useAppStore';
import { scheduleAppPrefetch } from '@/utils/prefetch';

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

export function AppLayout() {
  const theme = useAppStore((state) => state.theme);
  const accentPreset = useAppStore((state) => state.accentPreset);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (!isAuthenticated) return;
    return scheduleAppPrefetch();
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-[hsl(var(--bg))] text-[hsl(var(--text))] lg:grid lg:grid-cols-[288px_1fr]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="min-w-0 bg-[hsl(var(--bg))]">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <div className="mx-auto w-full max-w-7xl bg-[hsl(var(--bg))] p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
