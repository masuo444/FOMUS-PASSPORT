/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Noto Serif JP'", "serif"],
        sans: ["'Inter'", "sans-serif"],
        arabic: ["'Noto Sans Arabic'", "sans-serif"],
        typewriter: ["'Courier Prime'", "monospace"],
        pixel: ["'Press Start 2P'", "cursive"],
      },
    },
  },
  plugins: [],
}
