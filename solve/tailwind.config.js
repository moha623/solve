/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class', 
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
                    colors: {
                        primary: '#2A9D8F',
                        secondary: '#E76F51',
                        accent: '#264653',
                        light: '#F8F9FA',
                        neutral: '#E9C46A'
                    },
                    fontFamily: {
                        'heading': ['"Tajawal"', 'sans-serif'],
                        'body': ['"Cairo"', 'sans-serif']
                    }
    },
  },
  plugins: [],
}