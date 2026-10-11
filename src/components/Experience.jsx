import { experience } from '../data/content'
import { SectionHeading } from './SectionHeading'
import './Experience.css'

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <div className="shell">
        <SectionHeading id="experience" eyebrow="Experience" title="Where I've worked" />

        <ol className="exp">
          {experience.map((item) => (
            <li className="exp__item" key={`${item.org}-${item.period}`}>
              <span className="exp__node" aria-hidden="true" />
              <div className="exp__head">
                <h3 className="exp__role">{item.role}</h3>
                <span className="exp__period mono-label">{item.period}</span>
              </div>
              <p className="exp__org">
                {item.org} <span aria-hidden="true">·</span> {item.location}
              </p>
              {item.summary && <p className="exp__summary">{item.summary}</p>}
              {item.bullets && (
                <ul className="exp__bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
