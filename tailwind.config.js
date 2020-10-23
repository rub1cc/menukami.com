module.exports = {
  purge: [],
  theme: {
    truncate: {
      lines: {
        2: '2',
      },
    },
    extend: {},
  },
  variants: {},
  plugins: [require('tailwindcss-truncate-multiline')()],
}
