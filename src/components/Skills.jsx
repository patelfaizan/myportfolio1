import { skills } from '../data/content'
import { SectionHeading } from './SectionHeading'
import './Skills.css'

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <div className="shell">
        <SectionHeading id="skills" eyebrow="Skills" title="Tools I use" />

        <div className="skills">
          {skills.map((group) => (
            <div className="skills__group" key={group.group}>
              <h3 className="mono-label skills__name">{group.group}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item} className="skills__item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
