# Color System Documentation

This document outlines the color system used in the project, which follows a structured, semantic approach inspired by GitLab's design system.

## Semantic Color Variables

Our color system uses semantic variables that describe the purpose of the color rather than its visual appearance. This makes it easier to maintain a consistent UI and design language.

### Background Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--background-color-default` | Neutral-950 | Main background color |
| `--background-color-subtle` | Neutral-900 | Subtle backgrounds, cards, inputs |
| `--background-color-strong` | Neutral-800 | Emphasized backgrounds, headers |
| `--background-color-disabled` | Neutral-900 | Disabled elements |
| `--background-color-overlap` | Neutral-900 | Overlapping elements |
| `--background-color-section` | Neutral-800 | Section backgrounds |
| `--background-color-overlay` | Black 64% | Modal overlays |

### Border Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--border-color-default` | Neutral-700 | Standard borders |
| `--border-color-subtle` | Neutral-800 | Subtle borders |
| `--border-color-strong` | Neutral-600 | Emphasized borders |
| `--border-color-transparent` | Transparent | Invisible borders (for layout) |

### Text Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--text-color-default` | Neutral-50 | Primary text |
| `--text-color-subtle` | Neutral-400 | Secondary text |
| `--text-color-disabled` | Neutral-600 | Disabled text |
| `--text-color-inverted` | Neutral-950 | Text on colored backgrounds |

## Usage in Tailwind

The semantic colors are available in Tailwind through custom utility classes:

### Background Colors

```jsx
<div className="bg-bg">Default background</div>
<div className="bg-bg-subtle">Subtle background</div>
<div className="bg-bg-strong">Strong background</div>
<div className="bg-bg-disabled">Disabled background</div>
<div className="bg-bg-overlap">Overlap background</div>
<div className="bg-bg-section">Section background</div>
<div className="bg-bg-overlay">Overlay background</div>
```

### Border Colors

```jsx
<div className="border border-bd">Default border</div>
<div className="border border-bd-subtle">Subtle border</div>
<div className="border border-bd-strong">Strong border</div>
<div className="border border-bd-transparent">Transparent border</div>
```

### Text Colors

```jsx
<div className="text-txt">Default text</div>
<div className="text-txt-subtle">Subtle text</div>
<div className="text-txt-disabled">Disabled text</div>
<div className="text-txt-inverted">Inverted text</div>
```

## Neutral Color Scale

The semantic colors are built on a neutral color scale, which provides consistent gray tones across the application:

```jsx
// Light grays to dark grays
<div className="bg-neutral-50">Neutral 50</div>
<div className="bg-neutral-100">Neutral 100</div>
<div className="bg-neutral-200">Neutral 200</div>
<div className="bg-neutral-300">Neutral 300</div>
<div className="bg-neutral-400">Neutral 400</div>
<div className="bg-neutral-500">Neutral 500</div>
<div className="bg-neutral-600">Neutral 600</div>
<div className="bg-neutral-700">Neutral 700</div>
<div className="bg-neutral-800">Neutral 800</div>
<div className="bg-neutral-900">Neutral 900</div>
<div className="bg-neutral-950">Neutral 950</div>
```

## Compatibility with Shadcn/UI

This color system is designed to work alongside the existing Shadcn/UI color variables. For components provided by Shadcn/UI, it's still appropriate to use their color variables:

- `bg-background`, `text-foreground` for base elements
- `bg-card`, `text-card-foreground` for card elements
- `bg-primary`, `text-primary-foreground` for primary actions
- `bg-secondary`, `text-secondary-foreground` for secondary actions
- `bg-muted`, `text-muted-foreground` for muted elements
- `bg-accent`, `text-accent-foreground` for accented elements

## Migration Guide

When updating existing components to use the new color system:

1. Replace background colors:
   - `bg-background` → `bg-bg`
   - `bg-secondary` → `bg-bg-subtle`
   - `bg-muted` → `bg-bg-subtle`

2. Replace border colors:
   - `border-border` → `border-bd`
   - `border-input` → `border-bd-subtle`

3. Replace text colors:
   - `text-foreground` → `text-txt`
   - `text-muted-foreground` → `text-txt-subtle`

4. For opacity variants, use the semantic color directly:
   - `bg-background/30` → `bg-bg-subtle/50`
   - `border-input/30` → `border-bd-subtle`