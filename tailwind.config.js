/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        Lato : ['Lato']
      },
      colors: {
        morado: "#221848", 
        lavanda: "#9FA4D9",
        rosa: "#FFC6F3", 
        amarillo: "#FBD5CC",
        amarillooscuro: "#E3B1A3",
        card: "#6062D6",
        customGray: {
          light: "#D1D5DB",
          DEFAULT: "#6B7280",
          dark: "#374151",
        },
      },
      fontSize: {
        'xxs': '4rem', 
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};