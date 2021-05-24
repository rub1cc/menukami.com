const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    truncate: {
      lines: {
        2: '2',
      },
    },
    fontFamily: {
      sans: ['Karla', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {},
  plugins: [require('tailwindcss-truncate-multiline')()],
}
