# Mobile Implementation - iOS Style Interface

## Overview

This project now supports both desktop (macOS simulation) and mobile (iOS simulation) interfaces. The mobile version automatically activates on mobile devices and smaller screens (≤768px).

## Mobile Components

### 1. Mobile Detection
- **File**: `hooks/use-mobile.tsx`
- Uses screen size and device detection to determine if mobile interface should be used
- Automatically switches between desktop and mobile layouts

### 2. iOS Home Screen
- **File**: `components/mobile-home-screen.tsx`
- Mimics iOS home screen with app icons in a 4-column grid
- Features:
  - iOS-style status bar with time and battery indicator
  - Profile section with name and title
  - App grid with touch-friendly icon buttons
  - Haptic feedback on app tap (if supported)
  - Home indicator at bottom

### 3. Mobile App Container
- **File**: `components/mobile-app-container.tsx`
- Fullscreen app container that replaces desktop windows
- Features:
  - Slide-up animation when opening
  - App header with icon, title, and close button
  - Fullscreen content area
  - iOS-style home indicator
  - Close button returns to home screen

### 4. Mobile Desktop Manager
- **File**: `components/mobile-desktop.tsx`
- Coordinates between home screen and app containers
- Manages app state and navigation
- Reuses all existing window content components

### 5. Mobile App Store
- **File**: `lib/store/mobile-app-store.ts`
- Zustand store for mobile app state management
- Handles single-app-at-a-time mobile paradigm
- Manages app opening/closing and current app state

## Available Apps

All desktop apps are available on mobile:

1. **Projects** - Portfolio and web projects
2. **Stories** - Success stories and case studies  
3. **Messages** - Contact and communication
4. **Notes** - Personal notes and thoughts
5. **Legal** - Legal notice and privacy information

## User Experience

### Mobile Navigation
- Tap app icon to open fullscreen app
- Tap X button in top-right corner to close app and return to home screen
- Slide-up animation when opening apps
- Haptic feedback on supported devices

### Responsive Design
- Automatically detects mobile devices and small screens
- Seamless switching between desktop and mobile interfaces
- All content optimized for touch interaction
- iOS-style visual design with proper spacing and typography

## Technical Implementation

### Architecture
The mobile implementation follows a similar pattern to the desktop version but adapts for mobile constraints:

- **Single app focus**: Only one app can be open at a time
- **Fullscreen apps**: No windowing system, apps take full screen
- **Touch-first**: All interactions designed for touch
- **iOS aesthetics**: Visual design matches iOS conventions

### Integration
The mobile and desktop versions share:
- All window content components (`components/windows/*`)
- Data and content systems
- Theme and styling system
- App icons and assets

### State Management
- Desktop uses `useWindowStore` for multi-window management
- Mobile uses `useMobileAppStore` for single-app management
- Both share the same content components seamlessly

## Testing

To test the mobile interface:
1. Open the site on a mobile device, or
2. Use browser dev tools to simulate mobile screen size (≤768px), or
3. Use touch device simulation in dev tools

The interface will automatically switch to mobile mode and display the iOS-style home screen.