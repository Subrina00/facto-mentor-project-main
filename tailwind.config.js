module.exports = {
  content: [
    "./app/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
      boxShadow:{
        shadow1:"0 0 14px 0 rgba(0, 0, 0, 0.03)"
      },
    },
    container: {
      center: true,
      screens: {
        "2xl": "1472px",
      },
    },
  },
  plugins: [],
};
