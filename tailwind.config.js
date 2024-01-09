/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  important: true,
  content: [],
  theme: {
    extend: {
      colors: {
        color_1: '#fcffe6',
        color_2: '#f4ffb8',
        color_3: '#eaff8f',
        color_4: '#d3f261',
        color_5: '#bae637',
        color_6: '#a0d911',
        color_7: '#7cb305',
        color_8: '#5b8c00',
        color_9: '#3f6600',
        color_10:'#254000',
      },
    },
  },
  plugins: [],  
}
