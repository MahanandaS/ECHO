/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'echo-dark': '#0f0f0f',
        'echo-green': '#1a1a1a',
        'echo-light': '#ffffff',
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
