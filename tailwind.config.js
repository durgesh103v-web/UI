/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#071011',
        dark: '#F7F2DF',
        accent: '#FFB51B',
        muted: '#BBB4A2',
        border: '#223135',
      },
    },
  },
  plugins: [],
};
