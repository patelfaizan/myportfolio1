import { useEffect, useState } from 'react'

/**
 * One IntersectionObserver watches every section and reports whichever is
 * closest to the top of the viewport. Used by the navbar and the scale rail.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return

    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top)
          else visible.delete(entry.target.id)
        })

        if (visible.size) {
          const nearest = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0]
          setActiveId(nearest[0])
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
