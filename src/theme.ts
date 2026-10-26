// Switching the page theme in the browser. The theme is the data-theme attribute on <html>
// (see styles.css); ThemeScript restores the saved choice before the page paints.

export type Theme = 'light' | 'dark' | 'system';

/** localStorage key shared with ThemeScript. */
export const THEME_STORAGE_KEY = 'theme';

const root = () => document.documentElement;

export function getTheme(): Theme {
  const theme = root().dataset.theme;
  return theme === 'dark' || theme === 'system' ? theme : 'light';
}

/** The theme actually shown — `system` resolved to light or dark. */
export function getResolvedTheme(): 'light' | 'dark' {
  const theme = getTheme();
  if (theme !== 'system') return theme;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Sets the page theme and remembers it (unless `persist` is false). */
export function setTheme(theme: Theme, { persist = true } = {}) {
  root().dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — the theme still applies.
    }
  }
  root().dispatchEvent(new CustomEvent('theme:change', { detail: { theme } }));
}

/** Switches between light and dark (from `system`, to the opposite of what's shown). */
export function toggleTheme() {
  setTheme(getResolvedTheme() === 'dark' ? 'light' : 'dark');
}
