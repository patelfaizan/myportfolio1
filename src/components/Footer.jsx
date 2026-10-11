import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content'
import './Footer.css'

const year = new Date().getFullYear()

/**
 * Structured as a drawing title block — a grid of labelled data cells.
 * Deliberately not a second navbar: it repeats no section links.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__block">
          <div className="footer__cell">
            <span className="mono-label">Drawn by</span>
            <span className="footer__value">P. M. Faizan</span>
          </div>
          <div className="footer__cell">
            <span className="mono-label">Location</span>
            <span className="footer__value">{profile.locationShort}</span>
          </div>
          <div className="footer__cell">
            <span className="mono-label">Revision</span>
            <span className="footer__value">v1 · {year}</span>
          </div>
          <div className="footer__cell footer__cell--links">
            <span className="mono-label">Links</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>

        <div className="footer__base">
          <span className="mono-label">© {year} {profile.name}</span>
          <a className="footer__top" href="#top">
            Back to top <ArrowUp size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
