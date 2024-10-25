/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#DA4933",
        "primary-bg": "#FFFEFA",
        "primary-dark": "#1f1f1f",
        "primary-grey": "#e5e5e5",
        "secondary-grey": "#c5c5c5",
        "terciary-grey": "#626262",
      },
      fontFamily: {
        domine: ["Domine", "serif"],
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
