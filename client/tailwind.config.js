/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {},
    colors:{
      yellow: {
        light: "#F1BF01",
        faded: "#F1BF01"
      },
      blue: "#332A59",
      white: '#ffffff',
      black: {
        light: '#262626',
        faded: '#00000059'
      },
      gray: {
        base: '#616161',
        background: '#fafafa',
        primary: '#dbdbdb'
      },
      red: {
        primary: '#ed4956'
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover']
    }
  },
  plugins: [require('tw-elements/dist/plugin')],
}
