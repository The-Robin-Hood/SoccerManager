/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "player-overlay":
          "radial-gradient(circle, rgba(34, 34, 34, 0.00) 0%, rgba(34, 34, 34, 0.38) 60.94%, #222 100%)",
      },
      fontSize: {
        xxs: "10px",
      },
      colors: {
        primary: {
          DEFAULT: "#FEA013",
          foreground: "#CBCBCB",
        },
        secondary: "#BA4A0C",
        error: "#D23131",
        background: "transparent",
        outline: "#494949",
        accent: {
          DEFAULT: "#F1F5F9",
          foreground: "#0f172a",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
