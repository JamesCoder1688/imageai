import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gtavi': {
          'dark': '#1a0b2e',
          'purple': '#7c2d92',
          'pink': '#e91e63',
          'miami-blue': '#06b6d4',
          'gold': '#ffd700',
          'sunset': '#ff6b35',
          'white': '#ffffff',
        }
      },
      backgroundImage: {
        'gradient-gtavi': 'linear-gradient(135deg, #1a0b2e 0%, #7c2d92 50%, #e91e63 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'ripple': 'ripple 3s ease-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        ripple: {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.3',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;