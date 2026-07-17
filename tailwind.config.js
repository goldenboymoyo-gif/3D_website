/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: 'var(--color-base)',
        surface: 'var(--color-surface)',
        crimson: '#DC2626',
        'crimson-dim': '#7f1d1d',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'var(--hero-bg)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(220,38,38,0.35)',
      },
    },
  },
  plugins: [],
};
