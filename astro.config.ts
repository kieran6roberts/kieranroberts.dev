import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";


// https://astro.build/config
export default defineConfig({
  prefetch: {
    defaultStrategy: 'hover',
    prefetchAll: false
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), 
  react(), 
  icon(), 
  expressiveCode({
    themes: ['dracula', 'solarized-light'],
  })]
});