'use client'

import * as React from 'react'
import Image from 'next/image'
import { useMobileAppStore } from '@/lib/store/mobile-app-store'

// iOS-style home screen with app icons
export function MobileHomeScreen() {
  const { openApp } = useMobileAppStore()

  // App configurations - reusing the same apps from desktop but with iOS-style layout
  const apps = [
    {
      id: 'projects',
      name: 'Projects',
      icon: '/images/app-icons/04 Chrome.png',
      description: 'Web projects and portfolio'
    },
    {
      id: 'stories',
      name: 'Stories',
      icon: '/images/app-icons/07 Photos.png',
      description: 'Success stories and case studies'
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: '/images/app-icons/31 Messages.png',
      description: 'Contact and communication'
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: '/images/app-icons/15 Notes.png',
      description: 'Personal notes and thoughts'
    },
    {
      id: 'legal-notice',
      name: 'Legal',
      icon: '/images/app-icons/02 System Settings.png',
      description: 'Legal notice and privacy'
    }
  ]

  const handleAppTap = (appId: string) => {
    // Add haptic feedback for iOS-like experience
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
    openApp(appId)
  }

  return (
    <div className="h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 overflow-hidden relative">
      {/* iOS-style background wallpaper */}
      <div className="absolute inset-0 bg-[url('/images/desktop-background.jpg')] bg-cover bg-center opacity-30" />

      {/* Profile Widget - iOS style with photo background and text overlay */}
      <div className="relative z-10 mt-12 mb-8 mx-6">
        <div className="relative h-32 rounded-2xl overflow-hidden">
          {/* Background image */}
          <Image
            src="/images/profile.png"
            alt="Martin Heßmann"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <h1 className="text-white text-2xl font-light mb-1">Martin Heßmann</h1>
            <p className="text-white/90 text-sm">Product Generalist • Berlin</p>
          </div>
        </div>
      </div>

      {/* App grid with larger icons and less padding */}
      <div className="relative z-10 px-6">
        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
          {apps.map((app) => (
            <div key={app.id} className="flex flex-col items-center">
              <button
                onClick={() => handleAppTap(app.id)}
                className="w-16 h-16 mb-2 rounded-xl overflow-hidden shadow-lg active:scale-95 transition-transform duration-150"
                style={{
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset'
                }}
              >
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </button>
              <span className="text-white text-xs font-medium text-center leading-tight max-w-[64px] truncate">
                {app.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator (iOS-style) */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  )
}