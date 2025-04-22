/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",   // <— add this if it isn’t there
  ],
  theme: { extend: {} },
  plugins: [],
};
