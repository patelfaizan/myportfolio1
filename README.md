# myportfolio_v1

Personal portfolio for **Patel Mohammed Faizan** — M.Tech (Machine Design), CAE / FEA / CAD.

Built with React 18 + Vite. Single page, two themes, no framework CSS.
Full specification: see `portfolio-spec-v1.pdf`.

---

## Running it locally

```bash
npm install
cp .env.example .env.local     # then paste your Web3Forms key into it
npm run dev                    # http://localhost:5173
```

Other commands:

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Things you must supply

| File | What to do |
|---|---|
| `src/assets/portrait.jpg` | Replace the placeholder with your photo. Portrait orientation, ideally 780×1000px or larger. Keep the filename. |
| `public/resume.pdf` | Replace the placeholder with your real résumé. Keep the filename. |
| `.env.local` | Add `VITE_WEB3FORMS_KEY=...` from https://web3forms.com (free, one field: your email). |

## Editing content

**All text lives in `src/data/content.js`.** Nothing else needs editing to update
experience, projects, skills, certifications, education or contact details.

Adding a project = appending one object to the `projects` array.
Adding a section = adding an entry to `sections` (this drives the navbar, the
scroll rail and the scroll spy at once) plus a matching component in `App.jsx`.

## Deploying

1. Push to `main`.
2. In GitHub: **Settings → Pages → Source: GitHub Actions**.
3. In GitHub: **Settings → Secrets and variables → Actions → New repository secret**
   named `VITE_WEB3FORMS_KEY`.

The site publishes to `https://patelfaizan.github.io/myportfolio_v1/`.

If you later add a custom domain, change `base` in `vite.config.js` to `'/'`.

## Structure

```
src/
├─ data/content.js       all site copy
├─ styles/tokens.css     colour + type tokens, both themes
├─ styles/base.css       reset, typography, shared layout
├─ hooks/                theme, scroll spy, scroll progress
└─ components/           one .jsx + one .css per component
```

## Notes

- Theme is applied by an inline script in `index.html` before React mounts, so there is
  no flash of the wrong theme on load.
- Motion is applied only to interactive elements. Static content does not animate.
- The scale rail (left edge, desktop ≥1240px) is a scroll-progress legend; each tick is a link.
