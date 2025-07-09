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
           50: '#A4D4F6',
          100: '#84C3F3',
          200: '#439EEC',
          300: '#0F579B',
          400: '#0E4E92',
          500: '#082951',
          600: '#061E3E',
          700: '#04142C',
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
