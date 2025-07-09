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
          50:  '#edf1f7',
          100: '#d6deeb',
          200: '#afbed7',
          300: '#899ec3',
          400: '#5f7aa8',
          500: '#082951',   // azul del logo
          600: '#062144',
          700: '#041933',
          800: '#031224',
          900: '#020b16',
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
