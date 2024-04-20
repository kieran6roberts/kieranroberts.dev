import { SunLightSVG, HalfMoonSVG } from "@components/icons";
import * as React from "react";
import { animated } from "react-spring";
import { useStore } from "@nanostores/react";

import { getThemePreference } from "@utils/theme";
import { useBoop } from "@hooks/useBoop";
import { toggleTheme, theme } from "src/stores/themeStore";

const ThemeButtonLoader = () => (
  <span className="w-[40px] h-[40px] rounded-full bg-gray-800" />
);

const ThemeToggle = () => {
  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({ rotation: 45 });
  const [isMounted, setIsMounted] = React.useState(false);
  const $theme = useStore(theme);
  const isDarkTheme = $theme === "dark";

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
      className="flex items-center justify-center text-white p-2 rounded-full outline-none focus:ring ring-offset-gray-900 ring-offset-4 ring-d-tertiary-2 icon-button-hover"
      onMouseEnter={handleBoopTrigger}
      onClick={toggleTheme}
      disabled={$theme === null}
      {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}
    >
      <animated.span
        style={styleToApplyOnBoop}
        className="block text-white w-6 h-6"
      >
        {isDarkTheme ? <SunLightSVG /> : <HalfMoonSVG />}
      </animated.span>
    </button>
  );

  return themeButton;
};

export default ThemeToggle;
