import { create } from 'zustand'
import { ReactNode } from 'react'

// Mobile app state types
export interface MobileAppState {
  id: string
  title: string
  icon: string
  isOpen: boolean
  component: ReactNode
}

interface MobileAppOptions {
  id: string
  title: string
  icon: string
  component: ReactNode
}

interface MobileAppStoreState {
  currentApp: MobileAppState | null
  // App management actions
  openApp: (appId: string) => void
  closeApp: () => void
  registerApp: (options: MobileAppOptions) => void
}

export const useMobileAppStore = create<MobileAppStoreState>((set) => ({
  currentApp: null,

  // Open an app (only one can be open at a time on mobile)
  openApp: (appId: string) => {
    // This will be handled by the MobileDesktop component
    // which will register apps and handle the opening logic
    set((state) => {
      console.log('[mobile-store] openApp called:', { appId })
      return state
    })
  },

  // Close the current app and return to home screen
  closeApp: () => {
    set(() => ({
      currentApp: null
    }))
  },

  // Register an app for mobile use
  registerApp: (options: MobileAppOptions) => {
    // This is called when an app is opened
    const newApp: MobileAppState = {
      ...options,
      isOpen: true
    }

    set(() => ({
      currentApp: newApp
    }))
  }
}))