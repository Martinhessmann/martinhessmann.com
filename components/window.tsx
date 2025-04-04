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
        const minY = 0
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

        // Handle horizontal resizing
        if (resizeDirection.x !== 0) {
          if (resizeDirection.x > 0) {
            // Right edge resize
            newWidth = Math.max(300, resizeStartSize.width + deltaX)
          } else {
            // Left edge resize - move the window's left edge
            newWidth = Math.max(300, resizeStartSize.width - deltaX)
            newX = resizeStartPosition.x - dragOffset.x + deltaX
          }
        }

        // Handle vertical resizing
        if (resizeDirection.y !== 0) {
          if (resizeDirection.y > 0) {
            // Bottom edge resize
            newHeight = Math.max(200, resizeStartSize.height + deltaY)
          } else {
            // Top edge resize - move the window's top edge
            // Simply set the top position to the current mouse position minus the initial drag offset
            newHeight = Math.max(200, resizeStartSize.height - deltaY)
            newY = resizeStartPosition.y - dragOffset.y + deltaY

            console.log('Top Resize Debug (improved):', {
              mouseY: e.clientY,
              startY: resizeStartPosition.y,
              deltaY,
              dragOffsetY: dragOffset.y,
              originalY: position.y,
              newY: newY,
              currentHeight: windowSize.height,
              newHeight: newHeight
            })
          }
        }

        // Apply boundary constraints
        const minY = 0
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
  }, [isDragging, isResizing, dragOffset, resizeDirection, resizeStartPosition, resizeStartSize, updatePosition, position])

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
      className={`absolute rounded-lg shadow-2xl overflow-hidden transition-shadow ${isDragging || isResizing ? 'cursor-grabbing' : ''} ${isFocused ? 'shadow-2xl' : 'shadow-lg'}`}
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

      {/* Resize handles */}
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
           onMouseDown={(e) => handleResizeStart(e, { x: 1, y: 1 })} />
      <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
           onMouseDown={(e) => handleResizeStart(e, { x: -1, y: 1 })} />
      <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
           onMouseDown={(e) => handleResizeStart(e, { x: 1, y: -1 })} />
      <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
           onMouseDown={(e) => handleResizeStart(e, { x: -1, y: -1 })} />
      <div className="absolute right-0 top-0 bottom-0 w-2 cursor-e-resize"
           onMouseDown={(e) => handleResizeStart(e, { x: 1, y: 0 })} />
      <div className="absolute left-0 top-0 bottom-0 w-2 cursor-w-resize"
           onMouseDown={(e) => handleResizeStart(e, { x: -1, y: 0 })} />
      <div className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize"
           onMouseDown={(e) => handleResizeStart(e, { x: 0, y: 1 })} />
      <div className="absolute top-0 left-0 right-0 h-2 cursor-n-resize"
           onMouseDown={(e) => handleResizeStart(e, { x: 0, y: -1 })} />
    </div>
  )
}