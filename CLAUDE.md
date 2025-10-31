# CLAUDE.md

Martin Heßmann – Digital Design Manager & Product Generalist.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (runs on localhost:3000)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 14 application that renders a clean resume website using the JSON Resume standard.

### Core Architecture

- **Next.js App Router** - Uses app directory structure with layout.tsx and page.tsx
- **JSON Resume Standard** - Single source of truth in `data/resume.json`
- **TypeScript** - Strict mode enabled with comprehensive types in `types/resume.ts`
- **Tailwind CSS** - Utility-first styling with dark/light theme support
- **Print Optimization** - Optimized for PDF export

### Key Components

- `app/layout.tsx` - Root layout with ThemeProvider, metadata, and favicon
- `app/page.tsx` - Main resume page that renders Resume component
- `components/resume.tsx` - Single unified Resume component that renders JSON Resume schema sections
- `components/theme-provider.tsx` - Theme context and system preference detection
- `components/theme-toggle.tsx` - Theme switcher UI (light/dark/system) with resume/portfolio toggle
- `components/theme-favicon.tsx` - Dynamic favicon based on theme

### State Management

- **Theme Store** (`lib/store/theme-store.ts`) - Zustand store for theme state (light/dark/system)
- **Zustand persist middleware** - Theme preference persisted to localStorage

### Data Layer

- `data/resume.json` - All resume content following JSON Resume schema
- Extended fields for projects: `roles`, `entity`, `image`, `description`, `startDate`, `keywords`
- All content is type-safe via `types/resume.ts`
- Projects are sorted alphabetically by name

## Editing Playbook (for agents)

1) Update content
- Edit `data/resume.json` only. Projects include:
  - `entity` (client), `roles` (subset of ['Design','Development','Project Management']), `image` (under `public/images/clients/`), `startDate` (YYYY or YYYY-MM), `keywords` (tech/specs only).
- Do NOT include client names in `keywords` – the UI renders `entity` separately and filters it out from keywords.
 - The first sentence of `basics.summary` must be: "Martin Heßmann – Digital Design Manager & Product Generalist."

2) Image handling
- Store files in `public/images/clients/` (e.g. `viniculture.jpg`).
- Prefer landscape 1200–1600px width, keep files <300KB when possible.
- Cards intentionally use `<img>` (not Next/Image).

3) Rendering rules (in `components/resume.tsx`)
- Cards: `bg-muted/30` → hover `bg-muted/50`, no borders or shadows.
- Grid: 1 col mobile, 2 cols tablet (`md`), 3 cols desktop (`lg`).
- Role tags: overlay on image; only active roles display (inactive hidden).
- Keywords: dot-separated inline text; `entity` is filtered out.
- Date: rendered as `since YYYY` from `startDate`.
- URL: displayed as a clean domain (https/www stripped).

4) Skills/filters
- Skill chips mirror card color system: inactive `bg-muted/30`, hover/active `bg-muted/50`.

5) Quality checks
```bash
npm run type-check
npm run lint
npm run build
```
Print: browser print (A4, normal margins, background graphics enabled).

### Guardrails
- Keep styling minimal (no borders/shadows/primary accents on cards).
- Restrict `roles` to the canonical set.
- All project images live under `public/images/clients/`.

### Styling System

- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - Theme colors defined in globals.css
- **Responsive Design** - Mobile-first approach
- **Print Styles** - Optimized layouts in `@media print` queries
- **Dark/Light Themes** - Seamless theme switching with next-themes

### File Structure

- `app/` - Next.js app router pages and layouts
- `components/` - React components
  - `resume.tsx` - Main resume renderer
  - `theme-*.tsx` - Theme management components
- `components/ui/` - Shadcn/UI components
- `lib/` - Utilities, stores, and helper functions
- `data/` - JSON content files
- `types/` - TypeScript type definitions
- `docs/` - Project documentation
- `public/` - Static assets

## Important Development Notes

- All resume content is managed through `data/resume.json` (JSON Resume standard)
- The Resume component renders sections conditionally based on data availability
- Project data includes extended fields: `roles`, `entity`, `image`, `description`
- Project images use `<img>` tags (not Next.js Image) for flexbox card layout
- Roles are displayed as overlay tags on project images
- Responsive grid: 1 column mobile, 2 tablet, 3 desktop
- Print layout converts grid to simple list with border-left styling
- TypeScript is configured with strict mode enabled
- Theme switching uses next-themes with CSS variables
- Print styles optimized for PDF exports (smaller fonts, reduced spacing, hidden interactive elements)

