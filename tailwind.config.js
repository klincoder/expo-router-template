// Defaults
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

// Modules
module.exports = {
  theme: {
    screens: {
      sm: "380px",
      md: "420px",
      lg: "680px",
    }, // close screens
    extend: {
      colors: {
        primary: "#313BAC",
        secondary: "#11143C",
        accent: "#F9F871",
        // Normal
        success: "#198754",
        danger: "#FF5252",
        info: "#0DCAF0",
        warning: "#FFC107",
        white: "#FFFFFF",
        black: "#000000",
        gray: "#9CA3AF",
      }, // close colors
      fontFamily: {
        regular: ["Montserrat-Regular", ...defaultTheme.fontFamily.sans],
        medium: ["Montserrat-Medium", ...defaultTheme.fontFamily.sans],
        light: ["Montserrat-Light", ...defaultTheme.fontFamily.sans],
        thin: ["Montserrat-Thin", ...defaultTheme.fontFamily.sans],
      }, // close font family
    }, // close extend
  }, // close theme
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        "btn-primary": `text-white p-2 rounded-lg uppercase bg-primary`,
        "btn-primary-outline": `text-primary p-2 rounded-lg uppercase bg-white border border-primary`,
        "btn-secondary": `p-2 rounded-lg uppercase bg-secondary`,
        "btn-link": `p-3 rounded-lg`,
        "btn-link-text": `text-lg font-medium uppercase underline`,
      });
    }),
  ], // close plugins
}; // close module
