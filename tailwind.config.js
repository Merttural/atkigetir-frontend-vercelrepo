/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1A365D',     // Ana Lacivert (yeni)
        accent: '#2563EB',      // Aksan mavi (güven/profesyonellik)
        secondary: '#EF4444',   // Kırmızı (enerji/spor)
        tertiary: '#F59E0B',    // Turuncu (dikkat/aksiyon)
        muted: '#F8FAFC',       // Arka Plan (yeni)
        success: '#22C55E',     // Vurgu Yeşili (yeni)
        footer: '#1E293B',      // Footer koyu gri
        // Yeni renkler - daha canlı tema
        sport: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',      // Ana spor kırmızı
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        energy: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',      // Ana turuncu
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}; 