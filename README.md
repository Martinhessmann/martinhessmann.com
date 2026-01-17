# Martin Heßmann

Martin Heßmann – Digital Design Manager & Product Generalist.

Hey, I'm Martin 👋 I live in Friedrichshain, former East-Berlin. I'm a Product Generalist who bridges the gap between design, development, and business needs. With over a decade in the tech industry, I've worked on various projects ranging from finance platforms to interactive 3D games.

---

## Project Overview

This is my personal resume website built with Next.js and TypeScript. The site uses the JSON Resume standard as a single source of truth for all content, with both web and PDF output formats.

### Documentation

For detailed documentation about the project, please check the [docs directory](docs/).

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Commands

- `npm run dev` - Start development server (runs on localhost:3000)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- JSON Resume standard
- Shadcn/UI
- @react-pdf/renderer (v4.3.1) - For PDF generation

## Application Architecture

The project follows Next.js App Router conventions with a clear separation of concerns:

### Core Components

- **app/layout.tsx** - Root layout with HTML structure, metadata, and ThemeProvider
- **app/page.tsx** - Homepage route component that renders the Resume and PDF download button
- **app/api/pdf/route.ts** - API route for server-side PDF generation (available but not currently used)
- **components/resume.tsx** - Web version: renders JSON Resume schema in a clean, print-optimized layout
- **components/resume-pdf.tsx** - PDF version: renders resume using @react-pdf/renderer with two-page layout
- **components/pdf-download-button.tsx** - Floating download button for client-side PDF generation
- **components/pdf-preview.tsx** - Full-page PDF viewer (triggered by `?preview=print` query param)
- **data/resume.json** - Single source of truth for all resume content (JSON Resume + extensions)
- **components/theme-toggle.tsx** - Theme switcher (light/dark/system)

### State Management

- **Theme Store** (`lib/store/theme-store.ts`) - Zustand store for theme state (light/dark/system)
- **Zustand persist middleware** - Theme preference persisted to localStorage

### Styling System

- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - Theme colors defined in globals.css
- **Responsive Design** - Mobile-first approach
- **Print Styles** - Optimized layouts in `@media print` queries (for browser print)
- **Dark/Light Themes** - Seamless theme switching with next-themes

## Key Features

- Single unified `Resume` component that renders JSON Resume schema
- **PDF Download** - Client-side PDF generation with date-stamped filenames
- **PDF Preview** - Full-page PDF viewer via `?preview=print` query parameter
- Print-optimized web layout with responsive grid-to-list conversion
- Dark/light/system theme support with next-themes
- Mobile-first responsive design
- Clean, minimal styling with Tailwind CSS
- Project cards with images, role tags, and technology keywords
- Sections: Work, Projects, Skills, Education, Languages, Interests, Awards, Successes

## PDF Generation System

The project includes a comprehensive PDF generation system using `@react-pdf/renderer`:

### Components

1. **PDF Download Button** (`components/pdf-download-button.tsx`)
   - Floating button in bottom-right corner (hidden in print)
   - Client-side PDF generation via `PDFDownloadLink`
   - Dynamic filename: `martin-hessmann-resume-YYYY-MM-DD.pdf`
   - Loading state during PDF generation

2. **PDF Document** (`components/resume-pdf.tsx`)
   - Two-page A4 layout
   - Page 1: Header, Work (recent 4), Education, Successes, Skills, Languages (two-column layout)
   - Page 2: Projects only (non-featured, max 10)
   - Uses Phosphor icons for visual elements
   - Accent color: `#2563EB` (blue 600)

3. **PDF Preview** (`components/pdf-preview.tsx`)
   - Full-page viewer component
   - Accessible via `?preview=print` query parameter
   - Uses `PDFViewer` from @react-pdf/renderer

4. **API Route** (`app/api/pdf/route.ts`)
   - Server-side PDF generation endpoint
   - Available but not currently used by download button
   - Can be used for programmatic PDF generation

## Web vs PDF: Rendering Differences

The web and PDF versions use the same data source (`data/resume.json`) but apply different rendering logic:

| Aspect | Web (`resume.tsx`) | PDF (`resume-pdf.tsx`) |
|--------|-------------------|------------------------|
| **Projects Sorting** | Alphabetical by `name` | Featured → priority → alphabetical |
| **Projects Display** | All projects | Page 2: Non-featured only, max 10 |
| **Work Experience** | All work entries | Recent 4 jobs only |
| **Work Highlights** | All highlights shown | Max 3 per job (tech lines filtered) |
| **Project Keywords** | All keywords shown | Max 6 keywords per project |
| **Layout Structure** | Single-column flow | Two-column on Page 1 (67/33 split) |
| **Project Images** | Full image cards | No images in PDF |
| **Role Tags** | Visual chips on images | Not displayed in PDF |

### Why Different Rendering?

- **Web**: Optimized for browsing and exploration, shows all content
- **PDF**: Optimized for concise, professional document format suitable for applications
- Both maintain content sync via shared JSON source, but each format uses layout and filtering appropriate to its medium

## Data Model (agent-ready)

- Single source of truth: `data/resume.json` (JSON Resume + project extensions)
- All content is type-safe via `types/resume.ts`
- Projects are sorted alphabetically in web view (different in PDF)

### Project Extensions (required unless noted):

- `entity` string – client/organization name
- `roles` string[] – any of ['Design','Development','Project Management']
- `image` string – path under `public/images/clients/...`
- `startDate` string – YYYY or YYYY-MM; UI shows "since YYYY"
- `keywords` string[] – technologies/specs only. Do NOT include client/entity names (these are rendered separately)
- `featured` boolean (optional) – used for PDF sorting
- `priority` number (optional) – used for PDF sorting after featured

Example project:

```json
{
  "name": "Sample Project",
  "description": "One-line impact statement",
  "keywords": ["Next.js", "WordPress"],
  "startDate": "2023-06",
  "url": "https://example.com",
  "image": "/images/clients/example.jpg",
  "roles": ["Design", "Development"],
  "entity": "Example Inc.",
  "featured": true,
  "priority": 1
}
```

## Images

- Location: `public/images/clients/`
- Naming: `domain-or-slug.jpg|webp` (e.g. `viniculture.jpg`)
- Preferred size: landscape 1200–1600px wide, <300KB if possible
- Alt text convention: `"${project.name} project screenshot"`
- Note: Project cards intentionally use `<img>` (not Next/Image) for simplicity

## Rendering Rules (Web - components/resume.tsx)

- Grid: `md:grid-cols-2`, `lg:grid-cols-3`
- Card background: `bg-muted/30` → hover `bg-muted/50`; no borders or shadows
- Image overlay: show only active role chips; inactive roles are hidden
- Title: single line; URL shown as clean domain (https/www stripped)
- Date: renders as `since YYYY` from `startDate`
- Specs: project `keywords` rendered as inline text separated by `•`; client name (`entity`) is filtered out
- Print styles: grid converts to simple list with `border-l-2` styling

## Skills / Filters

- Skill chips share the same color system as cards:
  - Inactive: `bg-muted/30 text-muted-foreground`
  - Hover/Active: `bg-muted/50 text-foreground`

## Editing Workflow & Quality Checks

1. Update content:
   - Edit `data/resume.json` only
   - The first sentence of `basics.summary` must be: "Martin Heßmann – Digital Design Manager & Product Generalist."
   - Do NOT include client names in `keywords` – the UI renders `entity` separately and filters it out

2. Run quality checks:
   ```bash
   npm run dev         # local development
   npm run build       # production build
   npm run type-check  # TS types against types/resume.ts
   npm run lint        # linting
   npm run format      # prettier (if configured)
   ```

3. Test both formats:
   - **Web**: View at `http://localhost:3000`
   - **PDF Preview**: View at `http://localhost:3000?preview=print`
   - **PDF Download**: Test the download button (generates `martin-hessmann-resume-YYYY-MM-DD.pdf`)

## File Structure

- `app/` - Next.js app router pages and layouts
  - `api/pdf/route.ts` - PDF generation API endpoint
- `components/` - React components
  - `resume.tsx` - Main web resume renderer
  - `resume-pdf.tsx` - PDF document renderer
  - `pdf-download-button.tsx` - PDF download UI
  - `pdf-preview.tsx` - PDF preview viewer
  - `theme-*.tsx` - Theme management components
- `components/ui/` - Shadcn/UI components
- `lib/` - Utilities, stores, and helper functions
  - `store/theme-store.ts` - Zustand theme store
- `data/` - JSON content files
  - `resume.json` - Single source of truth
- `types/` - TypeScript type definitions
  - `resume.ts` - Resume schema types
- `docs/` - Project documentation
- `public/` - Static assets
  - `images/clients/` - Project images

## Important Development Notes

- All resume content is managed through `data/resume.json` (JSON Resume standard)
- Both web and PDF versions read from the same JSON source
- Web and PDF use different rendering logic (see "Web vs PDF: Rendering Differences" above)
- TypeScript is configured with strict mode enabled
- Theme switching uses next-themes with CSS variables
- Print styles optimized for browser print (A4, normal margins, enable background graphics)
- PDF generation uses @react-pdf/renderer (client-side for download, server-side API available)

## Contribution Guardrails

- Do not add client names into `keywords` (use `entity`)
- Keep `roles` to the three canonical values: ['Design','Development','Project Management']
- Maintain minimal styling: no primary colors, borders, or shadows for cards
- Place all project images under `public/images/clients/`
- When updating PDF layout, test both web and PDF output to ensure consistency
- The first sentence of `basics.summary` must remain: "Martin Heßmann – Digital Design Manager & Product Generalist."

---

## Agent/Development Guide

This section provides quick reference for AI agents and developers working with this codebase.

### Quick Reference

**Data Source**: `data/resume.json` (JSON Resume + extensions)
**Web Component**: `components/resume.tsx` - Renders all content, alphabetical project sorting
**PDF Component**: `components/resume-pdf.tsx` - Two-page layout, filtered/sorted content
**PDF Download**: `components/pdf-download-button.tsx` - Client-side generation via PDFDownloadLink
**Types**: `types/resume.ts` - TypeScript definitions for all data structures

### Critical: Web vs PDF Differences

The web and PDF versions use **different rendering logic** but share the same data source:

- **Projects**: Web = alphabetical, PDF = featured → priority → alphabetical
- **Work**: Web = all jobs, PDF = recent 4 only
- **Highlights**: Web = all, PDF = max 3 per job
- **Layout**: Web = single-column, PDF = two-column (Page 1)

**Always verify changes work in both formats.**

### Editing Playbook (for agents)

1. **Update content**: Edit `data/resume.json` only. Projects include:
   - `entity` (client), `roles` (subset of ['Design','Development','Project Management']), `image` (under `public/images/clients/`), `startDate` (YYYY or YYYY-MM), `keywords` (tech/specs only).
   - Do NOT include client names in `keywords` – the UI renders `entity` separately and filters it out from keywords.
   - The first sentence of `basics.summary` must be: "Martin Heßmann – Digital Design Manager & Product Generalist."

2. **Image handling**: Store files in `public/images/clients/` (e.g. `viniculture.jpg`). Prefer landscape 1200–1600px width, keep files <300KB when possible. Cards intentionally use `<img>` (not Next/Image).

3. **Rendering rules** (in `components/resume.tsx`):
   - Cards: `bg-muted/30` → hover `bg-muted/50`, no borders or shadows.
   - Grid: 1 col mobile, 2 cols tablet (`md`), 3 cols desktop (`lg`).
   - Role tags: overlay on image; only active roles display (inactive hidden).
   - Keywords: dot-separated inline text; `entity` is filtered out.
   - Date: rendered as `since YYYY` from `startDate`.
   - URL: displayed as a clean domain (https/www stripped).

4. **Skills/filters**: Skill chips mirror card color system: inactive `bg-muted/30`, hover/active `bg-muted/50`.

5. **Quality checks**:
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```

6. **Test both formats**: Web at `/`, PDF preview at `/?preview=print`, PDF download via button

### When Making Changes

- ✅ Update `data/resume.json` for content changes
- ✅ Check `types/resume.ts` if adding new fields
- ✅ Test both `resume.tsx` (web) and `resume-pdf.tsx` (PDF) if layout changes
- ✅ Verify PDF download button still works
- ❌ Don't create new docs without explicit request
- ❌ Don't change sorting logic without understanding web vs PDF differences

### Guardrails

- Keep styling minimal (no borders/shadows/primary accents on cards).
- Restrict `roles` to the canonical set: ['Design','Development','Project Management'].
- All project images live under `public/images/clients/`.
- The first sentence of `basics.summary` must be: "Martin Heßmann – Digital Design Manager & Product Generalist."
- Do NOT include client names in `keywords` (use `entity` field).
