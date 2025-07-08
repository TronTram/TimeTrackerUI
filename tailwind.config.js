/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary-blue': '#2563EB',
        'primary-slate': '#1E293B',
        
        // Secondary Colors
        'secondary-blue-light': '#60A5FA',
        'secondary-blue-pale': '#EFF6FF',
        'secondary-slate-light': '#64748B',
        
        // Accent Colors
        'accent-green': '#10B981',
        'accent-orange': '#F59E0B',
        'accent-purple': '#8B5CF6',
        'accent-coral': '#EF4444',
        
        // Functional Colors
        'success-green': '#059669',
        'warning-amber': '#D97706',
        'error-red': '#DC2626',
        'info-blue': '#0284C7',
        
        // Background Colors
        'background-pure': '#FFFFFF',
        'background-soft': '#F8FAFC',
        'background-muted': '#F1F5F9',
        'background-dark': '#0F172A',
        
        // Productivity Status Colors
        'focus-red': '#EF4444',
        'break-green': '#22C55E',
        'long-break-blue': '#3B82F6',
        'complete-gray': '#6B7280',
        
        // Dark Mode Variants
        'dark-primary': '#0F172A',
        'dark-surface': '#1E293B',
        'dark-elevated': '#334155',
        'dark-primary-text': '#F1F5F9',
        'dark-secondary-text': '#94A3B8',
        'dark-muted-text': '#64748B',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'timer-display': ['48px', '56px'],
        'timer-small': ['24px', '32px'],
      },
      letterSpacing: {
        'timer': '-1px',
        'timer-small': '-0.5px',
      },
      animation: {
        'pulse-gentle': 'pulse 2s infinite',
        'bounce-celebration': 'bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'shake': 'shake 0.2s ease-in-out 3',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
      },
      boxShadow: {
        'card': '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        'session': '0px 2px 4px rgba(0, 0, 0, 0.1)',
        'stats': '0px 4px 6px rgba(0, 0, 0, 0.1)',
        'button': '0px 1px 2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
