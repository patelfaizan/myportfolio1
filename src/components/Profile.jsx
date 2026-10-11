import { languages, strengths } from '../data/content'
import { SectionHeading } from './SectionHeading'
import './Profile.css'

export function Profile() {
  return (
    <section className="section" id="profile" aria-labelledby="profile-heading">
      <div className="shell">
        <SectionHeading id="profile" eyebrow="Profile" title="Strengths and languages" />

        <div className="profile">
          <div>
            <h3 className="mono-label profile__label">Strengths</h3>
            <ul className="profile__strengths">
              {strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mono-label profile__label">Languages</h3>
            <ul className="profile__languages">
              {languages.map((language) => (
                <li key={language.name}>
                  <span className="profile__lang-name">{language.name}</span>
                  <span className="mono-label">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
