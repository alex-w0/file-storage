/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      green: "#a1c861",
      white: "#fff",
      red: "#ff5252",
      gray: "#5d5c5c",
      "gray-dark": "#333333",
      current: "currentColor",
    },
  },
};
