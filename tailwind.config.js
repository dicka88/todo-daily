module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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