/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'pulse-zoom': {
          '0%, 100%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
          '50%': { 
            transform: 'scale(1.15)', // The Zoom in
            opacity: '0.6'             // The Opacity drop
          },
        },
      },
      animation: {
        'pulse-zoom': 'pulse-zoom 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};