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

  // Apps in the dock
  const dockApps = [
    { id: 'projects', icon: '/images/app-icons/04 Chrome.png', title: 'Projects' },
    { id: 'stories', icon: '/images/app-icons/07 Photos.png', title: 'Stories' },
    { id: 'messages', icon: '/images/app-icons/31 Messages.png', title: 'Messages' },
    { id: 'notes', icon: '/images/app-icons/15 Notes.png', title: 'Notes' },
    { id: 'legal-notice', icon: '/images/app-icons/02 System Settings.png', title: 'Legal Notice' }
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
      <div className="bg-background/60 backdrop-blur-xl rounded-2xl
        px-0.5 py-0.5 flex items-end
        shadow-[0_0_0_0.5px_rgba(0,0,0,0.5)]
        ring-[0.5px] ring-border/50
        relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-50" />

        {dockApps.map((app) => {
          const appWindow = windows.find(w => w.id === app.id)
          const isOpen = appWindow?.isOpen || false
          const isMinimized = appWindow?.isMinimized || false
          const isActive = appWindow?.isFocused

          // Get classes for hover and active states
          const isHovered = hoveredApp === app.id

          return (
            <div key={app.id} className="relative group">
              {/* App icon */}
              <button
                onClick={() => handleAppClick(app.id)}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                className="relative p-0.5 rounded-lg transition-all duration-300"
              >
                <div className="h-12 w-12 relative">
                  <Image
                    src={app.icon}
                    alt={app.title}
                    fill
                    sizes="48px"
                    className={`object-contain drop-shadow-md ${isMinimized ? 'opacity-50' : 'opacity-100'}`}
                  />
                </div>

                {/* Indicator dot for open apps */}
                {isOpen && (
                  <div className={`absolute -bottom-0.5 left-1/2 transform -translate-x-1/2
                    w-1 h-1 rounded-full bg-white`} />
                )}
              </button>

              {/* Tooltip with app name */}
              <div className="absolute left-1/2 -top-12 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                <div className="relative flex flex-col items-center">
                  <div className="bg-background/60 backdrop-blur-xl rounded-lg py-[3px] px-3 text-xs text-popover-foreground
                    shadow-[0_0_0_0.5px_rgba(0,0,0,0.8)]
                    ring-[0.5px] ring-border/50
                    relative z-10">
                    {app.title}
                    {isMinimized && " (Minimized)"}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-4 h-4 bg-background/60 backdrop-blur-xl rotate-45 transform
                    -mt-[8px]
                    rounded-sm
                    shadow-[0_0_0_0.5px_rgba(0,0,0,0.8)]
                    ring-[0.5px] ring-border/50
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