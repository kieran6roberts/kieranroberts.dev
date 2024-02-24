import { SunLight, HalfMoon } from "iconoir-react";
import React, { useEffect, useState } from "react";
import { animated } from "react-spring";

import { getThemePreference, setThemePreference } from "../utils/theme";
import { useBoop } from "../hooks/useBoop";

const themeButtonLoader = (
  <div className="w-[40px] h-[40px] rounded-full bg-gray-100 dark:bg-gray-800"></div>
);

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null);
  const [style, trigger] = useBoop({ rotation: 45 });

  const handleThemeToggle = () => {
    const themePreference = getThemePreference();
    setIsDarkTheme(!isDarkTheme);
    setThemePreference(themePreference === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const themePreference = getThemePreference();
    setIsDarkTheme(themePreference === "dark");
  }, []);

  const themeButton = (
    <button
      id="theme-toggle"
      title="Toggles light & dark theme"
      aria-label="auto"
      aria-live="polite"
      className="flex items-center justify-center p-2 rounded-full link-focus icon-button-hover"
      onMouseEnter={trigger as any}
      onClick={handleThemeToggle}
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

  return <>{isDarkTheme === null ? themeButtonLoader : themeButton}</>;
};

export default ThemeToggle;
