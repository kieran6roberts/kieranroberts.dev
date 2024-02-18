type Theme = 'light' | "dark";
const storageKey = 'theme';

export const getThemePreference = (): Theme => {
 if (localStorage.getItem(storageKey))
   return (localStorage.getItem(storageKey) as Theme) || 'light'
 else
   return window.matchMedia('(prefers-color-scheme: dark)').matches
     ? 'dark'
     : 'light'
};

export const reflectThemePreference = (theme: Theme) => {
 document.documentElement.className = '';
 document.documentElement.classList.add(theme)
 document
   .querySelector('#theme-toggle')
   ?.setAttribute('aria-label', theme)
};

export const setThemePreference = (theme: Theme) => {
 window.localStorage.setItem(storageKey, theme)
 reflectThemePreference(theme)
};
