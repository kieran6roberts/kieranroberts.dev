/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
	plugins: [require('tailwindcss-animate')],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Lato', 'sans-serif'],
				heading: ['Barlow', 'sans-serif'],
			},
			colors: {
				'accent-darkest': '#6F61C0',
				'accent-dark': '#A084E8',
				'accent-bright': '#8BE8E5',
				'accent-brightest': '#D5FFE4',
			},
		},
	},
	darkMode: ['class'],
};
