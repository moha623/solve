/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Strong Blue
          hover: '#1E3A8A',   // Darker Blue for hover
          focus: '#1E3A8A',
          dark: '#93C5FD',    // Bright Light Blue for dark mode
        },
        secondary: {
          DEFAULT: '#EF4444', // Vibrant Red (energy, urgency)
          hover: '#DC2626',   // Dark Red hover
          focus: '#B91C1C',   // Focus Red
          dark: '#FCA5A5',    // Soft Red for dark mode
        },
        accent: {
          DEFAULT: '#10B981', // Emerald Green - trust & eco
          hover: '#059669',
          focus: '#047857',
          dark: '#6EE7B7',
        },
        background: {
          DEFAULT: '#F9FAFB', // Soft off-white for clean look
          dark: '#111827',    // Dark background
        },
        neutral: {
          DEFAULT: '#374151', // Dark Gray text for readability
          dark: '#D1D5DB',    // Light Gray text dark mode
        },
        light: {
          DEFAULT: '#E5E7EB', // Light Gray backgrounds, cards, borders
          dark: '#1F2937',    // Dark mode light bg alternative
        },
        warning: {
          DEFAULT: '#FBBF24', // Warm Amber for alerts
          hover: '#F59E0B',
          focus: '#B45309',
          dark: '#FCD34D',
        },
        info: {
          DEFAULT: '#3B82F6', // Bright Blue info color
          hover: '#2563EB',
          focus: '#1D4ED8',
          dark: '#60A5FA',
        },
        success: {
          DEFAULT: '#22C55E', // Bright Green success color
          hover: '#16A34A',
          focus: '#15803D',
          dark: '#4ADE80',
        }
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
        'focus-ring': '0 0 0 3px rgba(30, 64, 175, 0.5)', // Blue focus ring
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
  plugins: [],
};
