/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
