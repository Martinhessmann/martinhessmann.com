'use client'

import { useState, useRef, useEffect, MouseEvent, ReactNode } from 'react'
import Image from 'next/image'

interface WindowPosition {
  x: number
  y: number
}

interface MacWindowProps {
  id: string
  title: string
  icon: string
  children: ReactNode
  isFocused: boolean
  isMinimized: boolean
  position: WindowPosition
  zIndex: number
  onFocus: () => void
  onMinimize: () => void
  onClose: () => void
  updatePosition: (position: WindowPosition) => void
}

export function MacWindow({
  id,
  title,
  icon,
  children,
  isFocused,
  isMinimized,
  position,
  zIndex,
  onFocus,
  onMinimize,
  onClose,
  updatePosition
}: MacWindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  // Handle window drag
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!isFocused) {
      onFocus()
    }

    // Only allow dragging from the title bar
    if ((e.target as HTMLElement).closest('.window-controls, .window-buttons')) {
      return
    }

    setIsDragging(true)

    const rect = windowRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  // Handle window mouse move
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) {
        updatePosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, updatePosition])

  // Handle focus on click
  const handleWindowClick = () => {
    if (!isFocused) {
      onFocus()
    }
  }

  if (isMinimized) {
    return null
  }

  return (
    <div
      ref={windowRef}
      className={`absolute rounded-lg shadow-2xl overflow-hidden transition-shadow ${isDragging ? 'cursor-grabbing' : ''} ${isFocused ? 'shadow-2xl' : 'shadow-lg opacity-90'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex,
        width: '600px',
        height: '420px'
      }}
      onClick={handleWindowClick}
    >
      {/* Title bar */}
      <div
        className={`h-9 ${isFocused ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'} flex items-center px-2 cursor-grab`}
        onMouseDown={handleMouseDown}
      >
        {/* Window control buttons */}
        <div className="window-buttons flex space-x-2 mr-3">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px]">×</span>
          </button>
          <button
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px]">−</span>
          </button>
          <button
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px]">+</span>
          </button>
        </div>

        {/* Window title with icon */}
        <div className="flex items-center justify-center flex-grow text-sm font-medium">
          {icon && (
            <div className="h-5 w-5 mr-2 relative">
              <Image
                src={icon}
                alt={title}
                fill
                sizes="20px"
                className="object-contain"
              />
            </div>
          )}
          <span>{title}</span>
        </div>

        {/* Spacer to balance title */}
        <div className="w-20"></div>
      </div>

      {/* Window content */}
      <div className={`h-[calc(100%-36px)] bg-white dark:bg-gray-900 p-4 overflow-auto window-content`}>
        {children}
      </div>
    </div>
  )
}