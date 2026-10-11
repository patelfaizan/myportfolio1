import { certifications } from '../data/content'
import { SectionHeading } from './SectionHeading'
import './Certifications.css'

export function Certifications() {
  return (
    <section className="section" id="certifications" aria-labelledby="certifications-heading">
      <div className="shell">
        <SectionHeading id="certifications" eyebrow="Certificates" title="Coursework and certification" />

        <ul className="certs">
          {certifications.map((cert) => (
            <li className="cert" key={cert.title}>
              <div className="cert__main">
                <h3 className="cert__title">{cert.title}</h3>
                <p className="cert__credential">{cert.credential}</p>
              </div>
              <div className="cert__meta">
                <span className="cert__issuer">{cert.issuer}</span>
                {cert.period && <span className="mono-label">{cert.period}</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
