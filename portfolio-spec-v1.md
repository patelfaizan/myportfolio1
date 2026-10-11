# Portfolio Website — Specification Document

**Project:** `myportfolio_v1`
**Owner:** Patel Mohammed Faizan
**Repository:** https://github.com/patelfaizan/myportfolio_v1
**Development:** Local machine → GitHub → GitHub Pages
**Document version:** v1.0 (draft for review)
**Date:** 14 August 2026

---

## How to read this document

This document is the single source of truth for the project. It is written so that someone
who has never seen the project can read it top to bottom and understand what is being built,
why, and how. It has six parts:

| Part | What it answers |
|---|---|
| 0. Decisions Log | What was asked, what was decided, what is still open |
| 1. PRD | *What* we are building and *for whom* |
| 2. TRD | *With what* — stack, structure, data, dependencies |
| 3. App Flow | *How it behaves* — navigation, states, form lifecycle |
| 4. UI/UX | *How it looks* — palette, type, layout, section-by-section design |
| 5. Implementation | *How it gets built* — phased plan, commands, deployment |
| Appendix A | Final locked content (every text string on the site) |

Nothing gets coded until this document is approved.

---

# PART 0 — Decisions Log

## 0.1 Gaps raised and resolved

| # | Gap identified | Resolution (locked) |
|---|---|---|
| 1 | M.Tech had an ambiguous date (`12/2024`) | **M.Tech: Dec 2024 — Aug 2026.** NPTEL courses have **no fixed duration** — date fields are placeholders until specified |
| 2 | Headshot was a stock placeholder URL | Image referenced by **relative path**, bundled with the app (`src/assets/`), never a CDN link |
| 3 | No LinkedIn / GitHub links | **LinkedIn:** https://www.linkedin.com/in/patelfaizan · **GitHub:** https://github.com/patelfaizan |
| 4 | EV project and Fire Protection project dates overlapped | **Intentional — both were worked on simultaneously.** Dates stay as-is |
| 5 | No project diagrams or images | **No diagrams for now.** Project cards are text-only. Layout will leave a slot that can accept images later without a rewrite |
| 6 | NPTEL percentages (64% / 78%) invited comparison | **Percentages removed.** Only the fact of completion is shown |
| 7 | Old CSS had conflicting classes | **Entire design and CSS rebuilt from scratch.** No code carried over from the sketch — only the content |

## 0.2 Hard constraints — things the design must NOT do

These are treated as build-blocking rules. Every review pass checks against this list.

| # | Prohibited | How this build complies |
|---|---|---|
| 1 | Huge centred heading with common AI typography | Hero is **left-aligned, two-column**. No centred hero headline anywhere |
| 2 | Purple gradients / shades of purple | Palette contains **zero purple**. No gradient is used as a background fill |
| 3 | Random grids and boxy typography | Every grid column count is derived from the data it holds (e.g. 4 skill groups → 4 columns). No decorative boxes |
| 4 | Icon-in-a-container + heading + subheading pattern | **No icon cards anywhere.** Icons appear only inside interactive controls (theme toggle, social links, form button) |
| 5 | Animated non-clickable elements | Motion is allowed **only** on: links, buttons, nav items, theme toggle, form fields, and the scroll-progress rail (which is clickable). Static content does not animate |
| 6 | Footer that mirrors the navbar | Footer is a **drawing title-block** — a bordered data table of revision, location, contact and links. Structurally unlike the navbar |
| 7 | Logo font same as site font | Logo uses **Archivo (expanded width axis)**; body text uses **IBM Plex Sans**. Different families |
| 8 | Cyberpunk typography / gradient backgrounds | No neon, no glow, no monospace display type, no gradient backgrounds. Surfaces are flat colour |

## 0.3 Open items (need your input, not blocking the design)

| Item | Needed before |
|---|---|
| NPTEL course dates / durations — what should be displayed | Content freeze |
| Portrait photo file (JPG/PNG, portrait orientation, min 800×1000px) | Hero build |
| Résumé PDF file | Nav "Résumé" link |
| Whether the site is served at a custom domain or at `/myportfolio_v1/` | Deployment config |
| Web3Forms access key (free, from web3forms.com) | Contact form testing |

---

# PART 1 — Product Requirements Document (PRD)

## 1.1 Problem statement

A recent M.Tech (Machine Design) graduate needs a professional online presence that recruiters,
hiring managers and professors can open in one click and read in under two minutes. A PDF
résumé is not shareable as a link, is not mobile-friendly, and cannot show personality.
The current asset is a rough JSX sketch — not a real, deployed, maintainable website.

## 1.2 Goal

Ship a single-page, dual-theme, fully responsive React portfolio that:

- Communicates a specific engineering identity — **CAE / FEA / CAD / simulation**, not generic "engineer"
- Reads as designed by a person with a point of view, not assembled from a template
- Lets a visitor contact the owner without leaving the page
- Is easy for the owner to update (all content in one data file, no HTML editing)

## 1.3 Target audience

| Audience | What they want | What the site gives them |
|---|---|---|
| Recruiters / HR | Fast verification: degree, skills, availability | Hero spec strip (discipline, focus, tools, status) visible without scrolling |
| Hiring engineers / design managers | Evidence of real analysis work | Project section with method-level bullets and tooling tags |
| Professors / research contacts | Academic record, certifications | Education and Certifications sections |
| Peers / network | Something worth sharing | A memorable, distinctive visual identity |

## 1.4 Scope

### In scope (v1)

- Single-page site, anchor-based navigation
- Light and dark themes with an instant toggle, choice remembered between visits
- Ten content regions: Hero, About, Experience, Projects, Skills, Certifications, Education, Strengths & Languages, Contact, Footer
- Working contact form (Name, Email, Message — all required) with client-side validation, submitting via Web3Forms
- Résumé PDF download
- Responsive: 360px → 1920px
- Accessible: keyboard navigable, visible focus rings, WCAG AA contrast, `prefers-reduced-motion` respected
- Deployed to GitHub Pages from the `myportfolio_v1` repository

### Out of scope (v1)

- Blog, CMS, or database
- Project detail pages / routing
- Project images, renders, or FEA plots (deferred by decision #5)
- Analytics, cookie banner
- Multi-language support
- Server-side rendering

## 1.5 Success criteria

| Criterion | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| First Contentful Paint (mid-range mobile) | < 1.5s |
| Total JS bundle (gzipped) | < 120 kB |
| Contact form delivery | Message reaches Patelfaizan0602@gmail.com within 60s |
| Theme switch | No flash of wrong theme on load; instant on toggle |
| Content update effort | Adding a project = editing one array in one file |

## 1.6 Non-goals

The site is not trying to be an interactive experience, a 3D showcase, or a demonstration of
web-development skill. It is a **credential document with a designed identity**. Restraint is
the point — an over-animated site would misrepresent the discipline.

---

# PART 2 — Technical Requirements Document (TRD)

## 2.1 Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 18** | Requested. Component reuse across repeated card types |
| Build tool | **Vite 5** | Fast dev server, tiny production output, first-class GitHub Pages support via `base` |
| Language | **JavaScript (JSX)** | No TypeScript — keeps the barrier low for future self-maintenance |
| Styling | **Plain CSS with custom properties**, one stylesheet per component | Theming needs runtime-swappable variables. Tailwind is deliberately avoided: the brief prohibits templated/boxy output, and utility classes make bespoke type scales awkward |
| Icons | **lucide-react** (tree-shaken, ~4 icons only) | Sun/moon, arrow, mail, external-link. Used only inside interactive controls |
| Fonts | Google Fonts — Archivo, IBM Plex Sans, IBM Plex Mono | Self-hosted via `@fontsource` to avoid render-blocking third-party requests |
| Form backend | **Web3Forms** | Requested. No server needed; free tier is sufficient |
| Scroll spy | **IntersectionObserver** (native) | No library. Zero bundle cost |
| Hosting | **GitHub Pages** via GitHub Actions | Requested repo |

**No jQuery, no Bootstrap, no animation library.** Motion is CSS transitions only.

## 2.2 Project structure

```
myportfolio_v1/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Build + publish to GitHub Pages
├── public/
│   ├── favicon.svg
│   └── resume.pdf                # Downloaded by the nav "Résumé" link
├── src/
│   ├── assets/
│   │   └── portrait.jpg          # Relative-path image, bundled by Vite
│   ├── data/
│   │   └── content.js            # ALL site content lives here — single edit point
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── ThemeToggle.jsx / .css
│   │   ├── ScaleRail.jsx / .css  # Signature element (see 4.6)
│   │   ├── Hero.jsx / .css
│   │   ├── About.jsx / .css
│   │   ├── Experience.jsx / .css
│   │   ├── Projects.jsx / .css
│   │   ├── Skills.jsx / .css
│   │   ├── Certifications.jsx / .css
│   │   ├── Education.jsx / .css
│   │   ├── Profile.jsx / .css    # Strengths & Languages
│   │   ├── Contact.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   └── SectionHeading.jsx / .css
│   ├── hooks/
│   │   ├── useTheme.js           # Theme state + localStorage + system preference
│   │   └── useActiveSection.js   # IntersectionObserver scroll spy
│   ├── styles/
│   │   ├── tokens.css            # Colour, type, spacing variables (both themes)
│   │   ├── base.css              # Reset, typography defaults, focus styles
│   │   └── utilities.css         # A handful of shared layout helpers
│   ├── App.jsx
│   └── main.jsx
├── .env.local                    # VITE_WEB3FORMS_KEY=...   (gitignored)
├── .env.example                  # Committed, no real key
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 2.3 Content data model

Every piece of text lives in `src/data/content.js` and is exported as named constants.
Components receive data as props or import directly — they never hardcode strings.

```js
export const profile = {
  name: "Patel Mohammed Faizan",
  title: "Mechanical Engineering Postgraduate",
  specialisation: "Machine Design",
  location: "Bengaluru, Karnataka, India",
  email: "Patelfaizan0602@gmail.com",
  phone: "+91 63661 71427",
  phoneHref: "+916366171427",
  linkedin: "https://www.linkedin.com/in/patelfaizan",
  github: "https://github.com/patelfaizan",
  status: "Open to work",
};

export const specStrip = [
  { label: "Discipline", value: "Mechanical Engineering" },
  { label: "Focus",      value: "Machine Design" },
  { label: "Tools",      value: "ANSYS / Abaqus / SolidWorks" },
  { label: "Status",     value: "Open to work" },
];

export const experience = [
  { role, org, location, start, end, summary?, bullets? }, ...
];

export const projects = [
  { id, title, discipline, period, bullets: [], tools: [] }, ...
];

export const achievements    = [{ title, text }, ...];
export const skills          = [{ group, items: [] }, ...];
export const certifications  = [{ title, issuer, credential, period }, ...];
export const education       = [{ degree, org, location, period, cgpa }, ...];
export const strengths       = [string, ...];
export const languages       = [{ name, level }, ...];
export const sections        = [{ id, label, navLabel }, ...];   // drives nav + rail
```

**Why this matters:** the navbar, the scroll rail, and the scroll-spy all read from the same
`sections` array. Adding a section is a one-line change; it cannot fall out of sync.

## 2.4 Theming architecture

```
<html data-theme="light">   ←  attribute swapped by useTheme()
```

- All colours are CSS custom properties defined twice in `tokens.css`:
  `:root[data-theme="light"] { ... }` and `:root[data-theme="dark"] { ... }`
- Components reference `var(--surface)` etc. and never a literal hex value
- Resolution order on load: `localStorage.theme` → `prefers-color-scheme` → light
- **Anti-flash:** a small inline script in `index.html` `<head>` sets `data-theme` before
  React mounts, so there is no white flash for dark-theme visitors
- The toggle itself transitions colour over 180ms; the page does not cross-fade (a full-page
  colour transition looks sluggish and draws attention to non-content)

## 2.5 Contact form — technical requirements

| Requirement | Detail |
|---|---|
| Fields | `name` (text, required, 2–60 chars) · `email` (required, RFC-ish regex) · `message` (required, 10–1500 chars) |
| Validation timing | On blur for the first pass, then live on change once a field has been touched. Full re-validation on submit |
| Validation method | Custom JS validators in `Contact.jsx`. `noValidate` on the `<form>` so browser tooltips don't fight the custom UI |
| Error display | Inline text below the field, `aria-invalid` + `aria-describedby` on the input |
| Spam protection | Web3Forms honeypot field `botcheck` (visually hidden, `tabIndex={-1}`, `aria-hidden`) |
| Endpoint | `POST https://api.web3forms.com/submit`, JSON body |
| Access key | `import.meta.env.VITE_WEB3FORMS_KEY` — stored in `.env.local`, never committed |
| States | `idle` → `validating` → `submitting` → `success` \| `error` |
| Success | Button and form replaced by a confirmation block; a "Send another message" control resets state |
| Failure | Inline error naming what happened and offering the direct mailto link as fallback |
| Character counter | Live count on the message field (`0 / 1500`) |

**Payload:**

```json
{
  "access_key": "<key>",
  "subject": "Portfolio enquiry from <name>",
  "from_name": "Portfolio — patelfaizan",
  "name": "...",
  "email": "...",
  "message": "...",
  "botcheck": ""
}
```

## 2.6 Accessibility requirements

- Skip-to-content link as first focusable element
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Every `<section>` has `aria-labelledby` pointing at its heading
- Heading order: one `<h1>` (name in hero) → `<h2>` per section → `<h3>` per card
- Visible focus ring: 2px accent outline with 2px offset — **never** `outline: none`
- Theme toggle is a `<button>` with `aria-label` and `aria-pressed`
- Nav links have `aria-current="true"` on the active section
- Contrast: all text ≥ 4.5:1 in both themes (verified during build, per token)
- `@media (prefers-reduced-motion: reduce)` disables transitions and sets `scroll-behavior: auto`

## 2.7 Performance requirements

- Portrait image exported as WebP with a JPG fallback, ~1000px wide, `width`/`height`
  attributes set to prevent layout shift, `fetchpriority="high"` (it is above the fold)
- Fonts self-hosted, `font-display: swap`, only weights actually used (400, 500, 600, 700)
- No external requests at runtime except the Web3Forms POST on submit
- Single CSS bundle, no runtime CSS-in-JS
- `IntersectionObserver` uses one observer for all sections, not one per section

## 2.8 Browser support

Last 2 versions of Chrome, Edge, Firefox, Safari (desktop and iOS). No IE11.

---

# PART 3 — App Flow

## 3.1 Page load sequence

```
1. Browser requests index.html
2. Inline <head> script reads localStorage.theme (or system preference)
       └─ sets <html data-theme="..."> immediately        ← no theme flash
3. CSS loads; tokens resolve against data-theme
4. React mounts into #root
5. App renders all sections (no lazy loading — total content is small)
6. useActiveSection registers one IntersectionObserver across all section elements
7. Hero portrait loads (high priority); everything else is text
```

## 3.2 Navigation flow

```
User clicks a nav item  ─┐
User clicks a rail tick ─┼──►  href="#sectionId"
User clicks hero CTA    ─┘        │
                                  ▼
                     CSS scroll-behavior: smooth
                     scroll-margin-top on each section
                     clears the sticky navbar height
                                  ▼
              IntersectionObserver fires on the new section
                                  ▼
              activeSection state updates
                                  ▼
        Navbar highlights that item (aria-current="true")
        Scale rail moves its indicator to that tick
        URL hash updates (browser back button works)
```

**Mobile (< 820px):** the nav collapses into a menu button. Tapping opens a full-height panel;
selecting an item closes the panel, then scrolls. Body scroll is locked while the panel is open.
`Escape` closes it. Focus is trapped inside the panel while open and returned to the menu
button on close.

## 3.3 Theme toggle flow

```
Click toggle
   ├─ useTheme flips state: "light" ⇄ "dark"
   ├─ document.documentElement.dataset.theme = next
   ├─ localStorage.setItem("theme", next)
   └─ All CSS variables re-resolve → entire page repaints in one frame
```

The toggle is a two-position switch, not a button that changes icon — the current state is
readable at a glance without interpreting an icon.

## 3.4 Contact form flow

```
                 ┌──────────────────────────────┐
                 │ User arrives at #contact      │
                 │ (nav, hero CTA, or scroll)    │
                 └──────────────┬───────────────┘
                                ▼
                       Types into a field
                                ▼
                    Blur → validate that field
                     ├─ invalid → inline error, red border, aria-invalid
                     └─ valid   → error clears, subtle valid state
                                ▼
                        Clicks "Send message"
                                ▼
                     Validate ALL fields at once
                     ├─ any invalid → focus first invalid field, do not submit
                     └─ all valid   → continue
                                ▼
                 Button → disabled, label "Sending…"
                                ▼
                POST https://api.web3forms.com/submit
                     ├─ success:true  → success panel
                     ├─ success:false → error panel + mailto fallback
                     └─ network error → error panel + mailto fallback
```

**Success panel copy:** "Message sent. I'll reply to `<email>` shortly." plus a
"Send another message" control that resets the form to `idle`.

**Error panel copy:** "The message didn't send. Email me directly at Patelfaizan0602@gmail.com."
— states what happened and what to do, no apology, no vague wording.

## 3.5 Section order and reasoning

| Order | Section | Nav | Why here |
|---|---|---|---|
| 1 | Hero | — | Identity + status in one screen |
| 2 | About | About | Context before evidence |
| 3 | Experience | Experience | Most recent work first — the strongest recency signal |
| 4 | Projects | Projects | The technical proof; the reason an engineer keeps reading |
| 5 | Skills | Skills | Fast scan for tool keywords after seeing them used in context |
| 6 | Certifications | Certificates | Supporting credentials |
| 7 | Education | Education | Formal record |
| 8 | Strengths & Languages | — | Soft close, low weight |
| 9 | Contact | Contact | Call to action after the case is made |
| 10 | Footer | — | Reference data |

Key Achievements from the sketch are **merged into Experience and Projects** rather than given
their own section — a standalone "achievements" block restates numbers already claimed nearby.
(See Appendix A for exactly where each achievement lands. Say the word if you'd rather keep it
as its own section.)

Nav items: **About · Experience · Projects · Skills · Certificates · Education · Résumé · Contact**
(Résumé opens the PDF in a new tab; Contact is styled as the primary action.)

---

# PART 4 — UI/UX Specification

## 4.1 Design thesis

> A machine designer's job is to prove a part survives loads it hasn't met yet. The site is
> built like a **result report**: measured, annotated, quiet, with the data doing the talking.

Concretely: the vocabulary comes from the workshop and the post-processor — machined
surfaces, anodised finishes, dimension callouts, result legends — not from generic "tech
portfolio" iconography. The design is disciplined, not decorative. **Boldness is spent in
exactly one place** (the scale rail, §4.6); everything else is restrained.

## 4.2 Colour palette — "Anodised"

Drawn from finishes a mechanical engineer actually handles: cool magnesium-grey castings,
graphite, and the gold-bronze of a TiN-coated cutting tool. Deliberately not the common
portfolio palettes (no cream + terracotta, no near-black + acid green, no navy + white,
no purple of any kind).

### Light theme — "Bench"

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#DEE1DC` | Page background — cool magnesium grey |
| `--surface` | `#EFF1ED` | Cards, form fields, nav backdrop |
| `--surface-sunk` | `#D3D7D2` | Recessed strips, table headers |
| `--ink` | `#171B1A` | Primary text |
| `--ink-muted` | `#565E5B` | Body text, captions |
| `--line` | `#C0C6C0` | Hairlines, borders |
| `--accent` | `#8A6A1F` | TiN bronze — links, active nav, primary button |
| `--accent-soft` | `#1E5A63` | Oxide teal — secondary metadata, tool tags |

### Dark theme — "Cast"

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#14181A` | Page background — cool graphite |
| `--surface` | `#1D2326` | Cards, form fields |
| `--surface-sunk` | `#0F1315` | Recessed strips |
| `--ink` | `#E6E9E5` | Primary text |
| `--ink-muted` | `#98A29E` | Body text, captions |
| `--line` | `#2E373A` | Hairlines |
| `--accent` | `#D9A441` | TiN gold |
| `--accent-soft` | `#4FB3A8` | Oxide teal |

### The result ramp (used once, as data — not decoration)

A five-stop contour scale, the same ordering used in FEA post-processing legends:

`#2C5CA8` → `#2E9BA8` → `#6FBF52` → `#E0B33A` → `#C4482F`

**Rule:** this ramp appears **only** in the scale rail (§4.6) and nowhere else. It is never a
background, never a gradient fill behind text, never a button.

## 4.3 Typography

| Role | Typeface | Treatment |
|---|---|---|
| **Logo / wordmark** | **Archivo**, width axis expanded (~112), weight 700 | Tight tracking (−0.02em), all lowercase-off (Title Case). Distinct family from body type, satisfying constraint #7 |
| **Display / headings** | **Archivo**, semi-expanded, 600 | Section headings and the hero name |
| **Body** | **IBM Plex Sans**, 400/500 | Paragraphs, bullets, card text. Engineering heritage; not Inter, not Space Grotesk |
| **Data / utility** | **IBM Plex Mono**, 400/500 | Dates, labels, tool tags, spec-strip values, form counters |

### Type scale (1.25 major third, fluid via `clamp()`)

| Token | Size | Use |
|---|---|---|
| `--fs-hero` | `clamp(2.6rem, 6vw, 4.6rem)` | Hero name |
| `--fs-h2` | `clamp(1.5rem, 2.4vw, 2rem)` | Section headings |
| `--fs-h3` | `1.125rem` | Card titles |
| `--fs-body` | `1.0625rem` | Paragraphs |
| `--fs-small` | `0.9375rem` | Card bullets |
| `--fs-mono` | `0.75rem` | Labels, dates, tags (letter-spacing 0.08em, uppercase) |

**Deliberately avoided:** Space Grotesk, Inter as a display face, JetBrains Mono, and any
condensed "techno" face — all are the current defaults in this genre.

## 4.4 Layout system

- Content column: `max-width: 1120px`, side padding `clamp(20px, 5vw, 56px)`
- Vertical rhythm: sections separated by `clamp(72px, 10vh, 128px)`, divided by a single hairline
- Baseline grid: 8px
- Border radius: **2px everywhere** (machined edge-break, not rounded, not sharp-zero)
- Elevation: none. No box-shadows. Depth is expressed by hairlines and surface tone only

### Breakpoints

| Name | Range | Behaviour |
|---|---|---|
| Mobile | < 620px | Single column; hero stacks portrait-first; rail hidden |
| Tablet | 620 – 1023px | Two-column grids; hero side-by-side at 1fr/0.8fr; rail hidden |
| Desktop | ≥ 1024px | Full layout; scale rail visible |

## 4.5 Section-by-section design

### Navbar (sticky)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Patel Mohammed Faizan    About Experience Projects Skills … Résumé  ◐  [Contact] │
└────────────────────────────────────────────────────────────────────────────┘
```

- Height 68px, background `--surface` at 85% opacity with `backdrop-filter: blur(10px)`,
  hairline bottom border
- Logo left in the wordmark face; nav items centre-right in mono caps at `--fs-mono`
- Active item: `--accent` colour + a 2px underline drawn under the label only
- Hover: underline grows from left over 160ms (a link — animation permitted)
- "Contact" is a bordered pill, the only filled control in the bar
- Theme toggle sits between the nav and Contact

### Hero

```
┌──────────────────────────────────────┬───────────────────────────┐
│  OPEN TO WORK · BENGALURU            │        ┌───────────────┐  │
│                                      │   ↕    │               │  │
│  Patel Mohammed                      │  1000  │   portrait    │  │
│  Faizan                              │   px   │               │  │
│                                      │        │               │  │
│  M.Tech, Machine Design              │        └───────────────┘  │
│  CAE · FEA · CAD · Simulation        │   ├──── 780 px ────┤      │
│                                      │                           │
│  [ Get in touch ]  [ Résumé ↗ ]      │                           │
├──────────────────────────────────────┴───────────────────────────┤
│ DISCIPLINE     │ FOCUS          │ TOOLS            │ STATUS       │
│ Mechanical Eng.│ Machine Design │ ANSYS/SolidWorks │ Open to work │
└──────────────────────────────────────────────────────────────────┘
```

- **Left-aligned, never centred.** Name breaks across two lines at desktop width
- Eyebrow above the name in mono caps: status + location
- Two buttons: "Get in touch" (filled, scrolls to `#contact`) and "Résumé ↗" (outline, opens PDF)
- **Portrait treatment:** the photo sits inside a hairline frame with **dimension callouts**
  drawn on two edges — thin extension lines with arrowheads and a mono-set measurement,
  exactly like a drawing annotation. This is the one place the drawing language appears
  literally, and it is static (no animation, per constraint #5)
- Portrait is desaturated ~12% and tinted 4% toward `--accent-soft` so it sits inside the
  palette rather than fighting it — same treatment in both themes
- Below both columns, the **spec strip**: four cells, hairline-separated, mono labels above values

### About

Single measured paragraph, `max-width: 62ch`, `--fs-body`, colour `--ink-muted`, with the
first sentence at `--ink` weight 500 as a lead-in. No image, no columns, no pull-quote.

### Experience

A vertical timeline on a hairline spine.

```
│
●  Data Processing Coordinator (Intern)      JAN 2026 — APR 2026
│  ModelyzeLabs AI · Bengaluru
│  Summary paragraph…
│
●  Engineering Intern                        DEC 2025 — JAN 2026
│  Bosch · Bengaluru
│  …
```

- Node markers are 8px hollow circles in `--accent`
- Role in display face; org in `--accent-soft`; dates right-aligned in mono
- Entries are static — the spine is not animated

### Projects

Three cards. Because there are exactly three and they are not sequential, they are **not**
numbered "01/02/03" — they are labelled by their engineering domain, which is information a
reader actually uses.

```
┌────────────────────────────┐
│ STRUCTURAL          2025   │   ← mono strip on --surface-sunk
├────────────────────────────┤
│ Failure Analysis of a      │
│ Steel Bracket in ANSYS     │
│                            │
│ — Static and fatigue …     │
│ — Evaluated stress …       │
│ — Parameterisation …       │
│                            │
│ ANSYS Workbench  Fatigue   │   ← tool tags, mono, --accent-soft
└────────────────────────────┘
```

- 3-up on desktop, 2-up on tablet, 1-up on mobile
- Cards are equal height with tags pinned to the bottom
- Bullets use an em-dash marker, not a disc
- Hover: border shifts to `--accent` over 150ms — permitted only because the whole card is a
  focusable element. **If we decide cards are not clickable, this hover is removed entirely**
- Layout reserves a 16:9 slot above the title that stays collapsed until images exist (decision #5)

### Skills

Four columns, one per group, because there are four groups — the column count is derived from
the data, not chosen for looks. Group name in mono caps; items in body face on hairline-separated
rows. No progress bars, no percentage ratings, no star systems.

### Certifications

Stacked rows, not cards.

```
┌───────────────────────────────────────────────────────────────┐
│ Product Design and Manufacturing                    NPTEL     │
│ IIT Kanpur · 4 credits · Elite                      [period]  │
└───────────────────────────────────────────────────────────────┘
```

- No scores (decision #6). "Elite" is retained as a credential label, not a number
- Period fields render only if data exists — blank NPTEL dates render nothing, no "TBD" text

### Education

Two rows, hairline-separated. Degree in display face, institution in `--accent-soft`,
period and CGPA right-aligned in mono.

- M.Tech in Machine Design — B.M.S College of Engineering, Bengaluru — Dec 2024 — Aug 2026 · CGPA 8.9/10
- B.E. Mechanical Engineering — G.M. Institute of Technology, Davanagere — Sep 2019 — Jul 2023 · CGPA 8.2/10

### Strengths & Languages

Two columns. Strengths as an em-dash list. Languages as hairline-bordered chips with the
proficiency level in mono beneath each name.

### Contact

```
┌─────────────────────────────┬───────────────────────────────┐
│  Let's talk about the work.  │  Name          [___________]  │
│                              │  Email         [___________]  │
│  Patelfaizan0602@gmail.com   │  Message       [           ]  │
│  +91 63661 71427             │                [           ]  │
│  Bengaluru, Karnataka        │                    0 / 1500   │
│                              │                               │
│  LinkedIn ↗   GitHub ↗       │           [ Send message ]    │
└─────────────────────────────┴───────────────────────────────┘
```

- Left: direct contact details and social links, so the form is never the only route
- Right: the form. Labels sit above inputs (never placeholder-only labels)
- Inputs: `--surface` fill, hairline border, 2px radius, focus border `--accent` + focus ring
- Required fields marked with a mono asterisk and `required` on the input
- Errors in `--error` (`#B3402C` light / `#E4705C` dark) below the field
- The button is the only filled element in the section

### Footer — drawing title block

Structurally unlike the navbar (constraint #6): the navbar is a horizontal link bar; the footer
is a bordered grid of labelled data cells, like the title block on an engineering drawing.

```
┌──────────────┬──────────────┬───────────────┬─────────────────┐
│ DRAWN BY     │ LOCATION     │ REVISION      │ LINKS           │
│ P. M. Faizan │ Bengaluru,IN │ v1 · 2026     │ LinkedIn ↗      │
│              │              │               │ GitHub ↗        │
├──────────────┴──────────────┴───────────────┴─────────────────┤
│ © 2026 Patel Mohammed Faizan                    Back to top ↑ │
└───────────────────────────────────────────────────────────────┘
```

No nav links repeated, no logo repeat, no newsletter box.

## 4.6 Signature element — the scale rail

**One bold idea, executed precisely.** A fixed vertical strip on the left edge of the viewport
(desktop ≥ 1024px only), styled as an FEA result legend:

- A 6px-wide vertical bar filled with the five-stop result ramp (§4.2), rendered at 45% opacity
- Tick marks along it, one per section, labelled in mono at 10px
- The tick for the active section renders at full opacity in `--ink` with a short lead line
- The bar's fill height tracks scroll progress: 0% at the top of the page, 100% at the footer —
  so the reader is literally reading a loaded structure from min to max
- **Every tick is a link** to its section, so the animation is attached to an interactive
  element (constraint #5 satisfied)
- Hidden below 1024px and when `prefers-reduced-motion` is set (falls back to static ticks)

This is the element the site is remembered by. It is the only place the contour spectrum
appears, and the only place with continuous motion.

## 4.7 Motion inventory (exhaustive)

| Element | Motion | Interactive? |
|---|---|---|
| Nav link | Underline grows from left, 160ms | Yes — link |
| Nav "Contact" pill | Background fill, 160ms | Yes — link |
| Theme toggle | Knob slides, 180ms | Yes — button |
| Scale rail | Fill height follows scroll; active tick fades in | Yes — links |
| Project card | Border colour shift, 150ms | Only if card is a link |
| Form input | Border colour + focus ring, 120ms | Yes — input |
| Send button | Background and label state change | Yes — button |
| Mobile menu | Panel slides down, 220ms | Yes — triggered by button |
| **Everything else** | **None** | — |

No scroll-reveal fades, no parallax, no typewriter effect, no counters, no marquee.
All of the above are disabled under `prefers-reduced-motion: reduce`.

---

# PART 5 — Implementation Plan

## 5.1 Phases

| Phase | Deliverable | Definition of done |
|---|---|---|
| **0. Setup** | Vite + React project, repo initialised, deployment pipeline proven with a placeholder page | `npm run dev` works; a hello-world page is live on GitHub Pages |
| **1. Foundation** | `tokens.css`, `base.css`, fonts installed, `useTheme`, `content.js` populated | Toggling `data-theme` by hand in DevTools visibly swaps both palettes |
| **2. Shell** | Navbar, ThemeToggle, Footer, smooth scrolling, scroll-spy | Nav highlights correctly while scrolling; theme persists across reload with no flash |
| **3. Hero** | Hero with portrait, dimension callouts, spec strip | Matches wireframe at 360 / 768 / 1440px |
| **4. Content sections** | About, Experience, Projects, Skills, Certifications, Education, Strengths & Languages | All content from Appendix A rendered from `content.js` |
| **5. Contact** | Form with validation and Web3Forms integration | A real test message arrives in the inbox; every error path produces correct UI |
| **6. Signature** | Scale rail | Tracks scroll accurately; ticks navigate; hidden below 1024px |
| **7. Polish** | Responsive audit, a11y audit, Lighthouse, meta tags, favicon, OG image | All §1.5 targets met |
| **8. Ship** | Production deploy, README | Live URL loads and the form works in production |

## 5.2 Commands

```bash
# Phase 0
npm create vite@latest myportfolio_v1 -- --template react
cd myportfolio_v1
npm install
npm install lucide-react
npm install @fontsource-variable/archivo @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono

git init
git remote add origin https://github.com/patelfaizan/myportfolio_v1.git

# Day-to-day
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # verify the production build locally
```

## 5.3 `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Project-site path. Change to '/' if a custom domain is used.
  base: '/myportfolio_v1/',
})
```

**Consequence:** never write `src="/assets/portrait.jpg"`. Always
`import portrait from '../assets/portrait.jpg'` so Vite rewrites the path for the base — this
is how the relative-path requirement (decision #2) is met safely under GitHub Pages.

## 5.4 Environment variables

`.env.local` (gitignored):
```
VITE_WEB3FORMS_KEY=your-access-key-here
```

`.env.example` (committed):
```
VITE_WEB3FORMS_KEY=
```

For GitHub Actions, add the key as a repository secret named `VITE_WEB3FORMS_KEY`.
Note: a Web3Forms access key is public by design once the site is built — it identifies the
destination inbox, not an account. Keeping it out of the repo is hygiene, not secrecy.

## 5.5 Deployment — GitHub Actions

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` to Pages.
One-time setup: **Settings → Pages → Source: GitHub Actions**.

```yaml
name: Deploy
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
        env:
          VITE_WEB3FORMS_KEY: ${{ secrets.VITE_WEB3FORMS_KEY }}
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Live URL: `https://patelfaizan.github.io/myportfolio_v1/`

## 5.6 Pre-launch checklist

**Content**
- [ ] Every string matches Appendix A
- [ ] NPTEL dates confirmed or fields left empty
- [ ] Portrait replaced with the real photo
- [ ] `resume.pdf` present in `public/`
- [ ] Email and phone links open the right apps on mobile

**Design compliance**
- [ ] No centred hero heading
- [ ] No purple anywhere (search the CSS)
- [ ] No icon-card pattern
- [ ] No animation on non-interactive elements
- [ ] Footer structurally distinct from navbar
- [ ] Logo family ≠ body family
- [ ] No gradient backgrounds

**Technical**
- [ ] Both themes verified on all sections
- [ ] No theme flash on hard reload in dark mode
- [ ] Keyboard-only pass: every control reachable, focus always visible
- [ ] Contact form: valid submit, each invalid path, network failure path
- [ ] Tested at 360, 414, 768, 1024, 1440, 1920px
- [ ] Lighthouse ≥ 95 on Performance and Accessibility
- [ ] `<title>`, meta description, and OG tags set
- [ ] 404 handling for GitHub Pages deep links

## 5.7 Maintenance

Adding a project later = append one object to the `projects` array in `content.js`, commit,
push. The Action redeploys automatically. No component changes required.

---

# Appendix A — Locked content

## A.1 Identity

| Field | Value |
|---|---|
| Name | Patel Mohammed Faizan |
| Title | Mechanical Engineering Postgraduate — Machine Design |
| Location | Bengaluru, Karnataka, India |
| Email | Patelfaizan0602@gmail.com |
| Phone | +91 63661 71427 |
| LinkedIn | https://www.linkedin.com/in/patelfaizan |
| GitHub | https://github.com/patelfaizan |
| Status | Open to work |

## A.2 About

> I'm a Mechanical Engineer based in Bengaluru, specialising in Machine Design. My focus is on
> how products are engineered to survive real-world loads — using CAD to shape parts and FEA to
> prove they'll hold up under stress, fatigue, and cyclic loading. I work in ANSYS, Abaqus and
> SolidWorks, alongside the fundamentals of materials, manufacturing and product design that sit
> underneath any good simulation. I learn by building — whether that's failure-testing a bracket,
> designing a charging system, or documenting how a fire-protection system actually gets specified.

*(Lightly tightened from the sketch; say the word if you want the original wording verbatim.)*

## A.3 Experience

**1. Data Processing Coordinator (Intern) — ModelyzeLabs AI, Bengaluru** · Jan 2026 — Apr 2026
> Worked as DPC with experience in data processing and documentation. Knowledge of MEP systems
> including HVAC, plumbing, and fire protection. Skilled in ANSYS, Finite Element Analysis, and
> engineering analysis.

**2. Engineering Intern — Bosch, Bengaluru** · Dec 2025 — Jan 2026
> Hands-on internship supporting design, analysis, and testing activities. Assisted senior
> engineers in product development, performed basic simulations, and contributed to technical
> documentation.

**3. Intern, Wheel & Axle Manufacturing — Rail Wheel Factory, Bengaluru** · Aug 2022 — Sep 2022
- Gained practical exposure to large-scale manufacturing processes in wheel and axle production
- Observed quality control and machining operations in railway components
- *Contributed to a 10% increase in production output* ← merged achievement

## A.4 Projects

**Structural — Failure Analysis of a Steel Bracket in ANSYS Workbench** · Jul 2025 — Aug 2025
- Performed static and fatigue failure analysis of a steel bracket
- Evaluated stress distribution, deformation, fatigue life, and factor of safety under cyclic loading
- Conducted parameterisation studies varying thickness and width to propose optimised designs
- *Optimised design reduced failure rates by 15%* ← merged achievement
- Tools: ANSYS Workbench · Fatigue Analysis · Structural FEA

**Energy Systems — Charging of EV Batteries using Wind Energy** · Jun 2021 — Nov 2022
- Designed a wind-energy-based charging system for EV batteries
- Integrated energy storage systems for stable power supply
- Achieved a 25% increase in charging efficiency using renewable energy ← merged achievement
- Tools: Wind Energy · EV Charging · Energy Storage

**Safety Systems — Automatic Fire Protection System** · Nov 2022 — Jun 2023
- Designed an automatic fire detection and suppression system
- Integrated sprinklers, alarms, and suppression systems
- Ensured compliance with safety codes across an area exceeding 10,000 sq ft ← merged achievement
- Performed risk assessments against applicable standards
- Tools: Fire Detection · Safety Codes · Risk Assessment

## A.5 Skills

| Group | Items |
|---|---|
| CAE Software | ANSYS, Abaqus |
| CAD Software | Solid Edge, SolidWorks |
| Programming | Python, Java |
| Documentation | MS Word, MS PowerPoint |

## A.6 Certifications

| Title | Issuer | Credential | Period |
|---|---|---|---|
| Product Design and Manufacturing | NPTEL · IIT Kanpur | Elite · 12-week · 4 credits | *pending* |
| Processing of Polymers and Polymer Composites | NPTEL · IIT Roorkee | Elite · 8-week · 3 credits | *pending* |
| Abaqus CAE: Static and Dynamic Analysis | Udemy | 12 hours · Completed | *pending* |

## A.7 Education

| Degree | Institution | Period | CGPA |
|---|---|---|---|
| M.Tech, Machine Design | B.M.S College of Engineering, Bengaluru | Dec 2024 — Aug 2026 | 8.9 / 10.0 |
| B.E., Mechanical Engineering | G.M. Institute of Technology, Davanagere | Sep 2019 — Jul 2023 | 8.2 / 10.0 |

## A.8 Strengths

Analytical and creative problem-solving · Structured teamwork · Independent execution · Time management

## A.9 Languages

English — Native · Hindi — Native · Urdu — Native · Kannada — Native

---

# Review questions

Before I write a line of code, confirm these:

1. **Palette** — does "Anodised" (cool magnesium grey / graphite with TiN bronze and oxide teal) work for you, or do you want to see an alternative direction?
2. **Type pairing** — Archivo + IBM Plex Sans + IBM Plex Mono. Approved?
3. **Scale rail** — is the FEA-legend scroll rail the signature element you want, or too much?
4. **Key Achievements** — merged into Experience and Projects (as in Appendix A), or kept as its own section?
5. **Project cards** — clickable (they'd need somewhere to go) or static? This decides whether the hover effect exists at all.
6. **About paragraph** — my tightened version, or the original wording?
7. **Section order and nav labels** — as listed in §3.5?
8. **NPTEL dates** — what should appear in those fields?
