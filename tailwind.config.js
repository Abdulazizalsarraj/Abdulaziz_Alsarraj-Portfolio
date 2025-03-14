module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F8FAFC', 
          dark: '#0F172A',   
        },
        secondary: {
          DEFAULT: '#E2E8F0',
          dark: '#1E293B',
        },
        accent: {
          DEFAULT: '#4F46E5',
          dark: '#7C3AED',    
        },
        text: {
          DEFAULT: '#1E293B',
          dark: '#F8FAFC',    
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      boxShadow: {
        'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ],
};




