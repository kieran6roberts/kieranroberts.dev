// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
 plugins: ['prettier-plugin-astro'],
 overrides: [
   {
     files: '*.astro',
     options: {
       parser: 'astro',
     },
   },
 ],

 semi: true,
 singleQuote: true,
 tabWidth: 2,
 useTabs: false,
 printWidth: 100,
 trailingComma: 'es5',
 bracketSpacing: true,
};