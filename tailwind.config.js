module.exports = {
  purge: [],
  theme: {
    truncate: {
      lines: {
        3: '3',
        5: '5',
        8: '8',
      },
    },
    extend: {},
  },
  variants: {},
  plugins: [require('tailwindcss-truncate-multiline')()],
}
