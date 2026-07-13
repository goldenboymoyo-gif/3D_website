/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#0A0A0A',
        surface: '#111827',
        crimson: '#DC2626',
        'crimson-dim': '#7f1d1d',
        ink: '#FFFFFF',
        muted: '#9CA3AF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.16), transparent), linear-gradient(180deg, #0A0A0A 0%, #111827 60%, #0A0A0A 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(220,38,38,0.35)',
      },
    },
  },
  plugins: [],
};
