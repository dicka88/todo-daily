module.exports = {
  mode: "jit",
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        primary: "#FF4F5A",
        primaryDark: "#E22B37",
        gray: "#6B6B6B",
        graySoft: "#e8e8e8",
        grayLight: "#F9F9F9"
      }
    }
  },
  variants: {},
  plugins: [],
};