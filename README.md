# Martin Heßmann

Martin Heßmann – Digital Design Manager & Product Generalist.

Hey, I'm Martin 👋 I live in Friedrichshain, former East-Berlin. I'm a Product Generalist who bridges the gap between design, development, and business needs. With over a decade in the tech industry, I've worked on various projects ranging from finance platforms to interactive 3D games.

---

## Project Overview

This is my personal resume website built with Next.js and TypeScript. The site uses the JSON Resume standard as a single source of truth for all content.

### Documentation

For detailed documentation about the project, please check the [docs directory](docs/).

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- JSON Resume standard
- Shadcn/UI

## Application Architecture

The project follows Next.js App Router conventions with a clear separation of concerns:

- **app/layout.tsx** - Root layout with HTML structure, metadata, and ThemeProvider
- **app/page.tsx** - Homepage route component that renders the Resume
- **components/resume.tsx** - Single unified Resume component that renders JSON Resume schema in a clean, print-optimized layout
- **data/resume.json** - All resume content following JSON Resume standard
- **components/theme-toggle.tsx** - Theme switcher (light/dark/system) with portfolio/resume mode toggle

## Key Features

- Single unified `Resume` component that renders JSON Resume schema
- Print-optimized layout with responsive grid-to-list conversion
- Dark/light/system theme support with next-themes
- Mobile-first responsive design
- Clean, minimal styling with Tailwind CSS
- Project cards with images, role tags, and technology keywords
- Sections: Work, Projects, Skills, Education, Languages, Interests

## Data Model (agent-ready)

- Single source of truth: `data/resume.json` (JSON Resume + project extensions)
- Project extensions (required unless noted):
  - `entity` string – client/organization name
  - `roles` string[] – any of ['Design','Development','Project Management']
  - `image` string – path under `public/images/clients/...`
  - `startDate` string – YYYY or YYYY-MM; UI shows “since YYYY”
  - `keywords` string[] – technologies/specs only. Do NOT include client/entity names (these are rendered separately)

Example project

```json
{
  "name": "Sample Project",
  "description": "One-line impact statement",
  "keywords": ["Next.js", "WordPress"],
  "startDate": "2023-06",
  "url": "https://example.com",
  "image": "/images/clients/example.jpg",
  "roles": ["Design", "Development"],
  "entity": "Example Inc."
}
```

## Images

- Location: `public/images/clients/`
- Naming: `domain-or-slug.jpg|webp` (e.g. `viniculture.jpg`)
- Preferred size: landscape 1200–1600px wide, <300KB if possible
- Alt text convention: `"${project.name} project screenshot"`

## Rendering Rules (components/resume.tsx)

- Grid: `md:grid-cols-2`, `lg:grid-cols-3`
- Card background: `bg-muted/30` → hover `bg-muted/50`; no borders or shadows
- Image overlay: show only active role chips; inactive roles are hidden
- Title: single line; URL shown as clean domain (https/www stripped)
- Date: renders as `since YYYY` from `startDate`
- Specs: project `keywords` rendered as inline text separated by `•`; client name (`entity`) is filtered out
- Note: Project cards intentionally use `<img>` (not Next/Image) for simplicity

## Skills / Filters

- Skill chips share the same color system as cards:
  - Inactive: `bg-muted/30 text-muted-foreground`
  - Hover/Active: `bg-muted/50 text-foreground`

## Sorting

- Projects render alphabetically by `name`. Adjust in `components/resume.tsx` if you need a different order.

## Editing Workflow & Checks

```bash
npm run dev         # local development
npm run build       # production build
npm run type-check  # TS types against types/resume.ts
npm run lint        # linting
npm run format      # prettier
```

Print export tip: use browser print (A4, normal margins, enable background graphics).

## Contribution Guardrails

- Do not add client names into `keywords` (use `entity`)
- Keep `roles` to the three canonical values
- Maintain minimal styling: no primary colors, borders, or shadows for cards
- Place all project images under `public/images/clients/`