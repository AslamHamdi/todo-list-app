const colors = require('tailwindcss/colors')

module.exports = {
  //mode: 'jit',
  content: [
    "./Views/**/*.{html}", 
    "./ClientApp/src/js/**/*.{js}",
  ],
  // purge: [
  //   './Views**/*.html',
  //   './ClientApp/src/css/**/*.{js,jsx,ts,tsx,vue}',
  // ],
  theme: {
    placeholderColor: theme => theme('colors'),
    extend: {
      colors: {
        amber: colors.amber,
        emerald: colors.emerald,
        slate: colors.slate,
      }
    },
  },
  prefix: 'tw-',
  plugins: [
  ],
}
