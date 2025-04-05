'use client'

import { useState, useRef, useEffect, useCallback, MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import Image from 'next/image'
import { WindowPosition, WindowSize } from '@/lib/store/window-store'
import { ThemeFavicon } from '@/components/theme-favicon'

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
  const [windowSize, setWindowSize] = useState(size)

  const windowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef({
    isDragging: false,
    isResizing: false,
    offset: { x: 0, y: 0 },
    resizeDirection: { x: 0, y: 0 },
    resizeStartPos: { x: 0, y: 0 },
    resizeStartSize: { width: 0, height: 0 }
  })

  // Update internal state when props change
  useEffect(() => {
    setWindowSize(size)
  }, [size])

  // General mouse move handler for both dragging and resizing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragStateRef.current.isDragging) {
      e.preventDefault()
      e.stopPropagation()

      // Calculate new position
      const newX = e.clientX - dragStateRef.current.offset.x
      const newY = e.clientY - dragStateRef.current.offset.y

      // Get viewport dimensions
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Calculate boundaries to keep window header visible and prevent going too far left/right
      const minX = -windowSize.width + 100 // Keep at least 100px visible from left
      const maxX = viewportWidth - 100 // Keep at least 100px visible from right
      const minY = 0 // Don't allow dragging above viewport
      const maxY = viewportHeight - 40 // Keep at least the title bar visible at bottom

      // Enforce boundaries
      const boundedX = Math.min(Math.max(newX, minX), maxX)
      const boundedY = Math.min(Math.max(newY, minY), maxY)

      // Update position immediately in DOM for smooth dragging
      if (windowRef.current) {
        windowRef.current.style.left = `${boundedX}px`
        windowRef.current.style.top = `${boundedY}px`
      }

      // Update position in store
      requestAnimationFrame(() => {
        updatePosition({ x: boundedX, y: boundedY })
      })
    }

    if (dragStateRef.current.isResizing) {
      e.preventDefault()
      e.stopPropagation()

      // Calculate size changes
      const deltaX = e.clientX - dragStateRef.current.resizeStartPos.x
      // Adjust mouse Y position if resizing from top edge
      const adjustedClientY = dragStateRef.current.resizeDirection.y < 0
        ? e.clientY - 28 // Subtract title bar height (28px)
        : e.clientY
      const deltaY = adjustedClientY - dragStateRef.current.resizeStartPos.y

      // Apply changes to base size
      let newWidth = dragStateRef.current.resizeStartSize.width
      let newHeight = dragStateRef.current.resizeStartSize.height
      let newX = position.x
      let newY = position.y

      // Handle horizontal resizing
      if (dragStateRef.current.resizeDirection.x !== 0) {
        if (dragStateRef.current.resizeDirection.x > 0) {
          // Right edge: just adjust width
          newWidth = dragStateRef.current.resizeStartSize.width + deltaX
        } else {
          // Left edge: adjust both width and position
          newWidth = dragStateRef.current.resizeStartSize.width - deltaX
          newX = dragStateRef.current.resizeStartPos.x + deltaX
        }
      }

      // Handle vertical resizing
      if (dragStateRef.current.resizeDirection.y !== 0) {
        if (dragStateRef.current.resizeDirection.y > 0) {
          // Bottom edge: just adjust height
          newHeight = dragStateRef.current.resizeStartSize.height + deltaY
        } else {
          // Top edge: adjust both height and position
          newHeight = dragStateRef.current.resizeStartSize.height - deltaY
          newY = dragStateRef.current.resizeStartPos.y + deltaY
        }
      }

      // Enforce minimum dimensions (400px width, 270px height)
      const minWidth = 400
      const minHeight = 270

      // Adjust position and size to maintain minimum dimensions
      if (newWidth < minWidth) {
        if (dragStateRef.current.resizeDirection.x < 0) {
          // If resizing from left, adjust position to maintain right edge
          newX = dragStateRef.current.resizeStartPos.x + deltaX - (minWidth - newWidth)
        }
        newWidth = minWidth
      }

      if (newHeight < minHeight) {
        if (dragStateRef.current.resizeDirection.y < 0) {
          // If resizing from top, adjust position to maintain bottom edge
          newY = dragStateRef.current.resizeStartPos.y + deltaY - (minHeight - newHeight)
        }
        newHeight = minHeight
      }

      // Enforce viewport boundaries
      if (newX < 0) {
        newWidth += newX // Reduce width by how much we're out of bounds
        newX = 0
      }
      if (newY < 0) {
        newHeight += newY // Reduce height by how much we're out of bounds
        newY = 0
      }

      // Get viewport dimensions
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Ensure window doesn't grow beyond viewport
      if (newX + newWidth > viewportWidth) {
        newWidth = viewportWidth - newX
      }
      if (newY + newHeight > viewportHeight) {
        newHeight = viewportHeight - newY
      }

      // Create new size and position objects
      const newSize = { width: newWidth, height: newHeight }
      const newPosition = { x: newX, y: newY }

      // Update visual state immediately for smooth resizing
      if (windowRef.current) {
        windowRef.current.style.width = `${newWidth}px`
        windowRef.current.style.height = `${newHeight}px`
        windowRef.current.style.left = `${newX}px`
        windowRef.current.style.top = `${newY}px`
      }

      // Update size and position in store
      requestAnimationFrame(() => {
        setWindowSize(newSize)
        updateSize(newSize)
        updatePosition(newPosition)
      })
    }
  }, [windowSize, updatePosition, updateSize, position])

  // General mouse up handler
  const handleMouseUp = useCallback(() => {
    if (dragStateRef.current.isResizing || dragStateRef.current.isDragging) {
      console.log('Interaction End:', {
        type: dragStateRef.current.isResizing ? 'resize' : 'drag',
        finalSize: windowRef.current ? {
          width: windowRef.current.offsetWidth,
          height: windowRef.current.offsetHeight
        } : null,
        finalPosition: windowRef.current ? {
          x: parseInt(windowRef.current.style.left, 10),
          y: parseInt(windowRef.current.style.top, 10)
        } : null
      })
    }

    if (dragStateRef.current.isResizing && windowRef.current) {
      // Get the final size directly from the element
      const width = windowRef.current.offsetWidth
      const height = windowRef.current.offsetHeight

      // Update the store with final size
      updateSize({ width, height })
    }

    if (dragStateRef.current.isDragging && windowRef.current) {
      // Get the final position directly from the element
      const left = parseInt(windowRef.current.style.left, 10)
      const top = parseInt(windowRef.current.style.top, 10)

      // Update the store with final position
      updatePosition({ x: left, y: top })
    }

    // Reset drag/resize state
    dragStateRef.current.isDragging = false
    dragStateRef.current.isResizing = false
    setIsDragging(false)
    setIsResizing(false)

    // Remove global event listeners
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  }, [updatePosition, updateSize])

  // Start window dragging
  const handleTitleBarMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return // Only handle left click

    console.log('Drag Start:', {
      position,
      offset: {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      }
    })

    e.preventDefault()
    e.stopPropagation()

    // Focus window
    if (!isFocused) {
      onFocus()
    }

    // Calculate drag offset
    const newOffset = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }

    // Update both state and ref
    dragStateRef.current = {
      ...dragStateRef.current,
      isDragging: true,
      offset: newOffset
    }
    setDragOffset(newOffset)
    setIsDragging(true)

    // Add global event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: false })
    window.addEventListener('mouseup', handleMouseUp)
  }, [position, isFocused, onFocus, handleMouseMove, handleMouseUp])

  // Start window resizing
  const handleResizeStart = useCallback((e: ReactMouseEvent<HTMLDivElement>, dirX: number, dirY: number) => {
    if (e.button !== 0) return // Only handle left click

    // Calculate the title bar height (1.75rem = 28px)
    const titleBarHeight = 28

    // Adjust the start position Y coordinate if resizing from top edge
    const adjustedY = dirY < 0 ? e.clientY - titleBarHeight : e.clientY

    console.log('Resize Start:', {
      size: windowSize,
      direction: { x: dirX, y: dirY },
      startPos: { x: e.clientX, y: adjustedY }
    })

    e.preventDefault()
    e.stopPropagation()

    // Focus window
    if (!isFocused) {
      onFocus()
    }

    // Set resize parameters in ref
    dragStateRef.current = {
      ...dragStateRef.current,
      isResizing: true,
      resizeDirection: { x: dirX, y: dirY },
      resizeStartPos: { x: e.clientX, y: adjustedY },
      resizeStartSize: { width: windowSize.width, height: windowSize.height }
    }

    // Update React state for UI
    setIsResizing(true)

    // Add global event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: false })
    window.addEventListener('mouseup', handleMouseUp)
  }, [windowSize, isFocused, onFocus, handleMouseMove, handleMouseUp])

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

  // Compute cursor and user-select classes based on drag/resize state
  const interactionClass = isDragging
    ? '[&:has(*:active)]:cursor-grabbing select-none'
    : isResizing
      ? '[&:has(*:active)]:cursor-se-resize select-none'
      : ''

  return (
    <div
      ref={windowRef}
      className={`absolute rounded-xl overflow-hidden
        border border-border
        ring-[0.5px] ring-ring/10
        ${interactionClass}
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
          flex items-center px-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
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
          {/* Check if the icon is a favicon and render ThemeFavicon if so */}
          {icon.includes('/favicons/favicon') ? (
            <ThemeFavicon className="mr-2" size={16} />
          ) : (
            <div className="h-4 w-4 mr-2 relative">
              <Image
                src={icon}
                alt={title}
                fill
                sizes="16px"
                className="object-contain"
              />
            </div>
          )}
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

      {/* Resize handles - corners and edges */}
      {/* Bottom right corner */}
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
        className="absolute top-0 right-0 w-6 h-6 cursor-ne-resize
                  hover:bg-primary/10 hover:border-b hover:border-l hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, 1, -1)}
      />

      {/* Top left corner */}
      <div
        className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize
                  hover:bg-primary/10 hover:border-b hover:border-r hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, -1, -1)}
      />

      {/* Right edge */}
      <div
        className="absolute top-6 right-0 w-2 h-[calc(100%-3rem)] cursor-ew-resize
                  hover:bg-primary/10 hover:border-l hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, 1, 0)}
      />

      {/* Left edge */}
      <div
        className="absolute top-6 left-0 w-2 h-[calc(100%-3rem)] cursor-ew-resize
                  hover:bg-primary/10 hover:border-r hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, -1, 0)}
      />

      {/* Bottom edge */}
      <div
        className="absolute bottom-0 left-6 w-[calc(100%-3rem)] h-2 cursor-ns-resize
                  hover:bg-primary/10 hover:border-t hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, 0, 1)}
      />

      {/* Top edge */}
      <div
        className="absolute top-0 left-6 w-[calc(100%-3rem)] h-2 cursor-ns-resize
                  hover:bg-primary/10 hover:border-b hover:border-primary/30
                  transition-colors"
        onMouseDown={(e) => handleResizeStart(e, 0, -1)}
      />
    </div>
  )
}