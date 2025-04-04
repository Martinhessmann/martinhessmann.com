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
  const [windowSize, setWindowSize] = useState({ width: 600, height: 420 })
  const [resizeDirection, setResizeDirection] = useState({ x: 0, y: 0 })
  const [resizeStartPosition, setResizeStartPosition] = useState({ x: 0, y: 0 })
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 })
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
      className={`absolute rounded-xl overflow-hidden backdrop-blur-xl
        border border-[#1e1e1e] dark:border-[#1e1e1e]
        ring-[0.5px] ring-white/10
        ${isDragging || isResizing ? 'cursor-grabbing select-none' : ''}
        ${isFocused
          ? 'bg-[#252525]/90 shadow-lg shadow-black/20'
          : 'bg-[#252525]/80'}`}
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
        className={`h-7 border-b backdrop-blur-xl
          ${isFocused
            ? 'bg-[#252525]/95 border-[#1e1e1e]'
            : 'bg-[#252525]/90 border-[#1e1e1e]'}
          flex items-center px-2 cursor-grab select-none`}
        onMouseDown={handleMouseDown}
      >
        {/* Window control buttons */}
        <div className="window-buttons flex space-x-[6px] mr-2 pl-2">
          <button
            onClick={onClose}
            className={`w-3 h-3 rounded-full ${isFocused
              ? 'bg-[#FF5F57] hover:bg-[#FF5F57]/80'
              : 'bg-[#404040]'}
              group flex items-center justify-center transition-colors`}
            aria-label="Close window"
          >
            {isFocused && <span className="hidden group-hover:inline text-[8px] text-[#FF5F57]/30 font-bold">×</span>}
          </button>
          <button
            onClick={onMinimize}
            className={`w-3 h-3 rounded-full ${isFocused
              ? 'bg-[#FEBC2E] hover:bg-[#FEBC2E]/80'
              : 'bg-[#404040]'}
              group flex items-center justify-center transition-colors`}
            aria-label="Minimize window"
          >
            {isFocused && <span className="hidden group-hover:inline text-[8px] text-[#FEBC2E]/30 font-bold">−</span>}
          </button>
          <button
            className={`w-3 h-3 rounded-full ${isFocused
              ? 'bg-[#28C840] hover:bg-[#28C840]/80'
              : 'bg-[#404040]'}
              group flex items-center justify-center transition-colors`}
            aria-label="Maximize window"
          >
            {isFocused && <span className="hidden group-hover:inline text-[8px] text-[#28C840]/30 font-bold">+</span>}
          </button>
        </div>

        {/* Window title with icon */}
        <div className="flex items-center justify-center flex-grow text-xs font-medium text-white/70">
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
      <div className={`h-[calc(100%-28px)] bg-[#252525]/95 backdrop-blur-xl p-4 overflow-auto window-content`}>
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