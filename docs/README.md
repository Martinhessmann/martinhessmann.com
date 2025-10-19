# Project Documentation

This directory contains documentation for the resume website project.

## Available Documentation

### Project Overview
- [Resume Refactoring](resume-refactoring.md) - Complete transformation plan from desktop simulation to clean resume site

### Design System
- [Theme System](theme.md) - Documentation of the color system and theming
- [Color System Refactoring](color-system-refactoring.md) - Details about April 2024 color system improvements
- [UI Guidelines](ui-guidelines.md) - Design principles, spacing, typography, and accessibility guidelines

## Project Structure

This is now a clean, content-focused resume website built with:
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **JSON Resume** standard as single source of truth
- **Shadcn/ui** components for consistent UI

## Key Features

- Single unified `Resume` component that dynamically renders JSON Resume schema
- Print-optimized layout for PDF generation
- Dark/light theme support
- Mobile-responsive design
- Clean, minimal styling with zero custom CSS needed

## Content Management

All resume content is managed through `data/resume.json` following the JSON Resume standard. The component automatically renders any section that contains data.