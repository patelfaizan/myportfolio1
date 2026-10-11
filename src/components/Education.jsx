import { education } from '../data/content'
import { SectionHeading } from './SectionHeading'
import './Education.css'

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-heading">
      <div className="shell">
        <SectionHeading id="education" eyebrow="Education" title="Academic record" />

        <ul className="edu">
          {education.map((item) => (
            <li className="edu__row" key={item.degree}>
              <div>
                <h3 className="edu__degree">{item.degree}</h3>
                <p className="edu__org">
                  {item.org} <span aria-hidden="true">·</span> {item.location}
                </p>
              </div>
              <div className="edu__meta">
                <span className="mono-label">{item.period}</span>
                <span className="edu__cgpa">{item.cgpa}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
