import tailwindColors from 'tailwindcss/colors';
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      ...tailwindColors,
      lichtBlauw: {
        DEFAULT: '#4FA8E0',
      },
      paars: {
        DEFAULT: '#6D1D5E',
      },
      donkerblauw: {
        DEFAULT: '#2C3A82',
      },
    },
  },
  plugins: [require('daisyui')],
};
