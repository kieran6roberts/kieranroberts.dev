import { atom } from 'nanostores';

import { getThemePreference, setThemePreference } from '../utils/theme';

export const theme = atom<'light' | 'dark' | null>(null);

export function toggleTheme() {
  const themePreference = getThemePreference();
  const newTheme = themePreference === 'dark' ? 'light' : 'dark';
  theme.set(newTheme);
  setThemePreference(newTheme);
}
