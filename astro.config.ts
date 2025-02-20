import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://kieranroberts.dev/',
	vite: {
		plugins: [],
	},
	image: {
		domains: ['cdn.kieranroberts.dev'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.kieranroberts.dev',
			},
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
		sitemap(),
		(await import('astro-compress')).default({
			Path: ['./dist'],
			Image: false,
		}),
		icon(),
	],
});
