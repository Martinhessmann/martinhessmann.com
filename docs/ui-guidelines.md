# UI Guidelines and Component System

## Design Principles
- **Consistency**: Use predefined components and styles
- **Accessibility**: Follow WCAG 2.1 guidelines
- **Responsiveness**: Mobile-first approach
- **Performance**: Optimize for Core Web Vitals

## Component Library Structure
- **Primitives**: Basic building blocks (Typography, Layout, Feedback)
- **UI Components**: Shadcn/UI based components
- **Composite Components**: Complex, application-specific components

## Typography
- **Font**: System UI for content, Monospace System for code
- **Scale**:
  - xs: 0.75rem
  - sm: 0.875rem
  - base: 1rem
  - lg: 1.125rem
  - xl: 1.25rem

## Colors
- **Base**
  - background: Light/Dark mode system colors
  - foreground: Text and primary content
- **UI Elements**
  - primary: System accent color
  - secondary: Neutral greys
  - muted: Subtle backgrounds
  - border: Separation and structure
- **Semantic Color System** ⭐
  - See detailed documentation in [theme.md](theme.md)
  - Based on GitLab's design system approach
  - Uses purpose-based naming (bg-*, bd-*, txt-*)
  - Provides consistent colors across light/dark modes

## Spacing
- **Grid**: 4px base unit (0.25rem)
- **Padding**:
  - Compact: 0.5rem
  - Default: 1rem
  - Loose: 1.5rem
- **Gaps**: 0.5rem - 1rem between related items

## Interactive Elements
- **Hover States**: Subtle background change (5% opacity)
- **Focus States**: Visible outline with 2px width
- **Active States**: Slight depression effect
- **Transitions**: 200ms duration, ease-in-out

## Container Queries
- xs: < 640px (mobile)
- sm: ≥ 640px (tablet portrait)
- md: ≥ 768px (tablet landscape)
- lg: ≥ 1024px (desktop)
- xl: ≥ 1280px (large desktop)
- 2xl: ≥ 1536px (extra large)

## Component Usage Guidelines
1. **Windows**
   - Use Card component as base
   - Consistent header styling
   - Standard padding (1rem)
   - Unified drag handle area

2. **Lists and Grids**
   - Responsive grid system
   - Consistent gap spacing
   - Standard card dimensions

3. **Forms and Inputs**
   - Label alignment
   - Error state handling
   - Loading state indicators

4. **Navigation**
   - Consistent hover states
   - Active state indicators
   - Focus management

## Accessibility Requirements
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast
- Focus visible states