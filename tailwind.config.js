/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F7F7F4',
          secondary: '#FFFFFF',
          sidebar: '#F0F1ED',
          card: '#FFFFFF',
          subtle: '#F4F5F1',
        },
        text: {
          primary: '#252B29',
          secondary: '#747B76',
          muted: '#8E9690',
        },
        brand: {
          DEFAULT: '#536F67',
          hover: '#425952',
          light: '#EBF2EE',
          dark: '#354843',
          accent: '#87988B',
        },
        border: {
          DEFAULT: '#E7E9E4',
          subtle: '#EEF0EB',
          strong: '#D5D8D0',
        },
        status: {
          success: '#E8F0E9',
          successText: '#275E38',
          warning: '#F5EBDD',
          warningText: '#875317',
          danger: '#F4E9E6',
          dangerText: '#94372D',
          info: '#EAF0F4',
          infoText: '#235A75',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(37, 43, 41, 0.04), 0 1px 2px rgba(37, 43, 41, 0.02)',
        'card': '0 2px 8px rgba(37, 43, 41, 0.04), 0 1px 2px rgba(37, 43, 41, 0.02)',
        'modal': '0 20px 40px -15px rgba(37, 43, 41, 0.12), 0 0 1px 1px rgba(37, 43, 41, 0.05)',
        'popover': '0 10px 25px -5px rgba(37, 43, 41, 0.08), 0 0 1px 1px rgba(37, 43, 41, 0.04)',
      },
      borderRadius: {
        'card': '12px',
      }
    },
  },
  plugins: [],
}
