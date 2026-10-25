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
        ochre: {
          50: '#FBF8F1',
          100: '#F5EEDC',
          200: '#EADBB8',
          300: '#DCC38E',
          400: '#D4B062',
          500: '#C59B4B',
          600: '#B08537',
          700: '#8C6724',
          800: '#684B19',
          900: '#483411',
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
          850: '#1A1D20',
          900: '#14171A',
          950: '#111111',
        },
      },
      fontFamily: {
        editorial: ['"Cormorant Garamond"', 'var(--font-adamina)', 'Georgia', 'serif'],
        serif: ['var(--font-adamina)', 'Georgia', 'serif'],
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
