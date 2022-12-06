module.exports = {
  content: [
    "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
      fontFamily: {
        big: "'Righteous', cursive",
        nice: "'Nunito', sans-serif"
      },
      animation: {
        'spin': 'spin 3s linear infinite',
        'bounce-x': 'bounceHorizontal 2s ease-in-out infinite'
      },
      keyframes: {
        bounceHorizontal: {
          '0%, 100%': { transform: 'translateX(25%)' },
          '50%': { transform: 'translateX(0)' }
        }
      }
    },
  },
  plugins: [],
}
