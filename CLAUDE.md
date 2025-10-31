# CLAUDE.md

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

- `app/layout.tsx` - Root layout with ThemeProvider
- `app/page.tsx` - Main resume page that renders Resume component
- `components/resume.tsx` - Single unified Resume component that renders JSON Resume schema
- `components/theme-provider.tsx` - Theme switching functionality
- `components/theme-toggle.tsx` - Theme toggle button
- `components/theme-favicon.tsx` - Dynamic favicon based on theme

### State Management

- **Theme Store** (`lib/store/theme-store.ts`) - Theme switching functionality
- **Zustand** - Minimal state management where needed

### Data Layer

- `data/resume.json` - All resume content following JSON Resume schema
- Extended fields: `roles`, `entity`, `image` for projects
- All content is type-safe via `types/resume.ts`

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

- All resume content is managed through `data/resume.json`
- The Resume component automatically renders any section that contains data
- Project data includes extended fields: `roles`, `entity`, `image`
- All images use Next.js Image component for optimization
- TypeScript is configured with strict mode enabled
- Theme switching uses next-themes with CSS variables
- Print styles ensure clean PDF exports

