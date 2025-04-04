# Components

## Window System
- **Window**: Base window component with macOS-style controls (red, yellow, green buttons)
- **WindowHeader**: Title bar with controls and drag handle
- **WindowContent**: Main content area with overflow handling

## Window Components

Specific window components and their implementations:

- **App**: Main application container - [Documentation](app.md)
- **Projects**: Project showcase component - [Documentation](projects.md)
- **Success Stories**: Coming soon
- **Client Partnerships**: Coming soon

## Color System Update (April 2024)

All components have been updated to use the standardized Shadcn UI color variables:

- `bg-background`, `text-foreground` for base elements
- `bg-card`, `text-card-foreground` for card elements
- `bg-primary`, `text-primary-foreground` for primary elements
- `bg-secondary`, `text-secondary-foreground` for secondary elements
- `bg-muted`, `text-muted-foreground` for muted elements
- `border-border` for standard borders
- `border-input` for form input borders

This replaces the previous custom naming convention (bg-bg, text-txt, border-bd).
For full details on the color system, see [Theme](theme.md).

## UI Components

### Card
- Base container with consistent styling
- Support for hover states
- Configurable padding and borders

### Button
- Multiple variants (primary, secondary, ghost)
- Loading state support
- Icon integration

### Input Fields
- Text inputs with consistent styling
- Search input with integrated icon
- Form validation integration

## Primitive Components

For detailed documentation of UI primitives, see [Primitives](primitives.md).

### Typography
- Headings (h1-h6)
- Body text variants
- Specialized text components (code, quote)

### Layout
- Stack: Vertical spacing between elements
- Grid: Responsive grid system
- Divider: Horizontal rule with consistent styling

### Feedback
- Alert: Status messaging
- Toast: Temporary notifications
- Progress: Loading indicators

## Icons
- Custom icon components
- Support for different sizes
- Consistent stroke width and styling

## Animation
- Transition components
- Loading animations
- Micro-interactions