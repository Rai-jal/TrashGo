/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#2A7A8C',
          light: '#4499AD',
          dark: '#1D5A69',
        },
        secondary: {
          main: '#60B3C5',
          light: '#83C9D7',
          dark: '#3D8A99',
        },
      },
    },
  },
  plugins: [],
  important: true,
};