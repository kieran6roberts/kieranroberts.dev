// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
 plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
 overrides: [
   {
     files: '*.astro',
     options: {
       parser: 'astro',
     },
   },
 ],

 semi: true,
 bracketSameLine: false,
 bracketSpacing: true,
 singleQuote: true,
 jsxSingleQuote: false,
 tabWidth: 2,
 astroAllowShorthand: true,
 useTabs: true,
 printWidth: 100,
 trailingComma: 'all',
 bracketSpacing: true,
};