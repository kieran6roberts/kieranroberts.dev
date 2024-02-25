import { defineEcConfig } from 'astro-expressive-code'

export default defineEcConfig({
 themes: ['slack-ochin', 'rose-pine-moon'],
 frames: {
   showCopyToClipboardButton: false,
 },
 useDarkModeMediaQuery: true,
 themeCssSelector: (theme) => `[data-theme='${theme.name}']`
})