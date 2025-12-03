/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Slate 900
        secondary: "#1E293B", // Slate 800
        accent: "#EAB308", // Amber 500
        success: "#10B981", // Emerald 500
        text: "#F3F4F6", // Gray 100
        muted: "#9CA3AF", // Gray 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

