/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Lato',
  				'sans-serif'
  			],
  			heading: [
  				'Barlow',
  				'sans-serif'
  			]
  		},
  		colors: {
  			'l': '#fdfdfd',
  			'd': '#100114',
  			'accent-darkest': '#6F61C0',
  			'accent-dark': '#A084E8',
  			'accent-bright': '#8BE8E5',
  			'accent-brightest': '#D5FFE4',
  			'l-primary-darkest': '#320E3B',
  			'l-primary-dark': '#4C2A85',
  			'l-secondary': '#6B7FD7',
  			'l-tertiary-1': '#71DAEC',
  			'l-tertiary-2': '#97EC77',
  			'd-primary-darkest': '#320E3B',
  			'd-primary-dark': '#4C2A85',
  			'd-secondary': '#6B7FD7',
  			'd-tertiary-1': '#BCEDF6',
  			'd-tertiary-2': '#DDFBD2',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  darkMode: ["class"],
};
