/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class', 
   content: [
     "./src/**/*.{html,ts}",
   ],
   theme: {
     extend: {
                    colors: {
                        primary: '#4F46E5',    // A vibrant indigo for trust and professionalism
                        secondary: '#F59E0B',  // Warm amber highlights for call to actions
                        accent: '#10B981',     // Fresh green for accents and highlights
                        light: '#F3F4F6',      // Soft gray for backgrounds and whitespace
                        neutral: '#6B7280'     // Muted gray for neutral elements, text and borders
                    },
                    fontFamily: {
                        'heading': ['"Tajawal"', 'sans-serif'],
                        'body': ['"Cairo"', 'sans-serif']
                    }
     },
   },
   plugins: [],
}
