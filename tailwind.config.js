const { colors } = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    container: {
      center: true,
      padding: {
        default: "1rem",
        sm: "1rem",
        md: "2rem",
        lg: "6rem",
        xl: "12rem",
      },
    },
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: "#181818",
      white: "#efefef",
      primary: {
        100: "#ffffff",
        200: "#ffebfb",
        300: "#ffd1e1",
        400: "#ffb8c8",
        500: "#ff9faf",
        600: "#e48797",
        700: "#ca6f80",
        800: "#b05869",
        900: "#974154",
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
