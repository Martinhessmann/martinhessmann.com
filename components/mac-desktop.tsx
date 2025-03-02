'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MacDock } from './mac-dock'
import { MacWindow } from './mac-window'
import { AboutNotes } from './windows/about-notes'
import { WebProjects } from './windows/web-projects'
import { SuccessStories } from './windows/success-stories'
import { ClientPartnerships } from './windows/client-partnerships'

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

export function MacDesktop() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [nextZIndex, setNextZIndex] = useState(100)

  // Initialize windows on component mount
  useEffect(() => {
    setWindows([
      {
        id: 'about-notes',
        title: 'Notes - About Me Draft',
        icon: '/images/app-icons/15 Notes.png',
        isOpen: true,
        isMinimized: false,
        isFocused: true,
        position: { x: 80, y: 60 },
        component: <AboutNotes />,
        zIndex: 103
      },
      {
        id: 'web-projects',
        title: 'Web Projects Repository',
        icon: '/images/app-icons/04 Chrome.png',
        isOpen: true,
        isMinimized: false,
        isFocused: false,
        position: { x: 400, y: 100 },
        component: <WebProjects />,
        zIndex: 102
      },
      {
        id: 'success-stories',
        title: 'Success Stories',
        icon: '/images/app-icons/07 Photos.png',
        isOpen: true,
        isMinimized: false,
        isFocused: false,
        position: { x: 200, y: 150 },
        component: <SuccessStories />,
        zIndex: 101
      },
      {
        id: 'client-partnerships',
        title: 'Client Partnerships',
        icon: '/images/app-icons/26 Telegram.png',
        isOpen: true,
        isMinimized: false,
        isFocused: false,
        position: { x: 300, y: 200 },
        component: <ClientPartnerships />,
        zIndex: 100
      }
    ])
  }, [])

  // Function to focus a window
  const focusWindow = (windowId: string) => {
    const newZIndex = nextZIndex + 1
    setNextZIndex(newZIndex)

    setWindows(prevWindows =>
      prevWindows.map(window => ({
        ...window,
        isFocused: window.id === windowId,
        zIndex: window.id === windowId ? newZIndex : window.zIndex
      }))
    )
  }

  // Function to toggle window minimization
  const toggleMinimize = (windowId: string) => {
    setWindows(prevWindows =>
      prevWindows.map(window => ({
        ...window,
        isMinimized: window.id === windowId ? !window.isMinimized : window.isMinimized
      }))
    )
  }

  // Function to close a window
  const closeWindow = (windowId: string) => {
    setWindows(prevWindows =>
      prevWindows.map(window => ({
        ...window,
        isOpen: window.id === windowId ? false : window.isOpen
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
    setWindows(prevWindows => {
      const windowExists = prevWindows.some(w => w.id === windowId)

      if (windowExists) {
        return prevWindows.map(window => ({
          ...window,
          isOpen: window.id === windowId ? true : window.isOpen,
          isMinimized: window.id === windowId ? false : window.isMinimized,
          isFocused: window.id === windowId
        }))
      }

      return prevWindows
    })

    focusWindow(windowId)
  }

  return (
    <div className="w-full h-screen overflow-hidden relative bg-cover bg-center"
         style={{ backgroundImage: 'url(/images/desktop-background.png)' }}>

      {/* Render windows */}
      {windows.map(window => (
        window.isOpen && (
          <MacWindow
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
          </MacWindow>
        )
      ))}

      {/* Dock at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center py-2">
        <MacDock
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