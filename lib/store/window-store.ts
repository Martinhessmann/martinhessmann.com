import { create } from 'zustand'
import { ReactNode } from 'react'

// Window position and size types
export interface WindowPosition {
  x: number
  y: number
}

export interface WindowSize {
  width: number
  height: number
}

// Window state types
export interface WindowState {
  id: string
  title: string
  icon: string
  isOpen: boolean
  isMinimized: boolean
  isFocused: boolean
  position: WindowPosition
  size: WindowSize
  component: ReactNode
  zIndex: number
}

interface WindowOptions {
  id: string
  title: string
  icon: string
  component: ReactNode
  position: WindowPosition
  size: WindowSize
}

interface WindowStoreState {
  windows: WindowState[]
  nextZIndex: number
  // Window management actions
  addWindow: (options: WindowOptions) => void
  focusWindow: (windowId: string) => void
  toggleMinimize: (windowId: string) => void
  closeWindow: (windowId: string) => void
  updatePosition: (windowId: string, newPosition: WindowPosition) => void
  updateSize: (windowId: string, newSize: WindowSize) => void
}

export const useWindowStore = create<WindowStoreState>((set) => ({
  windows: [],
  nextZIndex: 100,

  // Add/open a window
  addWindow: (options: WindowOptions) => {
    console.log('[store] addWindow:', { options })
    set((state: WindowStoreState) => {
      // Check if window already exists
      const existingWindow = state.windows.find(w => w.id === options.id)

      // If window exists, open/restore it and focus it
      if (existingWindow) {
        console.log('[store] Window exists, updating:', { windowId: options.id })
        const highestZIndex = Math.max(...state.windows.map(w => w.zIndex), 0)

        return {
          windows: state.windows.map((window) => ({
            ...window,
            isOpen: window.id === options.id ? true : window.isOpen,
            isMinimized: window.id === options.id ? false : window.isMinimized,
            isFocused: window.id === options.id,
            zIndex: window.id === options.id ? highestZIndex + 1 : window.zIndex
          })),
          nextZIndex: highestZIndex + 2
        }
      }

      // Otherwise create new window
      console.log('[store] Creating new window:', { windowId: options.id })
      const newWindow: WindowState = {
        ...options,
        isOpen: true,
        isMinimized: false,
        isFocused: true,
        zIndex: state.nextZIndex
      }

      // Unfocus other windows
      const updatedWindows = state.windows.map(window => ({
        ...window,
        isFocused: false
      }))

      return {
        windows: [...updatedWindows, newWindow],
        nextZIndex: state.nextZIndex + 1
      }
    })
  },

  // Focus a window and bring it to front
  focusWindow: (windowId: string) => {
    console.log('[store] focusWindow:', { windowId })
    set((state: WindowStoreState) => {
      const windowToFocus = state.windows.find(w => w.id === windowId)

      // If window doesn't exist, return current state
      if (!windowToFocus) {
        console.log('[store] Window not found:', { windowId })
        return state
      }

      // Find highest z-index
      const highestZIndex = Math.max(...state.windows.map(w => w.zIndex), 0)
      console.log('[store] Focusing window:', { windowId, newZIndex: highestZIndex + 1 })

      return {
        windows: state.windows.map(window => ({
          ...window,
          // Focus this window, unfocus others
          isFocused: window.id === windowId,
          // Ensure window is open and not minimized when focused
          isOpen: window.id === windowId ? true : window.isOpen,
          isMinimized: window.id === windowId ? false : window.isMinimized,
          // Bring focused window to front
          zIndex: window.id === windowId ? highestZIndex + 1 : window.zIndex
        })),
        nextZIndex: highestZIndex + 2
      }
    })
  },

  // Toggle window minimization
  toggleMinimize: (windowId: string) => {
    console.log('[store] toggleMinimize:', { windowId })
    set((state: WindowStoreState) => {
      const windowToUpdate = state.windows.find(w => w.id === windowId)

      // If window doesn't exist, return current state
      if (!windowToUpdate) {
        console.log('[store] Window not found:', { windowId })
        return state
      }

      console.log('[store] Toggling minimize:', {
        windowId,
        currentlyMinimized: windowToUpdate.isMinimized
      })

      return {
        windows: state.windows.map(window => ({
          ...window,
          // Toggle minimized state for this window
          isMinimized: window.id === windowId ? !window.isMinimized : window.isMinimized,
          // Unfocus when minimized
          isFocused: window.id === windowId ? false : window.isFocused
        }))
      }
    })
  },

  // Close a window
  closeWindow: (windowId: string) => {
    console.log('[store] closeWindow:', { windowId })
    set((state: WindowStoreState) => ({
      windows: state.windows.map(window => ({
        ...window,
        // Mark as closed
        isOpen: window.id === windowId ? false : window.isOpen,
        // Unfocus when closed
        isFocused: window.id === windowId ? false : window.isFocused
      }))
    }))
  },

  // Update window position
  updatePosition: (windowId: string, newPosition: WindowPosition) => {
    console.log('[store] updatePosition:', { windowId, newPosition })
    set((state: WindowStoreState) => {
      const windowToUpdate = state.windows.find(w => w.id === windowId)
      if (!windowToUpdate) {
        console.log('[store] Window not found for position update:', { windowId })
        return state
      }

      console.log('[store] Current window position:', {
        windowId,
        oldPosition: windowToUpdate.position,
        newPosition
      })

      return {
        windows: state.windows.map(window => ({
          ...window,
          // Update position for this window only
          position: window.id === windowId ? newPosition : window.position
        }))
      }
    })
  },

  // Update window size
  updateSize: (windowId: string, newSize: WindowSize) => {
    console.log('[store] updateSize:', { windowId, newSize })
    set((state: WindowStoreState) => {
      const windowToUpdate = state.windows.find(w => w.id === windowId)
      if (!windowToUpdate) {
        console.log('[store] Window not found for size update:', { windowId })
        return state
      }

      console.log('[store] Current window size:', {
        windowId,
        oldSize: windowToUpdate.size,
        newSize
      })

      return {
        windows: state.windows.map(window => ({
          ...window,
          // Update size for this window only
          size: window.id === windowId ? newSize : window.size
        }))
      }
    })
  }
}))