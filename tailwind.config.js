/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#259df4",
        "background-light": "#70C5CF",
        "background-dark": "#112116",
        "flappy-sky": "#70c5ce",
        "flappy-sky-light": "#a3e6ef",
        "flappy-sky-dark": "#4a9098",
        "flappy-pipe": "#54ac42",
        "flappy-pipe-dark": "#367d2a",
        "flappy-bird": "#f6e05e",
        "flappy-bird-wing": "#ffdb21",
        "flappy-bird-beak": "#f2994a",
        "flappy-ground-light": "#ded895",
        "flappy-ground-dark": "#b9a35a",
        "flappy-outline": "#000000",
        "game-green": "#4ADE80",
        "game-orange": "#FB923C",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "Spline Sans", "Noto Sans", "sans-serif"],
        "game": ["'Press Start 2P'", "cursive"]
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scroll-bg': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 0' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'scroll-bg': 'scroll-bg 20s linear infinite',
      }
    },
  },
  plugins: [],
};
