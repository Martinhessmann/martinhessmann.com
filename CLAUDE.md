# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (runs on localhost:3000)
- `npm run build` - Build production application  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 14 application that creates a macOS desktop simulation with draggable windows, dock, and mobile responsiveness.

### Core Architecture

- **Next.js App Router** - Uses app directory structure with layout.tsx and page.tsx
- **Desktop Simulation** - Renders either Desktop or MobileDesktop based on device detection
- **Window Management** - Zustand store manages window state (position, size, focus, minimize)
- **Responsive Design** - Separate mobile and desktop implementations

### Key Components

- `app/layout.tsx` - Root layout with ThemeProvider and Header
- `app/page.tsx` - Main page that renders Desktop or MobileDesktop
- `components/desktop.tsx` - Desktop implementation with window management
- `components/mobile-desktop.tsx` - Mobile iOS-style interface
- `components/window.tsx` - Draggable window component
- `components/dock.tsx` - macOS-style dock with app icons

### State Management

- **Window Store** (`lib/store/window-store.ts`) - Controls window lifecycle, positioning, focus
- **Mobile App Store** (`lib/store/mobile-app-store.ts`) - Manages mobile app states
- **Theme Store** (`lib/store/theme-store.ts`) - Theme switching functionality

### Window System

Windows are defined in `components/windows/` directory:
- `projects.tsx` - Project showcase
- `stories.tsx` - Success stories
- `messages.tsx` - Contact messages
- `notes.tsx` - Personal notes
- `legal-notice.tsx` - Legal information

### Data Layer

JSON files in `data/` directory provide content:
- `projects.json` - Project information
- `stories.json` - Success stories
- `messages.json` - Contact messages
- `notes.json` - Personal notes

### Styling System

- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - Theme colors defined in globals.css
- **Responsive Design** - Mobile-first approach with desktop enhancements
- **Custom Color System** - HSL-based color scales for light/dark themes

### Mobile Implementation

- iOS-style interface with home screen and app switching
- Touch-friendly components and gestures
- Separate mobile components for optimized experience
- Uses same desktop background aligned to left half for consistency
- Interactive widgets that open corresponding apps
- Unified app styling across mobile and desktop components

### File Structure Notes

- `app/` - Next.js app router pages and layouts
- `components/` - React components (desktop, mobile, windows, UI)
- `components/ui/` - Shadcn/UI components
- `components/primitives/` - Reusable UI building blocks
- `lib/` - Utilities, stores, and helper functions
- `data/` - JSON content files (projects.json sorted alphabetically by title)
- `docs/` - Comprehensive project documentation
- `public/` - Static assets including app icons and images

## Important Development Notes

- Mobile and desktop are separate implementations, not responsive variants
- Window management is handled entirely through Zustand store
- Theme switching uses next-themes with CSS variables
- All images use Next.js Image component for optimization
- TypeScript is configured with strict mode enabled
- Mobile interface uses consistent styling with desktop (same ProjectCard components)
- All borders use subtle `border-white/5` for dark mode consistency
- Projects data includes comprehensive technology and role information