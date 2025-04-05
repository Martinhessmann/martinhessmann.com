# Window Components

This directory contains components that represent application windows in the macOS desktop simulation.

## Projects Component

The `Projects` component displays a grid of web project cards with filtering and search capabilities.

### Features

- Responsive grid layout that adapts to different screen sizes
- Search functionality for filtering projects by title, description, or URL
- Category filtering using technology tags (WordPress, Next.js, etc.)
- Project cards with hover effects and visual hierarchy
- Empty state for when no projects match the search criteria

### Component Structure

```
Projects
├── Header Section
│   ├── Search Input
│   └── Category Filters
└── Project Grid
    └── ProjectCard (Reusable component)
        ├── Image Area
        ├── Title
        ├── Description
        ├── URL
        ├── Since Year
        └── Technology & Role Tags
```

### Usage

This component is designed to be rendered inside a `Window` component from the desktop:

```tsx
// Example in desktop.tsx
{
  id: 'projects',
  title: 'Projects',
  icon: '/images/app-icons/04 Chrome.png',
  isOpen: true,
  isMinimized: false,
  isFocused: false,
  position: { x: 400, y: 100 },
  component: <Projects />,
  zIndex: 102
}
```

### Data Model

The component uses the `getAllWebProjects` and `getProjectCategories` functions from the app content library to fetch project data. Each project follows this structure:

```typescript
interface WebProject {
  id: string
  title: string
  url: string
  description: string
  lastUpdated: string
  technologies: Technology[]
  category: Category
  roles: Role[]
  since: string
  image: string
  themeColor?: string
}
```

### Design Decisions

1. **Separated ProjectCard Component**: Extracted the card into its own component for reusability and cleaner code
2. **ScrollArea from Shadcn/UI**: Used for smooth scrolling with proper overflow handling
3. **Responsive Grid**: Uses native CSS Grid with column configuration based on viewport size
4. **Empty State**: Shows a message with a clear filter button when no results are found
5. **Optimized Images**: Uses Next.js Image component with proper loading attributes
6. **Compact UI**: Smaller text and tighter spacing to fit well in the window container
7. **Semi-transparent UI Elements**: Creates a more integrated feel with the macOS-style desktop

### Accessibility Considerations

- Interactive elements have hover states
- Cards have proper focus outlines when tabbed to
- Images have descriptive alt text
- Color contrast follows WCAG guidelines
- Keyboard navigation supported

## Stories Component

Coming soon...

## Messages Component

Coming soon...

## Notes Component

Coming soon...