/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ["Noto Sans", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'custom': '0px 1px 6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),

  ],
}