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

## TODO - Header Bar Enhancements
- [ ] Add MH Ligatur Logo in top left corner
- [ ] Make logo clickable to show "About the Author" dropdown menu
- [ ] Add menu items: "About Martin Heßmann" and "About the Project"
- [ ] Create "About Martin Heßmann" window with photo, name, address, email, URL, and copyright info
- [ ] Create "About the Project" window describing the development process (built in Cursor, first commit date, GitHub project link, Vercel hosting info, and concept behind the desktop simulation)

## TODO - Date Section
- [ ] Enhance to display day, date, and time in the header