/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      /* ──────────────────  PALETA DE COLOR DE MARCA  ────────────────── */
      colors: {
        /* Escala del AZUL corporativo (#082951).
           500 es el color exacto del logo; los demás son tonos aproximados
           generados para tener variaciones de hover, backgrounds, etc. */
        brand: {
          50: '#2790EA',
          100: '#1785E6',
          200: '#136CC0',
          300: '#0F549B',
          400: '#0C3E76',
          500: '#082951', //azul original del logo
          600: '#061E3E',
          700: '#04152C',
          800: '#020B19',
          900: '#010307',
          950: '#000000',
        },

        /* Gris corporativo de apoyo */
        'brand-gray': '#BDC7D3',

        /* Blanco corporativo (opcional, pero así lo tenés nombrado) */
        'brand-white': '#FFFFFF',
      },

      /* ──────────────────  ANIMACIONES PERSONALIZADAS  ────────────────── */
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
