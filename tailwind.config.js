module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main_green": "var(--main_green)",
        "main_grey": "var(--main_grey)",
        "placeholder_text": "var(--placeholder_text)",
        "button_green": "var(--button_green)"
      },
      fontFamily: {
        "main_font": "var(--main_font)"
      }
    },
  },
  plugins: [],
}
