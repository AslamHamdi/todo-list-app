const colors = require('tailwindcss/colors')

module.exports = {
  //mode: 'jit',
  content: [
    "./Views/**/*.{html}", 
    "./ClientApp/src/js/**/*.{js}" ,
    //"flowbite/**/*.js"
  ],
  // purge: [
  //   './Views**/*.html',
  //   './ClientApp/src/css/**/*.{js,jsx,ts,tsx,vue}',
  // ],
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        emerald: colors.emerald,
      }
    },
  },
  plugins: [
    //require('flowbite/plugin')Developer: Reload Window
  ],
}
