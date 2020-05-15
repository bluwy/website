const { colors } = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    container: {
      center: true,
      padding: {
        default: "16px",
        sm: "16px",
        md: "32px",
        lg: "120px",
        xl: "240px",
      },
    },
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      primary: {
        100: "#fff1f8",
        200: "#ffe4f1",
        300: "#ffd6eb",
        400: "#ffc9e4",
        500: "#ffbbdd",
        600: "#e6a8c7",
        700: "#cc96b1",
        800: "#997085",
        900: "#805e6f",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', "sans-serif"],
      },
      borderWidth: {
        "10": "10px",
        "12": "12px",
      },
    },
  },
  variants: {},
}
