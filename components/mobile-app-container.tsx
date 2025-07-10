'use client'

import * as React from 'react'
import Image from 'next/image'
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
      {/* App header */}
      <div className="h-14 bg-secondary border-b border-border flex items-center justify-between px-4 pt-8">
        {/* App info */}
        <div className="flex items-center">
          <div className="w-6 h-6 mr-3 relative">
            <Image
              src={icon}
              alt={title}
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
          <h1 className="text-lg font-medium">{title}</h1>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="w-8 h-8 rounded-full bg-background hover:bg-muted flex items-center justify-center transition-colors"
          aria-label="Close app"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* App content */}
      <div className="h-[calc(100vh-3.5rem-2rem)] overflow-auto">
        {children}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-muted rounded-full"></div>
      </div>
    </div>
  )
}