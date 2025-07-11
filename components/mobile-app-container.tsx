'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { useMobileAppStore } from '@/lib/store/mobile-app-store'

interface MobileAppContainerProps {
  id: string
  title: string
  icon: string
  children: React.ReactNode
  onClose: () => void
}

export function MobileAppContainer({
  id,
  title,
  icon,
  children,
  onClose
}: MobileAppContainerProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  // Animate in when component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }

    // Animate out then close
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className={`fixed inset-0 z-50 bg-background transition-transform duration-300 ease-out ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      {/* Sticky Close button - positioned absolutely in top right */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 z-[60] w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 flex items-center justify-center transition-colors"
        aria-label="Close app"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* App content - takes full screen */}
      <div className="h-screen overflow-auto">
        {children}
      </div>

      {/* Home indicator */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-[55]">
        <div className="w-32 h-1 bg-muted rounded-full"></div>
      </div>
    </div>
  )
}