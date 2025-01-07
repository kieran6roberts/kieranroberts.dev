import * as React from 'react';

const QUERY_NAME = '(prefers-reduced-motion: no-preference)';

const usePrefersReducedMotion = () => {
  /**
   * Default to no animations on mount to be SRR safe. This is fine since I don't
   * have any animation on mount and don't intend to have any right now.
   */
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(true);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY_NAME);

    setPrefersReducedMotion(!window.matchMedia(QUERY_NAME).matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);
  return prefersReducedMotion;
};

export { usePrefersReducedMotion };
