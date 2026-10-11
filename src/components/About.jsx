import { about } from '../data/content'
import { SectionHeading } from './SectionHeading'
import './About.css'

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="shell">
        <SectionHeading id="about" eyebrow="About" title="What I work on" />
        <p className="about__text">
          <span className="about__lead">{about.lead}</span> {about.body}
        </p>
      </div>
    </section>
  )
}
