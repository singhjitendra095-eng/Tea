/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: '#2A5F3A',
        'forest-light': '#3D7A4F',
        'forest-dark': '#1E452B',
        earth: '#8B6F47',
        'earth-light': '#A68A5E',
        'earth-dark': '#6B5435',
        beige: '#F5F0E8',
        ivory: '#FFFFF0',
        cream: '#FFFDD0',
        gold: '#D4A843',
        'gold-light': '#E8C56D',
        'gold-dark': '#B89038',
        charcoal: '#333333',
        'charcoal-light': '#4A4A4A',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1440px',
      },
      spacing: {
        'section': '5rem',
        'section-sm': '3rem',
      },
    },
  },
  plugins: [],
}