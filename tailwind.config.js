/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'sage': '#667b68',
        'lightsage': '#a3b899',
        'richrose': '#783b5a',
        'lightrose': '#aa6a6a',
        'cream': '#f8d3c5',
        'lightcream': '#f8d7ca',
        'tahit': '#383139',
        'offwhite': '#fceee9',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    
  },
  plugins: [],
};
