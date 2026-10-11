import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile, sections } from '../data/content'
import { ThemeToggle } from './ThemeToggle'
import './Navbar.css'

const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`

export function Navbar({ theme, onToggleTheme, activeId }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const panelRef = useRef(null)

  const navItems = sections.filter((s) => s.label && s.id !== 'contact')

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  // Lock body scroll and trap focus while the mobile panel is open.
  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll('a, button')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, closeMenu])

  return (
    <header className="navbar">
      <div className="navbar__inner shell">
        <a className="navbar__logo" href="#top">
          {profile.name}
        </a>

        <nav className="navbar__nav" aria-label="Sections">
          <ul className="navbar__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className="navbar__link"
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                className="navbar__link"
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>

        <div className="navbar__actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a className="navbar__cta" href="#contact">
            Contact
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="navbar__menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar__panel" id="mobile-menu" ref={panelRef}>
          <div className="navbar__panel-inner shell">
            <ul className="navbar__panel-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={closeMenu}>
                    <span className="navbar__panel-tick mono-label">{item.tick}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={resumeHref} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  <span className="navbar__panel-tick mono-label">PDF</span>
                  Résumé
                </a>
              </li>
              <li>
                <a href="#contact" onClick={closeMenu}>
                  <span className="navbar__panel-tick mono-label">CONTACT</span>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
