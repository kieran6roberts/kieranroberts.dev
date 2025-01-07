import { SunLightSVG, MoonStarsSVG } from '@components/icons';
import * as React from 'react';
import { animated } from '@react-spring/web';
import { useStore } from '@nanostores/react';

import { getThemePreference } from '@utils/theme';
import { useBoop } from '@hooks/useBoop';
import { toggleTheme, theme } from 'src/stores/themeStore';

const ThemeButtonLoader = () => (
  <span className="w-[36px] h-[36px] rounded-full bg-zinc-50 dark:bg-zinc-900" />
);

const ThemeToggle = () => {
  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({
    rotation: 30,
    timing: 300,
  });
  const [isMounted, setIsMounted] = React.useState(false);
  const $theme = useStore(theme);
  const isDarkTheme = $theme === 'dark';

  React.useEffect(() => {
    const themePreference = getThemePreference();
    theme.set(themePreference);
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <ThemeButtonLoader />;
  }

  const themeButton = (
    <button
      id="theme-toggle"
      title="Toggles light & dark theme"
      aria-live="polite"
      className="flex items-center justify-center p-1.5 rounded-full link-focus icon-button-hover"
      onMouseEnter={handleBoopTrigger}
      onClick={toggleTheme}
      disabled={$theme === null}
      {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}
    >
      <animated.span style={styleToApplyOnBoop} className="block text-d dark:text-l w-6 h-6">
        {isDarkTheme ? <SunLightSVG /> : <MoonStarsSVG />}
      </animated.span>
    </button>
  );

  return themeButton;
};

export default ThemeToggle;
