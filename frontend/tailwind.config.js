/** @type {import('tailwindcss').Config} */
export default {
 

  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 400: "#4a8cff", 500: "#1767ff" },
      },
    },
  },
  plugins: [],
};
