/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables toggling dark mode with a "dark" class on <html> or <body>
  content: [
    "./src/**/*.{html,ts,tsx,js,jsx}", // include TSX and JS variants for flexibility
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Vibrant Indigo
          hover: '#4338CA',   // Darker Indigo for hover
          focus: '#3730A3',   // Even darker for focus ring
          dark: '#A5B4FC',    // Light indigo in dark mode
        },
        secondary: {
          DEFAULT: '#F59E0B', // Warm Amber
          hover: '#D97706',   // Dark amber on hover
          focus: '#B45309',   // Focus amber
          dark: '#FBBF24',    // Light amber for dark mode
        },
        accent: {
          DEFAULT: '#10B981', // Fresh Green
          hover: '#059669',
          focus: '#047857',
          dark: '#6EE7B7',
        },
        light: {
          DEFAULT: '#F3F4F6', // Soft Gray (background)
          dark: '#1F2937',    // Dark background alternative
        },
        neutral: {
          DEFAULT: '#6B7280', // Muted Gray
          dark: '#9CA3AF',    // Lighter gray text in dark mode
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#111827',
        },
        text: {
          DEFAULT: '#1F2937',
          dark: '#F9FAFB',
        },
      },
      fontFamily: {
        heading: ['Tajawal', 'sans-serif'],
        body: ['Cairo', 'sans-serif'],
      },
      transitionDuration: {
        150: '150ms',
        300: '300ms',
        500: '500ms',
      },
      transitionTimingFunction: {
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'md-hover': '0 4px 10px rgba(0,0,0,0.15)',
        'focus-ring': '0 0 0 3px rgba(79, 70, 229, 0.5)', // Indigo focus ring
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus', 'dark', 'dark:hover', 'dark:focus'],
      textColor: ['hover', 'focus', 'dark', 'dark:hover', 'dark:focus'],
      boxShadow: ['focus', 'hover', 'dark'],
      ringWidth: ['focus', 'dark'],
      ringColor: ['focus', 'dark'],
    },
  },
  plugins: [] 
}
