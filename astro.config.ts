import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://kieranroberts.dev',
	vite: {
		plugins: [],
	},
	prefetch: {
		defaultStrategy: 'hover',
		prefetchAll: false,
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		react(),
		sitemap(),
		(await import('astro-compress')).default({
			Path: ['./dist'],
			Image: false,
		}),
		icon(),
	],
});
