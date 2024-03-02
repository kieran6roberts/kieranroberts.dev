/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        'header': 'Permanent Marker'
      },
      colors: {
        // Light mode
        'l-primary-darkest': '#320E3B',
        'l-primary-dark': '#4C2A85',
        'l-secondary': '#6B7FD7',
        'l-tertiary-1': '#71DAEC',
        'l-tertiary-2': '#97EC77',
        // Dark mode
        'd-primary-darkest': '#320E3B',
        'd-primary-dark': '#4C2A85',
        'd-secondary': '#6B7FD7',
        'd-tertiary-1': '#BCEDF6',
        'd-tertiary-2': '#DDFBD2',
      }
    },
  },
  darkMode: "class",
}

