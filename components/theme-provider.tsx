"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useThemeStore } from "@/lib/store/theme-store"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme, setSystemTheme } = useThemeStore()

  // Listen for system color scheme changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Set initial system theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    // Update when system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setSystemTheme])

  // Apply the current theme to the HTML element
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme)
  }, [resolvedTheme])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={theme}
      enableSystem={theme === 'system'}
      value={{
        light: "light",
        dark: "dark",
        system: "system"
      }}
    >
      {children}
    </NextThemesProvider>
  )
}

