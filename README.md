# keiver.

Personal portfolio — https://keiverluna.com

Backend Systems Engineer specializing in Node.js, PostgreSQL, and distributed systems. This portfolio is built with React 19, Vite, Tailwind CSS v4, and Framer Motion — showcasing backend architecture with full stack capabilities.

---

## Stack

- **Framework** — React 19 + Vite 8
- **Styling** — Tailwind CSS v4
- **Animation** — Framer Motion 12
- **Routing** — React Router v7
- **Icons** — Lucide React
- **Deploy** — Vercel

## Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer
│   ├── sections/     # Hero, Stack, FeaturedWork, Contact, etc.
│   └── ui/           # CustomCursor, ThemeToggle, ProjectCard, Icons
├── data/
│   └── projects.js   # All project data (real + concepts)
└── pages/
    ├── Intro.jsx
    ├── About.jsx
    ├── Works.jsx
    └── CaseStudy.jsx
```

## Local Development

```bash
npm install
npm run dev
```

## Deploy

Deployed on Vercel. The `vercel.json` at the root handles client-side routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Every push to `main` deploys automatically.

---

[github.com/Keiver-Dev](https://github.com/Keiver-Dev) · [linkedin.com/in/keiver-luna](https://www.linkedin.com/in/keiver-luna/)