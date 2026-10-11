import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

function readInitialTheme() {
  // index.html has already resolved and applied the theme before React mounts,
  // so the DOM attribute is the source of truth here.
  if (typeof document === 'undefined') return 'light'
  const applied = document.documentElement.getAttribute('data-theme')
  return applied === 'dark' ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage blocked — the theme still applies for this session */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#14181A' : '#DEE1DC')
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
