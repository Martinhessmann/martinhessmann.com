'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Dock } from './dock'
import { Window } from './window'
import { Projects } from './windows/projects'
import { Stories } from './windows/stories'
import { Messages } from './windows/messages'
import { Notes } from './windows/notes'
import { ThemeToggle } from './theme-toggle'

// Window position types
interface WindowPosition {
  x: number
  y: number
}

// Window state types
interface WindowState {
  id: string
  title: string
  icon: string
  isOpen: boolean
  isMinimized: boolean
  isFocused: boolean
  position: WindowPosition
  component: React.ReactNode
  zIndex: number
}

// Create a client-only clock component
function ClientOnlyClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    // Set time immediately on mount
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }

    updateTime() // Initial update

    // Update every minute
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  return <span>{time}</span>
}

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'projects',
      title: 'Projects',
      icon: '/images/app-icons/04 Chrome.png',
      isOpen: true,
      isMinimized: false,
      isFocused: false,
      position: { x: 100, y: 340 },
      component: <Projects />,
      zIndex: 101
    },
    {
      id: 'stories',
      title: 'Stories',
      icon: '/images/app-icons/07 Photos.png',
      isOpen: true,
      isMinimized: false,
      isFocused: false,
      position: { x: 480, y: 280 },
      component: <Stories />,
      zIndex: 100
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: '/images/app-icons/31 Messages.png',
      isOpen: true,
      isMinimized: false,
      isFocused: false,
      position: { x: 670, y: 140 },
      component: <Messages />,
      zIndex: 102
    },
    {
      id: 'notes',
      title: 'Notes',
      icon: '/images/app-icons/15 Notes.png',
      isOpen: true,
      isMinimized: false,
      isFocused: true,
      position: { x: 80, y: 60 },
      component: <Notes />,
      zIndex: 103
    }
  ])
  const [nextZIndex, setNextZIndex] = useState(104)

  // Function to focus a window
  const focusWindow = (windowId: string) => {
    setWindows(prevWindows => {
      const highestZIndex = Math.max(...prevWindows.map(w => w.zIndex))

      return prevWindows.map(window => ({
        ...window,
        isFocused: window.id === windowId,
        isMinimized: false, // Unminimize when focusing
        zIndex: window.id === windowId ? highestZIndex + 1 : window.zIndex
      }))
    })
  }

  // Function to toggle window minimization with animation class
  const toggleMinimize = (windowId: string) => {
    setWindows(prevWindows =>
      prevWindows.map(window => ({
        ...window,
        isMinimized: window.id === windowId ? !window.isMinimized : window.isMinimized,
        isFocused: window.id === windowId ? false : window.isFocused
      }))
    )
  }

  // Function to close a window with fade-out animation
  const closeWindow = (windowId: string) => {
    setWindows(prevWindows =>
      prevWindows.map(window => ({
        ...window,
        isOpen: window.id === windowId ? false : window.isOpen,
        isFocused: window.id === windowId ? false : window.isFocused
      }))
    )
  }

  // Function to update window position
  const updatePosition = (windowId: string, newPosition: WindowPosition) => {
    setWindows(prevWindows =>
      prevWindows.map(window => ({
        ...window,
        position: window.id === windowId ? newPosition : window.position
      }))
    )
  }

  // Function to open a window from the dock
  const openWindow = (windowId: string) => {
    setWindows((current) => {
      const updatedWindows = [...current]
      const windowIndex = updatedWindows.findIndex(w => w.id === windowId)

      if (windowIndex === -1) {
        return updatedWindows
      }

      const windowToOpen = {...updatedWindows[windowIndex]}

      // If the window is already open, just focus it and bring it to front
      if (windowToOpen.isOpen) {
        // Focus the window
        updatedWindows.forEach(w => {
          w.isFocused = (w.id === windowId)
        })

        // Set this window to have the highest z-index
        const highestZIndex = Math.max(...updatedWindows.map(w => w.zIndex))
        windowToOpen.zIndex = highestZIndex + 1
        windowToOpen.isMinimized = false
        windowToOpen.isFocused = true

        updatedWindows[windowIndex] = windowToOpen
        return updatedWindows
      }

      // If the window is not open, open it and position it in a cascading manner
      if (!windowToOpen.isOpen) {
        // Count how many windows are already open
        const openWindowsCount = updatedWindows.filter(w => w.isOpen).length

        // Create cascade effect by offsetting each new window
        const baseX = 100 + (openWindowsCount * 30)
        const baseY = 80 + (openWindowsCount * 30)

        // Ensure the window is positioned within view boundaries
        const maxX = window.innerWidth - 100 // Keep at least 100px visible
        const maxY = window.innerHeight - 36 // Keep header visible

        windowToOpen.position = {
          x: Math.min(baseX, maxX),
          y: Math.min(baseY, maxY)
        }
      }

      // Update the window properties
      windowToOpen.isOpen = true
      windowToOpen.isMinimized = false

      // Focus the window
      updatedWindows.forEach(w => {
        w.isFocused = (w.id === windowId)
      })

      // Set the highest z-index
      windowToOpen.zIndex = Math.max(...updatedWindows.map(w => w.zIndex)) + 1

      updatedWindows[windowIndex] = windowToOpen

      return updatedWindows
    })
  }

  return (
    <div className="w-full h-screen overflow-hidden relative bg-cover bg-center"
         style={{ backgroundImage: 'url(/images/desktop-background.jpg)' }}>

      {/* Top menu bar with blur effect */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-secondary/80 backdrop-blur-xl border-b border-white/10 flex items-center px-3 z-50">
        <div className="flex items-center mr-4">
          <div className="h-4 w-4 mr-2 relative">
            <Image
              src="/images/apple-logo.png"
              alt="Apple"
              fill
              sizes="16px"
              className="object-contain invert"
            />
          </div>
          <span className="font-medium text-sm text-white/80">Finder</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-white/60">File</span>
          <span className="text-sm text-white/60">Edit</span>
          <span className="text-sm text-white/60">View</span>
          <span className="text-sm text-white/60">Go</span>
          <span className="text-sm text-white/60">Window</span>
          <span className="text-sm text-white/60">Help</span>
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center space-x-3 text-xs">
          <span>Imprint</span>
          <span>Privacy</span>
          <ThemeToggle />
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <ClientOnlyClock />
          </div>
        </div>
      </div>

      {/* Render windows */}
      {windows.map(window => (
        window.isOpen && (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            isFocused={window.isFocused}
            isMinimized={window.isMinimized}
            position={window.position}
            zIndex={window.zIndex}
            onFocus={() => focusWindow(window.id)}
            onMinimize={() => toggleMinimize(window.id)}
            onClose={() => closeWindow(window.id)}
            updatePosition={(newPos: WindowPosition) => updatePosition(window.id, newPos)}
          >
            {window.component}
          </Window>
        )
      ))}

      {/* Dock at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center py-2 z-[200]">
        <Dock
          windows={windows}
          openWindow={openWindow}
        />
      </div>

      {/* Copyright info */}
      <div className="absolute bottom-2 right-2 text-white/60 text-xs">
        © {new Date().getFullYear()} Martin Heßmann
      </div>
    </div>
  )
}