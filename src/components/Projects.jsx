import { projects } from '../data/content'
import { SectionHeading } from './SectionHeading'
import './Projects.css'

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <div className="shell">
        <SectionHeading id="projects" eyebrow="Projects" title="Selected work" />

        <div className="projects">
          {projects.map((project) => (
            <article className="project" key={project.id}>
              <header className="project__strip">
                <span className="mono-label project__domain">{project.domain}</span>
                <span className="mono-label">{project.year}</span>
              </header>

              <div className="project__body">
                <h3 className="project__title">{project.title}</h3>

                <ul className="project__bullets">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <ul className="project__tools">
                  {project.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>

                <p className="project__period mono-label">{project.period}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
