/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          yellow: '#FFD93D',
          purple: '#A78BFA',
          blue: '#60A5FA',
          green: '#6EE7B7',
          pink: '#FF7A90',
          orange: '#FFB86B',
          black: '#111111',
          bg: '#FFFDF5'
        },
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        slate: {
          850: '#111827',
          950: '#0b0f19'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neo-sm': '3px 3px 0px #111111',
        'neo-md': '5px 5px 0px #111111',
        'neo-lg': '8px 8px 0px #111111',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
