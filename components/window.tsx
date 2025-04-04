'use client'

import { useState, useRef, useEffect, MouseEvent, ReactNode } from 'react'
import Image from 'next/image'

interface WindowPosition {
  x: number
  y: number
}

interface WindowSize {
  width: number
  height: number
}

interface WindowProps {
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

export function Window({
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
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [wasFocused, setWasFocused] = useState(isFocused)
  const [preventNextClick, setPreventNextClick] = useState(false)

  // Set different default sizes based on window type
  const getDefaultSize = () => {
    switch (id) {
      case 'notes':
        return { width: 800, height: 580 }
      case 'messages':
        return { width: 720, height: 520 }
      case 'projects':
        return { width: 880, height: 580 }
      case 'stories':
        return { width: 700, height: 500 }
      default:
        return { width: 600, height: 420 }
    }
  }

  const [windowSize, setWindowSize] = useState(getDefaultSize())
  const [resizeDirection, setResizeDirection] = useState({ x: 0, y: 0 })
  const [resizeStartPosition, setResizeStartPosition] = useState({ x: 0, y: 0 })
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 })
  const windowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Track focus changes
  useEffect(() => {
    // If window is newly focused, prevent the next click
    if (isFocused && !wasFocused) {
      setPreventNextClick(true)
    }
    setWasFocused(isFocused)
  }, [isFocused, wasFocused])

  // Clear the prevent click state after a short delay
  useEffect(() => {
    if (preventNextClick) {
      const timer = setTimeout(() => {
        setPreventNextClick(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [preventNextClick])

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

  // Handle resize start
  const handleResizeStart = (e: MouseEvent<HTMLDivElement>, direction: { x: number, y: number }) => {
    e.stopPropagation()
    if (!isFocused) {
      onFocus()
    }

    setIsResizing(true)
    setResizeDirection(direction)
    setResizeStartPosition({ x: e.clientX, y: e.clientY })
    setResizeStartSize({ width: windowSize.width, height: windowSize.height })
  }

  // Handle window mouse move for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) {
        // Calculate new position
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y

        // Apply boundary constraints to keep header visible
        // Header height is 36px (9px for title bar + some buffer)
        const minY = 28 // Updated to prevent windows from moving over the menu bar (which is 28px tall)
        const maxY = window.innerHeight - 36
        const minX = -windowSize.width + 100 // Keep at least 100px of window visible horizontally
        const maxX = window.innerWidth - 100 // Keep at least 100px of window visible horizontally

        // Apply constraints
        const constrainedX = Math.min(Math.max(newX, minX), maxX)
        const constrainedY = Math.min(Math.max(newY, minY), maxY)

        updatePosition({
          x: constrainedX,
          y: constrainedY
        })
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStartPosition.x
        const deltaY = e.clientY - resizeStartPosition.y

        // Calculate new size and position in a single step to ensure consistency
        let newWidth = windowSize.width
        let newHeight = windowSize.height
        let newX = position.x
        let newY = position.y

        // Handle resizing (both diagonal and edge)
        if (resizeDirection.x !== 0) {
          if (resizeDirection.x > 0) {
            // Right edge resize
            newWidth = Math.max(300, resizeStartSize.width + deltaX)
          } else {
            // Left edge resize
            newWidth = Math.max(300, resizeStartSize.width - deltaX)
            newX = resizeStartPosition.x + deltaX
          }
        }

        if (resizeDirection.y !== 0) {
          if (resizeDirection.y > 0) {
            // Bottom edge resize
            newHeight = Math.max(200, resizeStartSize.height + deltaY)
          } else {
            // Top edge resize
            newHeight = Math.max(200, resizeStartSize.height - deltaY)
            newY = resizeStartPosition.y + deltaY
          }
        }

        // Apply boundary constraints
        const minY = 28 // Updated to prevent windows from moving over the menu bar
        const maxY = window.innerHeight - 36
        const minX = -newWidth + 100
        const maxX = window.innerWidth - 100

        // Apply constraints to position
        const constrainedX = Math.min(Math.max(newX, minX), maxX)
        const constrainedY = Math.min(Math.max(newY, minY), maxY)

        // Update size
        setWindowSize({ width: newWidth, height: newHeight })

        // Update position
        updatePosition({
          x: constrainedX,
          y: constrainedY
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, dragOffset, resizeDirection, resizeStartPosition, resizeStartSize, updatePosition, position, windowSize.width])

  // Handle focus on click
  const handleWindowClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isFocused) {
      onFocus()
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // Handle content click
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    if (preventNextClick) {
      e.preventDefault()
      e.stopPropagation()
      setPreventNextClick(false)
    }
  }

  if (isMinimized) {
    return null
  }

  return (
    <div
      ref={windowRef}
      className={`absolute rounded-xl overflow-hidden
        border border-border
        ring-[0.5px] ring-ring/10
        ${isDragging || isResizing ? 'cursor-grabbing select-none' : ''}
        ${isFocused
        ? 'bg-background shadow-lg shadow-foreground/10'
        : 'bg-background'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex,
        width: `${windowSize.width}px`,
        height: `${windowSize.height}px`
      }}
      onClick={handleWindowClick}
    >
      {/* Title bar */}
      <div
        className={`h-7 border-b
          ${isFocused
            ? 'bg-secondary border-border'
            : 'bg-secondary border-border'}
          flex items-center px-2 cursor-grab select-none`}
        onMouseDown={handleMouseDown}
      >
        {/* Window control buttons */}
        <div className="window-buttons flex space-x-[6px] mr-2 pl-2 group">
          <button
            onClick={onClose}
            className={`w-3 h-3 rounded-full ${isFocused
              ? 'bg-red-500 group-hover:bg-red-500 hover:bg-red-500/90'
              : 'bg-muted-foreground group-hover:bg-red-500'}
              flex items-center justify-center transition-colors`}
            aria-label="Close window"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[10px] text-red-900 font-bold leading-none relative -top-[0.5px]">×</span>
          </button>
          <button
            onClick={onMinimize}
            className={`w-3 h-3 rounded-full ${isFocused
              ? 'bg-yellow-500 group-hover:bg-yellow-500 hover:bg-yellow-500/90'
              : 'bg-muted-foreground group-hover:bg-yellow-500'}
              flex items-center justify-center transition-colors`}
            aria-label="Minimize window"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[10px] text-yellow-800 font-bold leading-none relative -top-[1px]">−</span>
          </button>
          <button
            className={`w-3 h-3 rounded-full ${isFocused
              ? 'bg-green-500 group-hover:bg-green-500 hover:bg-green-500/90'
              : 'bg-muted-foreground group-hover:bg-green-500'}
              flex items-center justify-center transition-colors`}
            aria-label="Maximize window"
          >
            <span className="opacity-0 group-hover:opacity-100 text-green-900 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.2" className="scale-90">
                <path d="M1.5,1.5 h3 v3 M6.5,6.5 h-3 v-3" />
              </svg>
            </span>
          </button>
        </div>

        {/* Window title with icon */}
        <div className="flex items-center justify-center flex-grow text-xs font-medium text-foreground">
          {icon && (
            <div className="h-4 w-4 mr-1.5 relative">
              <Image
                src={icon}
                alt={title}
                fill
                sizes="16px"
                className="object-contain"
              />
            </div>
          )}
          <span>{title}</span>
        </div>

        {/* Spacer to balance title */}
        <div className="w-[68px]"></div>
      </div>

      {/* Window content */}
      <div
        ref={contentRef}
        className={`h-[calc(100%-28px)] bg-background p-4 overflow-auto window-content`}
        onClick={handleContentClick}
      >
        {children}
      </div>

      {/* Resize handles - corners with higher z-index */}
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20"
           onMouseDown={(e) => handleResizeStart(e, { x: 1, y: 1 })} />
      <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-20"
           onMouseDown={(e) => handleResizeStart(e, { x: -1, y: 1 })} />
      <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-20"
           onMouseDown={(e) => handleResizeStart(e, { x: 1, y: -1 })} />
      <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-20"
           onMouseDown={(e) => handleResizeStart(e, { x: -1, y: -1 })} />

      {/* Edge resize handles */}
      <div className="absolute right-0 top-0 bottom-0 w-2 cursor-e-resize z-10"
           onMouseDown={(e) => handleResizeStart(e, { x: 1, y: 0 })} />
      <div className="absolute left-0 top-0 bottom-0 w-2 cursor-w-resize z-10"
           onMouseDown={(e) => handleResizeStart(e, { x: -1, y: 0 })} />
      <div className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize z-10"
           onMouseDown={(e) => handleResizeStart(e, { x: 0, y: 1 })} />
      <div className="absolute top-0 left-0 right-0 h-2 cursor-n-resize z-10"
           onMouseDown={(e) => handleResizeStart(e, { x: 0, y: -1 })} />
    </div>
  )
}