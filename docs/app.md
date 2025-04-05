# App Component

This document describes the root App component that creates a macOS desktop simulation with draggable windows, a dock, and other macOS-inspired UI elements.

## Completed Features
- [x] Basic macOS desktop simulation layout
- [x] Draggable windows with focus management
- [x] Window controls (minimize, maximize, close)
- [x] Mac-style dock with application icons
- [x] Dark mode UI design
- [x] Content windows for Projects, Stories, Messages, and Notes
- [x] Client-only clock component to prevent hydration errors
- [x] Diagonal (corner) resizing functionality
- [x] Text selection behavior during dragging and resizing
- [x] Boundary constraints to keep window headers always visible on screen

## Navigation Components

The application uses two separate navigation components:

- **Dock**: The `Dock` component (`components/dock.tsx`) provides a macOS-style dock at the bottom of the screen, used for launching window applications.
- **Navigation**: The `Navigation` component (`components/navigation.tsx`) provides a traditional website navigation bar, used for standard website sections.

These components serve different purposes and both may be active depending on the application context.

## Window Management

The App component manages multiple window components using a state structure stored in Zustand. Each window has properties like:

```jsx
{
  id: 'window-id',
  title: 'Window Title',
  icon: '/path/to/icon.png',
  isOpen: true,
  isMinimized: false,
  isFocused: false,
  position: { x: 400, y: 100 },
  component: <WindowComponent />,
  zIndex: 100
}
```

## Data Sources

The App component doesn't directly use a specific JSON file, but it orchestrates the loading of window components which each use their own data sources:

- **Projects**: Uses `data/projects.json`
- **Notes**: Uses `data/notes.json`
- **Stories**: Uses `data/stories.json`
- **Messages**: Uses `data/messages.json`

## Next.js File Architecture

The application uses the Next.js App Router architecture with a clear separation of concerns:

1. **app/layout.tsx**:
   - Root layout that defines the overall HTML structure
   - Sets up metadata (title, description, favicon, etc.)
   - Configures ThemeProvider and global styles
   - Includes font imports and the Header component
   - Serves as a shell that wraps all pages

2. **app/page.tsx**:
   - Simple component for the root route (/)
   - Required by Next.js App Router for the homepage
   - Only responsible for rendering the Desktop component

3. **components/desktop.tsx**:
   - Client component that implements the actual desktop simulation UI
   - Manages window state (position, focus, minimize, etc.)
   - Handles the window initialization logic
   - Includes the dock, windows, background, and other UI elements

These files should not be combined as they serve different purposes in the Next.js architecture. This separation follows Next.js best practices and provides better code organization by separating:
- App-wide layout configuration
- Route definition
- Actual interactive UI implementation

## TODO - Header Bar Enhancements
- [x] Add MH Ligatur Logo in top left corner
- [x] Make logo clickable to show "About the Author" dropdown menu
- [x] Add menu items: "About Martin Heßmann" and "About the Project"
- [x] Create "About Martin Heßmann" window with photo, name, address, email, URL, and copyright info
- [x] Create "About the Project" window describing the development process (built in Cursor, first commit date, GitHub project link, Vercel hosting info, and concept behind the desktop simulation)

## TODO - Date Section
- [x] Enhance to display day, date, and time in the header

## Current Issues and TODOs

### Theme System Improvements
- [x] Reimplement user preferred color scheme detection (respect `prefers-color-scheme`)
- [x] Add a minimalistic theme switch button in the header.tsx component
- [x] Refactor UI components to use semantic color variables for easy theme switching
- [x] Create a consistent color system where theme changes only need to modify root CSS variables

### Window Interaction Fixes
- [ ] Fix window movement issues when dragging close to screen boundaries
- [ ] Improve resizing behavior for windows, especially corner resizing
- [ ] Ensure resizing maintains minimum window dimensions (w=400px,h=270px)
- [x] Fix z-index management when interacting with multiple windows

### Performance Optimizations
- [ ] Optimize window rendering to reduce repaints during movement
- [ ] Implement proper cleanup for event listeners
- [ ] Add debouncing for window resize events