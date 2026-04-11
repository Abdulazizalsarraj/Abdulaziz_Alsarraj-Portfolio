import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a0a0a',
          dark: '#0a0a0a',
        },
        secondary: {
          DEFAULT: '#111111',
          dark: '#111111',
        },
        accent: {
          DEFAULT: '#00d3bd',
          dark: '#00d3bd',
        },
        text: {
          DEFAULT: '#e5e7eb',
          dark: '#e5e7eb',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'monospace']
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glass': '0 4px 16px 0 rgba(0, 211, 189, 0.08)',
        'glass-lg': '0 8px 32px 0 rgba(0, 211, 189, 0.15)',
        'glass-xl': '0 16px 64px 0 rgba(0, 211, 189, 0.20)',
        'teal-glow': '0 0 40px rgba(0, 211, 189, 0.3)',
        'teal-glow-sm': '0 0 20px rgba(0, 211, 189, 0.2)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ],
};
