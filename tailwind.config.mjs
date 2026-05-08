/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#0D0D12',
          'dark-2': '#111118',
          light: '#F5F5F7',
          footer: '#0A0A0F',
        },
        card: {
          'glass-bg': 'rgba(255,255,255,0.07)',
          'glass-border': 'rgba(255,255,255,0.12)',
          'light-bg': '#FFFFFF',
        },
        brand: {
          orange: '#FF6A00',
          'orange-light': '#FF9500',
        },
        accent: {
          green: '#22C55E',
          red: '#FF4444',
          purple: '#7C3AED',
        },
        muted: {
          DEFAULT: '#999999',
          dark: '#666666',
        },
        ink: '#1A1A2E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(180deg, #FF6A00 0%, #FF9500 100%)',
        'brand-gradient-h': 'linear-gradient(90deg, #FF6A00 0%, #FF9500 100%)',
      },
      boxShadow: {
        'brand-glow': '0 8px 24px rgba(255,106,0,0.5)',
        'brand-glow-lg': '0 12px 40px rgba(255,106,0,0.5)',
      },
      keyframes: {
        pulse_dot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'pulse-dot': 'pulse_dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
