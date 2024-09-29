/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        sm: '640px',
        md: '1024px',
        lg: '1280px',
        xl: '1440px',
      },
      colors: {
        red: '#FC4747',
        darkBlue: '#10141E',
        greyBlue: '#5A698F',
        navy: '#161D2F',
        grey: '#979797',
      },

      fontFamily: {
        primary: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
