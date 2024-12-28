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
        sans: ["Lato", "sans-serif"],
        heading: ["Barlow", "sans-serif"],
      },
      colors: {
        // New set
        "l": "#fdfdfd",
        "d": "#100114",
        "accent-darkest": "#6F61C0",
        "accent-dark": "#A084E8",
        "accent-bright": "#8BE8E5",
        "accent-brightest": "#D5FFE4",

        // Legacy set

        // Light mode
        "l-primary-darkest": "#320E3B",
        "l-primary-dark": "#4C2A85",
        "l-secondary": "#6B7FD7",
        "l-tertiary-1": "#71DAEC",
        "l-tertiary-2": "#97EC77",


        // Dark mode
        "d-primary-darkest": "#320E3B",
        "d-primary-dark": "#4C2A85",
        "d-secondary": "#6B7FD7",
        "d-tertiary-1": "#BCEDF6",
        "d-tertiary-2": "#DDFBD2",
      },
    },
  },
  darkMode: "class",
};
