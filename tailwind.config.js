/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf4',
          100: '#fbf6e5',
          200: '#f6ecc7',
          300: '#eedfa0',
          400: '#e8cf7b',
          500: '#d4b455',
          600: '#b5933c',
          700: '#857542',
          800: '#5c4c23',
          900: '#3d3216',
        },
        charcoal: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#737373',
          500: '#525252',
          600: '#3f3f3f',
          700: '#2d2d2d',
          800: '#222222',
          900: '#1b1b1b',
          950: '#111111',
        },
      },
      fontFamily: {
        serif: ['var(--font-adamina)', 'Georgia', 'serif'],
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
