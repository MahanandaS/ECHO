/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'echo-dark': '#1a3a2a',
        'echo-green': '#2d5a47',
        'echo-light': '#e8e8e0',
        'echo-cream': '#f5f3f0',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'serif-text': ['Lora', 'Georgia', 'serif'],
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'wide': '0.08em',
      },
    },
  },
  plugins: [],
};
