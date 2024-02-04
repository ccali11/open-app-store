/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.css"
  ],
  theme: {
    extend: {
      colors: {
        primary_bg: '#2B2B2B',
        primary_white: '#FAFAFA'
      }
    },
  },
  plugins: [],
}