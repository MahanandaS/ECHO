/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'echo-bg': '#000000',
        'echo-secondary': '#111111',
        'echo-elevated': '#161616',
        'echo-heading': '#F5F5F5',
        'echo-body': '#B3B3B3',
        'echo-dark': '#000000',
        'echo-green': '#161616',
        'echo-light': '#F5F5F5',
        'echo-cream': '#F5F5F5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '42rem',
        editorial: '52rem',
      },
      letterSpacing: {
        wide: '0.08em',
      },
    },
  },
  plugins: [],
};
