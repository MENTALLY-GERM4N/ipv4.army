/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        default: {
			"color-scheme": "dark",
			"primary": "#070707",
			"secondary": "#090909",
			"accent": "#070707",
			"neutral": "#3c3836",
			"neutral-content": "#DEDEDE",
			"base-100": "#020202",
			"base-200": "#030303",
			"base-300": "#040404",
			"base-content": "#DEDEDE"
        },
      },
    ],
  },
};
