type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

export const getThemePreference = (): Theme => {
	if (typeof localStorage !== 'undefined') {
		if (localStorage.getItem(STORAGE_KEY)) {
			return (localStorage.getItem(STORAGE_KEY) as Theme) || 'light';
		}
	}
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const reflectThemePreference = (theme: Theme) => {
	document.documentElement.className = '';
	document.documentElement.classList.add(theme);
	document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme);
};

export const setThemePreference = (theme: Theme) => {
	window.localStorage.setItem(STORAGE_KEY, theme);
	reflectThemePreference(theme);
};
