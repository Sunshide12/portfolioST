import { createContext, useContext, useEffect, type ReactNode } from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────
export type Theme = 'dark';

interface ThemeContextValue {
  theme: Theme;
  isDark: true;
}

// ─── Context ───────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue | null>(null);

// ─── Provider ──────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Always force dark — remove any stale stored preference.
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.removeItem('sunshide-theme');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark', isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
