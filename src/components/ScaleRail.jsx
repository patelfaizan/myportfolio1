import { sections } from '../data/content'
import './ScaleRail.css'

/**
 * The signature element: a fixed result-legend rail.
 * The ramp fills from min (bottom) to max (top) as the page is read,
 * and every tick is a link to its section.
 */
export function ScaleRail({ activeId, progress }) {
  const ticks = [...sections].reverse() // max at the top, like a legend

  return (
    <nav className="rail" aria-label="Section progress">
      <span className="rail__cap mono-label" aria-hidden="true">
        Max
      </span>

      <div className="rail__body">
        <div className="rail__track" aria-hidden="true">
          <div className="rail__clip" style={{ height: `${progress * 100}%` }}>
            <div className="rail__ramp" />
          </div>
        </div>

        <ul className="rail__ticks">
          {ticks.map((section) => (
            <li key={section.id}>
              <a
                className="rail__tick"
                href={`#${section.id}`}
                aria-current={activeId === section.id ? 'true' : undefined}
              >
                <span className="rail__tick-line" aria-hidden="true" />
                <span className="rail__tick-label">{section.tick}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <span className="rail__cap mono-label" aria-hidden="true">
        Min
      </span>
    </nav>
  )
}
