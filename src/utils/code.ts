export const landingPageCodeDesktopExample = `
 const usePrefersReducedMotion = () => {
   const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(true);

   React.useEffect(() => {
     const mediaQueryList = window.matchMedia(QUERY_NAME);
     setPrefersReducedMotion(!window.matchMedia(QUERY_NAME).matches);

     const listener = (event: React.ChangeEvent) => setPrefersReducedMotion(!event.matches);
     mediaQueryList.addEventListener("change", listener);

     return () => mediaQueryList.removeEventListener("change", listener), []);
   }
   return prefersReducedMotion;
 };

 export { usePrefersReducedMotion };
`;

export const landingPageCodeMobileExample = `
  export const setThemePreference = (theme: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, theme)
    reflectThemePreference(theme)
  };
`;

export const skillsUXExample = ``;