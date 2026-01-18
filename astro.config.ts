import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

export default defineConfig({
	site: 'https://kieranroberts.dev',
	markdown: {
		shikiConfig: {
			wrap: false,
			themes: {
				light: 'snazzy-light',
				dark: 'andromeeda',
			},
		},
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
		sitemap(),
		(await import('astro-compress')).default({
			Path: ['./dist'],
			Image: false,
		}),
		icon(),
	],
});
