/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#028fdf',
      secondaryDark: '#9eabcb',
      white: '#FFFFFF',
      primaryColorLight: '#D2D9E7',
      btnBgColor: '#f5f5f5',
      tableBoarder: '#D2D9E7',
      tableHeaderBg: '#EAEDEF'
    },
    extend: {},
  },
  plugins: [],
}