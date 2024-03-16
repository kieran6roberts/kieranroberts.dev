import { SunLight, HalfMoon } from "iconoir-react";
import React, { useEffect } from "react";
import { animated } from "react-spring";
import { useStore } from "@nanostores/react";

import { getThemePreference } from "../utils/theme";
import { useBoop } from "../hooks/useBoop";
import { toggleTheme, theme } from "src/stores/themeStore";

const themeButtonLoader = (
  <div className="w-[40px] h-[40px] rounded-full bg-gray-100 dark:bg-gray-800"></div>
);

const ThemeToggle = () => {
  const [style, trigger] = useBoop({ rotation: 45 });
  const $theme = useStore(theme);
  const isDarkTheme = $theme === "dark";

  useEffect(() => {
    const themePreference = getThemePreference();
    theme.set(themePreference);
  }, []);

  const themeButton = (
    <button
      id="theme-toggle"
      title="Toggles light & dark theme"
      aria-label="auto"
      aria-live="polite"
      className="flex items-center justify-center p-2 rounded-full link-focus icon-button-hover"
      onMouseEnter={trigger as any}
      onClick={toggleTheme}
    >
      <animated.span style={style as any}>
        {isDarkTheme === null ? (
          themeButtonLoader
        ) : isDarkTheme ? (
          <SunLight width={24} />
        ) : (
          <HalfMoon width={24} />
        )}
      </animated.span>
    </button>
  );

  return <>{$theme === null ? themeButtonLoader : themeButton}</>;
};

export default ThemeToggle;
