import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeState = {
  theme: 'light' | 'dark' | 'system'
  systemTheme: 'light' | 'dark'
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setSystemTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      systemTheme: 'dark',
      resolvedTheme: 'dark',
      setTheme: (theme) => set((state) => {
        const resolvedTheme = theme === 'system'
          ? state.systemTheme
          : theme

        return {
          theme,
          resolvedTheme
        }
      }),
      setSystemTheme: (systemTheme) => set((state) => {
        const resolvedTheme = state.theme === 'system'
          ? systemTheme
          : state.theme

        return {
          systemTheme,
          resolvedTheme
        }
      })
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme })
    }
  )
)