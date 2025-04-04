'use client'

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import Image from 'next/image'
import { WindowPosition, WindowSize } from '@/lib/store/window-store'

interface WindowProps {
  id: string
  title: string
  icon: string
  children: ReactNode
  isFocused: boolean
  isMinimized: boolean
  position: WindowPosition
  size: WindowSize
  zIndex: number
  onFocus: () => void
  onMinimize: () => void
  onClose: () => void
  updatePosition: (position: WindowPosition) => void
  updateSize: (size: WindowSize) => void
}

export function Window({
  id,
  title,
  icon,
  children,
  isFocused,
  isMinimized,
  position,
  size,
  zIndex,
  onFocus,
  onMinimize,
  onClose,
  updatePosition,
  updateSize
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeDirection, setResizeDirection] = useState({ x: 0, y: 0 })
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 })
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 })
  const [windowSize, setWindowSize] = useState(size)

  const windowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Update internal state when props change
  useEffect(() => {
    setWindowSize(size)
  }, [size])

  // General mouse move handler for both dragging and resizing
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      // Calculate new position
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Enforce boundaries
      const boundedX = Math.max(newX, -windowSize.width + 50)
      const boundedY = Math.max(newY, 0)

      // Update position
      updatePosition({ x: boundedX, y: boundedY })
    }

    if (isResizing) {
      // Calculate size changes
      const deltaX = (e.clientX - resizeStartPos.x) * resizeDirection.x
      const deltaY = (e.clientY - resizeStartPos.y) * resizeDirection.y

      // Apply changes to base size
      let newWidth = resizeStartSize.width + deltaX
      let newHeight = resizeStartSize.height + deltaY

      // Enforce minimum size
      newWidth = Math.max(newWidth, 320)
      newHeight = Math.max(newHeight, 200)

      // Create new size object
      const newSize = { width: newWidth, height: newHeight }

      // Update visual state immediately
      setWindowSize(newSize)

      // Also directly update DOM for smooth resizing
      if (windowRef.current) {
        windowRef.current.style.width = `${newWidth}px`
        windowRef.current.style.height = `${newHeight}px`
      }
    }
  }

  // General mouse up handler
  const handleMouseUp = () => {
    if (isResizing && windowRef.current) {
      // Get the final size directly from the element
      const width = windowRef.current.offsetWidth
      const height = windowRef.current.offsetHeight

      // Update the store with final size
      updateSize({ width, height })
    }

    // Reset drag/resize state
    setIsDragging(false)
    setIsResizing(false)

    // Remove global event listeners
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }

  // Start window dragging
  const handleTitleBarMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return // Only handle left click

    e.preventDefault()

    // Focus window
    if (!isFocused) {
      onFocus()
    }

    // Calculate drag offset
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })

    // Start dragging
    setIsDragging(true)

    // Add global event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  // Start window resizing
  const handleResizeStart = (e: ReactMouseEvent<HTMLDivElement>, dirX: number, dirY: number) => {
    if (e.button !== 0) return // Only handle left click

    e.preventDefault()
    e.stopPropagation()

    // Focus window
    if (!isFocused) {
      onFocus()
    }

    // Set resize parameters
    setResizeDirection({ x: dirX, y: dirY })
    setResizeStartPos({ x: e.clientX, y: e.clientY })
    setResizeStartSize({ width: windowSize.width, height: windowSize.height })

    // Start resizing
    setIsResizing(true)

    // Add global event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  // Handle window click
  const handleWindowClick = () => {
    if (!isFocused) {
      onFocus()
    }
  }

  // Compute animation class for minimization
  const animationClass = isMinimized
    ? 'scale-[0.05] opacity-0 pointer-events-none'
    : 'scale-100 opacity-100'

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
        onMouseDown={handleTitleBarMouseDown}
      >
        {/* Window control buttons */}
        <div className={`flex space-x-[6px] mr-2 pl-2 ${isFocused ? 'group' : 'hover:group'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={`w-3 h-3 rounded-full ${isFocused
              ? 'bg-red-500 hover:bg-red-500/90'
              : 'bg-muted-foreground group-hover:bg-red-500'}
              flex items-center justify-center transition-colors`}
            aria-label="Close window"
          >
            <span className={`text-[10px] text-red-900 font-bold leading-none relative -top-[0.5px] opacity-0 group-hover:opacity-100`}>×</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className={`w-3 h-3 rounded-full ${isFocused
              ? 'bg-yellow-500 hover:bg-yellow-500/90'
              : 'bg-muted-foreground group-hover:bg-yellow-500'}
              flex items-center justify-center transition-colors`}
            aria-label="Minimize window"
          >
            <span className={`text-[10px] text-yellow-800 font-bold leading-none relative -top-[1px] opacity-0 group-hover:opacity-100`}>−</span>
          </button>
          <button
            className={`w-3 h-3 rounded-full ${isFocused
              ? 'bg-green-500 hover:bg-green-500/90'
              : 'bg-muted-foreground group-hover:bg-green-500'}
              flex items-center justify-center transition-colors`}
            aria-label="Maximize window"
          >
            <span className={`text-green-900 font-bold opacity-0 group-hover:opacity-100`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.2" className="scale-90">
                <path d="M1.5,1.5 h3 v3 M6.5,6.5 h-3 v-3" />
              </svg>
            </span>
          </button>
        </div>

        {/* Window title with icon */}
        <div className="flex items-center">
          <div className="h-4 w-4 mr-2 relative">
            <Image
              src={icon}
              alt={title}
              fill
              sizes="16px"
              className="object-contain"
            />
          </div>
          <span className="text-xs font-medium">{title}</span>
        </div>
      </div>

      {/* Window content - prevent direct interaction with non-focused windows */}
      <div
        ref={contentRef}
        className={`h-[calc(100%-1.75rem)] overflow-auto transition-all duration-300 transform origin-bottom ${animationClass}`}
        onClick={(e) => {
          if (!isFocused) {
            e.stopPropagation();
            onFocus();
          }
        }}
        style={{
          pointerEvents: isFocused ? 'auto' : 'none'
        }}
      >
        {children}
      </div>

      {/* Resize handles - made more visible and easier to grab */}
      {/* Bottom right corner - main resize handle */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize
                  hover:bg-primary/10 hover:border-t hover:border-l hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, 1, 1)}
      />

      {/* Bottom left corner */}
      <div
        className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize
                  hover:bg-primary/10 hover:border-t hover:border-r hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, -1, 1)}
      />

      {/* Top right corner */}
      <div
        className="absolute top-7 right-0 w-6 h-6 cursor-ne-resize
                  hover:bg-primary/10 hover:border-b hover:border-l hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, 1, -1)}
      />

      {/* Top left corner */}
      <div
        className="absolute top-7 left-0 w-6 h-6 cursor-nw-resize
                  hover:bg-primary/10 hover:border-b hover:border-r hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, -1, -1)}
      />
    </div>
  )
}