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
        primary: '#2563eb',     // blue-600
        secondary: '#f59e42',   // orange-400
        muted: '#f8fafc',       // slate-50
        success: '#22c55e',     // green-500
        footer: '#1e293b',      // slate-800
      },
    },
  },
  plugins: [],
}; 