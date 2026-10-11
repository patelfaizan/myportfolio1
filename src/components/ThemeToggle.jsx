import { Moon, Sun } from 'lucide-react'
import './ThemeToggle.css'

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Light theme' : 'Dark theme'}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__icon theme-toggle__icon--sun">
          <Sun size={12} strokeWidth={2} />
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--moon">
          <Moon size={12} strokeWidth={2} />
        </span>
        <span className="theme-toggle__knob" />
      </span>
    </button>
  )
}
