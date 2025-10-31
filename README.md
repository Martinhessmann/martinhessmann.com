# Martin Heßmann

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
- **components/resume.tsx** - Single unified Resume component that dynamically renders JSON Resume schema
- **data/resume.json** - All resume content following JSON Resume standard

## Key Features

- Single unified `Resume` component that dynamically renders JSON Resume schema
- Print-optimized layout for PDF generation
- Dark/light theme support
- Mobile-responsive design
- Clean, minimal styling