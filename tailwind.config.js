module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'suzumecha': '#8F5A3C',
        'suzumecha-light': '#BC9C8A',
        'suzumecha-extra-light': '#E9DED8',
        'fountainblue': '#4AA5B8',
      }
    },
  },
  plugins: [require("daisyui")],
}
