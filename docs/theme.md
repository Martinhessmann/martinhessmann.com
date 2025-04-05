# Color System Documentation

This document outlines the color system used in the project, which follows a structured, semantic approach using Tailwind CSS.

## 🔄 Updated Color System (April 2024)

The color system has been refactored to eliminate duplications and create a single source of truth. Key changes:

1. Consolidated to a single configuration file (`tailwind.config.ts`)
2. Moved all color definitions to `app/globals.css` using the `theme()` function
3. Standardized on Shadcn UI semantic color naming conventions

### How It Works Now

1. **Base color scales** are defined as HSL values in `globals.css`:
   ```css
   --neutral-50: 0 0% 98%;
   --blue-600: 210 100% 45%;
   --red-700: 0 100% 40%;
   /* etc. */
   ```

2. **Semantic variables** map to these colors using the `theme()` function:
   ```css
   --background: theme(colors.neutral.50);
   --foreground: theme(colors.neutral.950);
   --primary: theme(colors.blue.600);
   /* etc. */
   ```

3. **Tailwind config** references these CSS variables:
   ```typescript
   colors: {
     neutral: {
       50: "hsl(var(--neutral-50))",
       // etc.
     },
     background: "hsl(var(--background))",
     foreground: "hsl(var(--foreground))",
     // etc.
   }
   ```

## Semantic Color Variables

Our color system uses semantic variables that describe the purpose of the color rather than its visual appearance. This makes it easier to maintain a consistent UI and design language.

### Color Usage

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--background` | neutral-50 | neutral-950 | Main background color |
| `--foreground` | neutral-950 | neutral-50 | Primary text color |
| `--card` | neutral-50 | neutral-950 | Card backgrounds |
| `--card-foreground` | neutral-950 | neutral-50 | Card text |
| `--popover` | neutral-50 | neutral-950 | Popover backgrounds |
| `--popover-foreground` | neutral-950 | neutral-50 | Popover text |
| `--primary` | blue-600 | blue-600 | Primary actions/accents |
| `--primary-foreground` | neutral-50 | neutral-50 | Text on primary colors |
| `--secondary` | neutral-100 | neutral-800 | Secondary backgrounds |
| `--secondary-foreground` | neutral-950 | neutral-50 | Text on secondary backgrounds |
| `--muted` | neutral-100 | neutral-800 | Muted backgrounds |
| `--muted-foreground` | neutral-500 | neutral-400 | Secondary/muted text |
| `--accent` | blue-600 | blue-600 | Accent elements |
| `--accent-foreground` | neutral-950 | neutral-50 | Text on accent colors |
| `--destructive` | red-700 | red-700 | Destructive actions |
| `--destructive-foreground` | neutral-50 | neutral-50 | Text on destructive colors |
| `--border` | neutral-200 | neutral-700 | Standard borders |
| `--input` | neutral-200 | neutral-700 | Form input borders |
| `--ring` | blue-600 | blue-600 | Focus rings |

## Usage in Tailwind

The semantic colors are available in Tailwind through utility classes:

```jsx
<div className="bg-background text-foreground">Default background and text</div>
<div className="bg-card text-card-foreground">Card styling</div>
<div className="bg-primary text-primary-foreground">Primary button</div>
<div className="bg-secondary text-secondary-foreground">Secondary button</div>
<div className="text-muted-foreground">Secondary text</div>
<div className="border-border">Standard border</div>
```

## Color Scales

For specific shades beyond semantic colors, we use color scales:

```jsx
<div className="bg-neutral-50">Lightest neutral</div>
<div className="bg-neutral-950">Darkest neutral</div>
<div className="bg-blue-600">Primary blue</div>
<div className="bg-red-700">Destructive red</div>
```

## ⚠️ Migration Note

The previous semantic color system using `bg-bg`, `text-txt`, and `border-bd` prefixes has been deprecated. All components have been updated to use the standardized Shadcn UI semantic color conventions:

| Old Style | New Style |
|-----------|-----------|
| `bg-bg` | `bg-background` |
| `bg-bg-subtle` | `bg-muted` or `bg-secondary` |
| `bg-bg-strong` | `bg-secondary` |
| `text-txt` | `text-foreground` |
| `text-txt-subtle` | `text-muted-foreground` |
| `border-bd` | `border-border` |

This standardization ensures consistency with the component library and simplifies maintainability.

## Planned Theme System Improvements

The current theme implementation is limited to a forced dark theme without user preferences. We plan to make the following improvements:

1. **User preference detection**
   - Respect the `prefers-color-scheme` media query
   - Store user theme preference in localStorage
   - Apply the preferred theme on initial load

2. **Theme toggle component**
   - Add a minimalistic theme switch button in the header
   - Create smooth transitions between themes
   - Ensure the toggle is accessible

3. **Complete semantic color usage**
   - Audit all components to ensure they use semantic color variables
   - Eliminate any hardcoded color values
   - Ensure all components respond correctly to theme changes

4. **Implementation plan**
   - Reintroduce ThemeProvider with proper configuration
   - Create a theme toggle component using Shadcn UI
   - Update the CSS variables in globals.css
   - Test theme switching with all components

These improvements will create a more user-friendly experience while maintaining the macOS desktop simulation aesthetic in both light and dark modes.