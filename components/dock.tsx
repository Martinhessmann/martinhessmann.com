'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface WindowState {
  id: string
  title: string
  icon: string
  isOpen: boolean
  isMinimized: boolean
  isFocused: boolean
}

interface DockProps {
  windows: WindowState[]
  openWindow: (id: string) => void
}

export function Dock({ windows, openWindow }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)
  const [initialRender, setInitialRender] = useState(true)

  // Reset initial render flag after component mounts
  useEffect(() => {
    // Wait a brief moment to ensure all animations have time to start properly
    const timer = setTimeout(() => {
      setInitialRender(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Apps in the dock
  const dockApps = [
    { id: 'projects', icon: '/images/app-icons/04 Chrome.png', title: 'Projects' },
    { id: 'stories', icon: '/images/app-icons/07 Photos.png', title: 'Stories' },
    { id: 'messages', icon: '/images/app-icons/31 Messages.png', title: 'Messages' },
    { id: 'notes', icon: '/images/app-icons/15 Notes.png', title: 'Notes' }
  ]

  // Handle app click in dock
  const handleAppClick = (id: string) => {
    // This will either:
    // - Open a closed window
    // - Restore a minimized window
    // - Focus an already open window
    openWindow(id)
  }

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 z-[60]">
      <div className="bg-popover/90 backdrop-blur-2xl rounded-2xl
        px-1.5 py-1 flex items-end space-x-0
        shadow-[0_0_0_0.5px_rgba(0,0,0,0.5)]
        ring-[0.5px] ring-border
        relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-50" />

        {dockApps.map((app) => {
          const appWindow = windows.find(w => w.id === app.id)
          const isOpen = appWindow?.isOpen || false
          const isMinimized = appWindow?.isMinimized || false
          const isActive = appWindow?.isFocused && !initialRender

          // Calculate animation and visual states
          const isHovered = hoveredApp === app.id
          const scale = isActive ? 'scale-110' : isHovered ? 'scale-105' : 'scale-100'
          const translateY = isActive ? '-translate-y-1' : isHovered ? '-translate-y-0.5' : ''
          const opacity = isMinimized ? 'opacity-60' : 'opacity-100'

          return (
            <div
              key={app.id}
              className={`relative group z-10 px-0.5 transition-all duration-200
                ${scale} ${translateY} ${opacity}`}
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* App icon */}
              <button
                onClick={() => handleAppClick(app.id)}
                className="relative p-1 rounded-lg hover:bg-secondary/20 transition-colors"
              >
                <div className="h-12 w-12 relative">
                  <Image
                    src={app.icon}
                    alt={app.title}
                    fill
                    sizes="48px"
                    className={`object-contain drop-shadow-md transition-opacity ${isMinimized ? 'opacity-70' : ''}`}
                  />
                </div>

                {/* Indicator dot for open apps */}
                {isOpen && (
                  <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2
                    w-1.5 h-1.5 rounded-full transition-colors
                    ${isActive ? 'bg-primary' : 'bg-muted-foreground'}`} />
                )}
              </button>

              {/* Tooltip with app name */}
              <div className="absolute left-1/2 -top-12 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <div className="relative flex flex-col items-center">
                  <div className="bg-popover rounded-lg py-[3px] px-3 text-xs text-popover-foreground whitespace-nowrap
                    shadow-[0_0_0_0.5px_rgba(0,0,0,0.8)]
                    ring-[0.5px] ring-border
                    relative z-10">
                    {app.title}
                    {isMinimized && " (Minimized)"}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-4 h-4 bg-popover rotate-45 transform
                    -mt-[8px]
                    rounded-sm
                    shadow-[0_0_0_0.5px_rgba(0,0,0,0.8)]
                    ring-[0.5px] ring-border
                    relative z-[1]" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}