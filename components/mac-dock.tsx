'use client'

import { useState } from 'react'
import Image from 'next/image'

interface WindowState {
  id: string
  title: string
  icon: string
  isOpen: boolean
  isMinimized: boolean
  isFocused: boolean
}

interface MacDockProps {
  windows: WindowState[]
  openWindow: (id: string) => void
}

export function MacDock({ windows, openWindow }: MacDockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  // List of apps to show in the dock
  const dockApps = [
    { id: 'finder', icon: '/images/app-icons/01 Finder.png', title: 'Finder' },
    { id: 'settings', icon: '/images/app-icons/02 System Settings.png', title: 'System Settings' },
    { id: 'safari', icon: '/images/app-icons/05 Safari.png', title: 'Safari' },
    { id: 'about-notes', icon: '/images/app-icons/15 Notes.png', title: 'Notes' },
    { id: 'web-projects', icon: '/images/app-icons/04 Chrome.png', title: 'Web Projects' },
    { id: 'success-stories', icon: '/images/app-icons/07 Photos.png', title: 'Success Stories' },
    { id: 'client-partnerships', icon: '/images/app-icons/26 Telegram.png', title: 'Client Partnerships' },
    { id: 'figma', icon: '/images/app-icons/17 Figma.png', title: 'Figma' },
    { id: 'terminal', icon: '/images/app-icons/20 Warp.png', title: 'Terminal' },
  ]

  // Handle app click in dock
  const handleAppClick = (id: string) => {
    openWindow(id)
  }

  return (
    <div className="bg-white/30 dark:bg-black/30 backdrop-blur-lg rounded-2xl px-2 py-1 flex items-end space-x-2">
      {dockApps.map((app) => {
        // Find if the app is open
        const appWindow = windows.find(w => w.id === app.id)
        const isOpen = appWindow?.isOpen
        const isActive = appWindow?.isFocused

        return (
          <div
            key={app.id}
            className="relative group"
            onMouseEnter={() => setHoveredApp(app.id)}
            onMouseLeave={() => setHoveredApp(null)}
          >
            {/* App icon */}
            <button
              onClick={() => handleAppClick(app.id)}
              className={`relative transition-all duration-200 ease-in-out
                         ${hoveredApp === app.id ? 'scale-125 -translate-y-2' : 'scale-100'}
                         ${isActive ? 'scale-110' : ''}`}
            >
              <div className="h-12 w-12 relative">
                <Image
                  src={app.icon}
                  alt={app.title}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>

              {/* Indicator dot for open apps */}
              {isOpen && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
            </button>

            {/* Tooltip with app name */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 -top-8
                          bg-gray-800/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
              {app.title}
            </div>
          </div>
        )
      })}
    </div>
  )
}