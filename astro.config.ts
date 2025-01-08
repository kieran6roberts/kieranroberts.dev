import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { FontaineTransform } from 'fontaine';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://kieranroberts.dev',
	vite: {
		plugins: [
			FontaineTransform.vite({
				fallbacks: ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans'],
				resolvePath: (id: string) => new URL(`./public${id}`, import.meta.url),
			}),
		],
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
