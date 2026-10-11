import { useMemo } from 'react'
import { About } from './components/About'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Profile } from './components/Profile'
import { Projects } from './components/Projects'
import { ScaleRail } from './components/ScaleRail'
import { Skills } from './components/Skills'
import { sections } from './data/content'
import { useActiveSection } from './hooks/useActiveSection'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const sectionIds = useMemo(() => sections.map((section) => section.id), [])
  const activeId = useActiveSection(sectionIds)
  const progress = useScrollProgress()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar theme={theme} onToggleTheme={toggleTheme} activeId={activeId} />
      <ScaleRail activeId={activeId} progress={progress} />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <Profile />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
