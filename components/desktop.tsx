'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Dock } from './dock'
import { Window } from './window'
import { Projects } from './windows/projects'
import { Stories } from './windows/stories'
import { Messages } from './windows/messages'
import { Notes } from './windows/notes'
import { useWindowStore, WindowPosition, WindowSize } from '@/lib/store/window-store'

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
  const { windows, addWindow, focusWindow, toggleMinimize, closeWindow, updatePosition, updateSize } = useWindowStore()

  // Initialize default windows if none exist
  useEffect(() => {
    if (windows.length === 0) {
      // Add initial windows
      addWindow({
        id: 'projects',
        title: 'Projects',
        icon: '/images/app-icons/04 Chrome.png',
        component: <Projects />,
        position: { x: 100, y: 340 },
        size: { width: 880, height: 580 }
      })

      addWindow({
        id: 'stories',
        title: 'Stories',
        icon: '/images/app-icons/07 Photos.png',
        component: <Stories />,
        position: { x: 480, y: 280 },
        size: { width: 700, height: 500 }
      })

      addWindow({
        id: 'messages',
        title: 'Messages',
        icon: '/images/app-icons/31 Messages.png',
        component: <Messages />,
        position: { x: 670, y: 140 },
        size: { width: 720, height: 520 }
      })

      addWindow({
        id: 'notes',
        title: 'Notes',
        icon: '/images/app-icons/15 Notes.png',
        component: <Notes />,
        position: { x: 80, y: 60 },
        size: { width: 800, height: 580 }
      })
    }
  }, [windows.length, addWindow])

  return (
    <div className="relative h-full pt-[24px] bg-gradient-to-b from-background to-background/80 overflow-hidden">
      {/* Desktop background */}
      <div className="absolute inset-0 -top-[24px] bg-[url('/images/desktop-background.jpg')] bg-cover bg-center" />

      {/* Desktop content */}
      <div className="relative z-10 w-full h-full">
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
              size={window.size}
              zIndex={window.zIndex}
              onFocus={() => focusWindow(window.id)}
              onMinimize={() => toggleMinimize(window.id)}
              onClose={() => closeWindow(window.id)}
              updatePosition={(newPos: WindowPosition) => updatePosition(window.id, newPos)}
              updateSize={(newSize: WindowSize) => updateSize(window.id, newSize)}
            >
              {window.component}
            </Window>
          )
        ))}

        {/* Dock at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center py-2 z-[200]">
          <Dock
            windows={windows}
            openWindow={focusWindow}
          />
        </div>

        {/* Copyright info */}
        <div className="absolute bottom-2 right-2 text-muted-foreground text-xs">
          Photo by <a href="https://unsplash.com/@nasa?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">NASA</a> on <a href="https://unsplash.com/?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </div>
      </div>
    </div>
  )
}