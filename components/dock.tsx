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

  // List of apps to show in the dock
  const apps = [
    { id: 'web-projects', icon: '/images/app-icons/04 Chrome.png', title: 'Web Projects' },
    { id: 'success-stories', icon: '/images/app-icons/07 Photos.png', title: 'Success Stories' },
    { id: 'client-partnerships', icon: '/images/app-icons/31 Messages.png', title: 'Client Partnerships' },
    { id: 'notes', icon: '/images/app-icons/15 Notes.png', title: 'Notes' },
  ]

  // Handle app click in dock
  const handleAppClick = (id: string) => {
    openWindow(id)
  }

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 z-[60]">
      <div className="bg-[#252525]/90 backdrop-blur-2xl rounded-2xl
        px-1.5 py-1 flex items-end space-x-0
        shadow-[0_0_0_0.5px_rgba(0,0,0,0.5)]
        ring-[0.5px] ring-gray-300/30
        relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-50" />

        {apps.map((app) => {
          const appWindow = windows.find(w => w.id === app.id)
          const isOpen = appWindow?.isOpen
          const isActive = appWindow?.isFocused && !initialRender

          return (
            <div
              key={app.id}
              className="relative group z-10 px-0.5"
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {/* App icon */}
              <button
                onClick={() => handleAppClick(app.id)}
                className="relative"
              >
                <div className="h-12 w-12 relative">
                  <Image
                    src={app.icon}
                    alt={app.title}
                    fill
                    sizes="48px"
                    className="object-contain drop-shadow-md"
                  />
                </div>

                {/* Indicator dot for open apps */}
                {isOpen && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2
                    w-1.5 h-1.5 rounded-full bg-white/40" />
                )}
              </button>

              {/* Tooltip with app name */}
              <div className="absolute left-1/2 -top-12 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <div className="relative flex flex-col items-center">
                  <div className="bg-[#252525] rounded-lg py-[3px] px-3 text-xs text-white whitespace-nowrap
                    shadow-[0_0_0_0.5px_rgba(0,0,0,0.8)]
                    ring-[0.5px] ring-gray-300/30
                    relative z-10">
                    {app.title}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-4 h-4 bg-[#252525] rotate-45 transform
                    -mt-[8px]
                    rounded-sm
                    shadow-[0_0_0_0.5px_rgba(0,0,0,0.8)]
                    ring-[0.5px] ring-gray-300/30
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