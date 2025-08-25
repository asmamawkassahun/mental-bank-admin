module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        boxShadow: {
        bottom: '0 4px 6px -1px rgba(0,0,0,0.1)',
      },
       fontFamily: {
        Geist: ['"Geist"', 'sans-serif'], // key = Geist
      },
    },
  },
  plugins: [],
};