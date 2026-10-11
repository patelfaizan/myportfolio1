import './SectionHeading.css'

export function SectionHeading({ id, eyebrow, title }) {
  return (
    <header className="section-heading">
      <span className="mono-label section-heading__eyebrow">{eyebrow}</span>
      <h2 id={`${id}-heading`} className="section-heading__title">
        {title}
      </h2>
    </header>
  )
}
