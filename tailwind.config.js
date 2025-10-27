/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Tailwind scans all JS/TS files in src
  ],
  theme: {
    extend: {
      colors: {
        'bg-page': '#475466',
        'card-bg': '#687687',
        'maroon-red': '#9c2838',
        'maroon-hover': '#882230',
        'link-light': '#dddddd',
        'link-accent': '#a02038',
      },
      boxShadow: {
        'card-shadow': '0 10px 30px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
};
