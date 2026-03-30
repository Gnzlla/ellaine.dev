/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        alata: ["var(--font-alata)"],
        teachers: ["var(--font-teachers)"],
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide")],
};
