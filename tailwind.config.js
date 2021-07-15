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
      lpBody: ['Inter var', ...defaultTheme.fontFamily.sans],
      lpTitle: ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [require('tailwindcss-truncate-multiline')()],
}
