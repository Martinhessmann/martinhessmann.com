"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminState {
  isAdminMode: boolean
  isHydrated: boolean
  toggleAdminMode: () => void
  setHydrated: () => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAdminMode: false,
      isHydrated: false,
      toggleAdminMode: () => set((state) => ({ isAdminMode: !state.isAdminMode })),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'admin-store',
      // Only persist the isAdminMode state, not the hydration status
      partialize: (state) => ({ isAdminMode: state.isAdminMode }),
      onRehydrateStorage: () => (state) => {
        // Mark as hydrated when rehydration is complete
        if (state) {
          state.setHydrated()
        }
      },
    }
  )
)
