/** @type {import('tailwindcss').Config} */
import themes from "daisyui/src/theming/themes";

export default {
  plugins: [require("daisyui")],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', "./node_modules/senzui/**/*.{cjs,mjs}"],
  daisyui: {
    themes: [{
      dark: {
        ...themes["dark"],
        "primary": "#222222",
        "base-100": "#090909",
        "base-200": "#101010",
        "base-300": "#090909"
      }
    }]
  }
};
