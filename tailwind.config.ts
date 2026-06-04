import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', '"Segoe UI"', 'sans-serif']
      },
      boxShadow: {
        card: '0 10px 25px -15px rgba(0, 0, 0, 0.3)'
      }
    }
  },
  darkMode: 'class',
  plugins: []
};

export default config;