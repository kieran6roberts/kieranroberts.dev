/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
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
			animation: {
				reveal: 'reveal 500ms ease-in forwards',
			},
			keyframes: {
				'reveal': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
		},
	},
	darkMode: ['class'],
};
