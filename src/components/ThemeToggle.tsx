import { SunLightSVG, MoonStarsSVG } from '@components/icons';
import * as React from 'react';
import { useStore } from '@nanostores/react';

import { getThemePreference } from '@utils/theme';
import { toggleTheme, theme } from 'src/stores/themeStore';

const ThemeButtonLoader = () => (
	<span className="h-[36px] w-[36px] rounded-full bg-zinc-50 dark:bg-zinc-900" />
);

export const ThemeToggle = () => {
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
			className="link-focus icon-button-hover group flex items-center justify-center rounded-full p-1.5"
			onClick={toggleTheme}
			disabled={$theme === null}
		>
			<span className="duration-400 block h-6 w-6 text-d transition-transform ease-in-out group-hover:-rotate-90 dark:text-l">
				{isDarkTheme ? <SunLightSVG /> : <MoonStarsSVG />}
			</span>
		</button>
	);

	return themeButton;
};
