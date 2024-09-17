/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          oil_direct_black: "#2A2A2A",
          primary_green: "#0CB5BA",
          secondary_green: "#038D92",
          green_3: "#4CC2CB",
          green_4: "#219653",
          green_5: "#047376",
          green_6: "#2CA8B1",
          green_light_1: "#0CB5BA0A",
          primary_red: "#E3616E",
          tail_grids: "#637381",
          dark: "#2A2A2A",
          dark_2: "#111928",
          primary_light: "#E7FEFF",
          mosque: "#006063",
          light_2: "#FCFEFF",
          light_3: "#FEFCFC",
          light_4: "#AFAFAF",
          gray_1: "#E6E6E6",
          gray_2: "#E7E7E7",
          gray_3: "#E0E0E0",
          gray_4: "#9B9B9B",
          gray_5: "#EDEDF3",
          gray_6: "#C0C0C0",
          gray_7: "#F3F3F3",
          gray_8: "#B2B2BF",
          gray_9: "#FBFBFD",
          red_1: "#EB5757",
          red_2: "#C21A88",
          midnight: "#212B36",
          dark_1: "#3A3A3C",
        },
      },
      boxShadow: {
        gray: "0px 5px 25px 0px #86868666",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
