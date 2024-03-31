import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import expressiveCode from "astro-expressive-code";
import { FontaineTransform } from 'fontaine';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans'],
        resolvePath: (id) => new URL(`./public${id}`, import.meta.url),
      }),
    ]
  },
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: false
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    
    react(), 
    expressiveCode(),
    (await import("astro-compress")).default({
			Path: ["./dist"],
		}),
  ],
});