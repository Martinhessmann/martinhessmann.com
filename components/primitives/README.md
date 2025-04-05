# UI Primitives

This directory contains reusable UI primitives that can be used across different components in the application.

## Search Input

The `SearchInput` component provides a consistent search input with an icon.

```tsx
import { SearchInput } from '@/components/primitives/search-input'

<SearchInput
  placeholder="Search..."
  onChange={(e) => setSearchTerm(e.target.value)}
  value={searchTerm}
  className="my-custom-class" // Optional
  iconClassName="text-primary" // Optional
/>
```

### Props

- `placeholder`: Text placeholder
- `onChange`: Input change handler
- `value`: Input value
- `className`: Optional custom class for the input element
- `iconClassName`: Optional custom class for the search icon
- All standard HTML input attributes are also supported

## Filter Tags

The `FilterTags` component displays a list of selectable filter options with optional icon.

```tsx
import { FilterTags } from '@/components/primitives/filter-tags'

<FilterTags
  options={['Option 1', 'Option 2', 'Option 3']}
  selected={selectedOption}
  onChange={setSelectedOption}
  allLabel="All Items" // Optional
  className="my-custom-class" // Optional
  icon={<CustomIcon />} // Optional
/>
```

### Props

- `options`: Array of string options to display
- `selected`: Currently selected option
- `onChange`: Handler for when selection changes
- `allLabel`: Text for the "All" option (defaults to "All")
- `className`: Optional custom class for the container
- `icon`: Optional custom icon (defaults to a tag icon)

## Empty State

The `EmptyState` component displays a message when no results are found, with an optional action button.

```tsx
import { EmptyState } from '@/components/primitives/empty-state'

<EmptyState
  message="No items found."
  actionLabel="Clear filters" // Optional
  onAction={handleClearFilters} // Optional
  icon={<CustomIcon />} // Optional
  height="h-[200px]" // Optional
  className="my-custom-class" // Optional
/>
```

### Props

- `message`: Message to display
- `actionLabel`: Optional text for the action button
- `onAction`: Optional handler for the action button
- `icon`: Optional icon to display above the message
- `height`: Optional height (defaults to "h-[120px]")
- `className`: Optional custom class for the container

## Layout Components

### Window

The `Window` component creates a macOS-style window with title bar and controls.

See `components/window.tsx` for more details.

## Other Primitives

Additional primitives may be added as the application grows. Follow these guidelines when creating new primitives:

1. Keep components small and focused on a single responsibility
2. Use TypeScript interfaces for props
3. Provide sensible defaults
4. Use the `cn` utility for class name composition
5. Support className prop for custom styling
6. Follow the existing naming conventions