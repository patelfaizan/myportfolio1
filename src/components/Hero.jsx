import { ArrowDown, ExternalLink } from 'lucide-react'
import portrait from '../assets/portrait.jpg'
import { profile, specStrip } from '../data/content'
import './Hero.css'

const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="shell hero__inner">
        <div className="hero__intro">
          <p className="mono-label hero__eyebrow">
            <span className="hero__status-dot" aria-hidden="true" />
            {profile.status} · {profile.locationShort}
          </p>

          <h1 className="hero__name">
            {profile.nameLines.map((line) => (
              <span key={line} className="hero__name-line">
                {line}
              </span>
            ))}
          </h1>

          <p className="hero__title">
            M.Tech, {profile.specialisation}
          </p>
          <p className="hero__disciplines mono-label">{profile.disciplines}</p>

          <div className="hero__actions">
            <a className="hero__button hero__button--primary" href="#contact">
              Get in touch
              <ArrowDown size={15} strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              className="hero__button hero__button--ghost"
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
            >
              Résumé
              <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>

        <figure className="hero__portrait">
          <div className="hero__frame">
            <img
              src={portrait}
              alt={`${profile.name}, mechanical engineer`}
              width="780"
              height="1000"
              fetchPriority="high"
            />
          </div>

          {/* Dimension callouts, drawn the way a part would be annotated. Static by design. */}
          <svg
            className="hero__dim hero__dim--v"
            viewBox="0 0 34 200"
            preserveAspectRatio="none"
            vectorEffect="non-scaling-stroke"
            aria-hidden="true"
          >
            <line x1="17" y1="6" x2="17" y2="194" />
            <polyline points="12,12 17,4 22,12" />
            <polyline points="12,188 17,196 22,188" />
          </svg>
          <span className="hero__dim-label hero__dim-label--v">1000</span>

          <svg
            className="hero__dim hero__dim--h"
            viewBox="0 0 200 34"
            preserveAspectRatio="none"
            vectorEffect="non-scaling-stroke"
            aria-hidden="true"
          >
            <line x1="6" y1="17" x2="194" y2="17" />
            <polyline points="12,12 4,17 12,22" />
            <polyline points="188,12 196,17 188,22" />
          </svg>
          <span className="hero__dim-label hero__dim-label--h">780</span>
        </figure>
      </div>

      <div className="shell">
        <dl className="hero__spec">
          {specStrip.map((item) => (
            <div key={item.label} className="hero__spec-cell">
              <dt className="mono-label">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
