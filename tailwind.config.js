/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'lincoln-blue': '#182343',
        'lincoln-red': '#D70E33',
        'lincoln-sky': '#75AADB',
        'lincoln-yellow': '#FDB71E',
      },
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'serif'],
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
      },
    },
  },
  plugins: [],
}
