'use client'

import * as React from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useMobileAppStore } from '@/lib/store/mobile-app-store'

// iOS-style home screen with widgets and apps like iPhone 16 Pro Max
export function MobileHomeScreen() {
  const { openApp } = useMobileAppStore()

  // Main app configurations
  const apps = [
    {
      id: 'projects',
      name: 'Projects',
      icon: '/images/app-icons/04 Chrome.png'
    },
    {
      id: 'stories',
      name: 'Stories',
      icon: '/images/app-icons/07 Photos.png'
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: '/images/app-icons/31 Messages.png'
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: '/images/app-icons/15 Notes.png'
    },
    {
      id: 'legal-notice',
      name: 'Legal',
      icon: '/images/app-icons/02 System Settings.png'
    },
    {
      id: 'about-martin',
      name: 'About',
      icon: '/images/app-icons/16 ChatGPT.png'
    },
    {
      id: 'project-info',
      name: 'Info',
      icon: '/images/app-icons/12 Notion.png'
    },
    {
      id: 'app-store',
      name: 'Store',
      icon: '/images/app-icons/03 App Store.png'
    }
  ]

  // Bottom dock apps (4 apps like iPhone)
  const dockApps = [
    { id: 'messages', name: 'Messages', icon: '/images/app-icons/31 Messages.png' },
    { id: 'notes', name: 'Notes', icon: '/images/app-icons/15 Notes.png' },
    { id: 'projects', name: 'Projects', icon: '/images/app-icons/04 Chrome.png' },
    { id: 'stories', name: 'Stories', icon: '/images/app-icons/07 Photos.png' }
  ]

  const handleAppTap = (appId: string) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
    openApp(appId)
  }

  const handleSearchTap = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
    // Could implement search functionality
  }

  return (
    <div className="h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 overflow-hidden relative">
      {/* iOS-style background wallpaper */}
      <div className="absolute inset-0 bg-[url('/images/desktop-background.jpg')] bg-cover bg-center" />

      {/* Status bar space */}
      <div className="h-12" />

      {/* Main content area */}
      <div className="relative z-10 px-4 pb-24 flex-1">

        {/* iPhone 16 Pro Max style grid */}
        <div className="grid grid-cols-4 gap-2 auto-rows-[80px]">

          {/* Large Widget - Profile (spans 4 columns, 2 rows) */}
          <div className="col-span-4 row-span-2 bg-black/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
            <div className="relative h-full">
              <Image
                src="/images/profile.png"
                alt="Martin Heßmann"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h1 className="text-white text-lg font-semibold mb-1">Martin Heßmann</h1>
                <p className="text-white/80 text-sm">Product Generalist • Berlin</p>
              </div>
            </div>
          </div>

          {/* Medium Widget - Projects Overview (spans 2 columns, 2 rows) */}
          <div className="col-span-2 row-span-2 bg-blue-500/20 backdrop-blur-lg rounded-2xl p-3 border border-white/10">
            <div className="text-white text-xs font-medium mb-1">Projects</div>
            <div className="text-white text-lg font-semibold mb-1">5</div>
            <div className="text-white/80 text-xs">Active projects</div>
            <div className="mt-2 flex -space-x-1">
              <div className="w-4 h-4 bg-orange-500 rounded-full border border-white/20"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full border border-white/20"></div>
              <div className="w-4 h-4 bg-purple-500 rounded-full border border-white/20"></div>
            </div>
          </div>

          {/* Medium Widget - Messages (spans 2 columns, 2 rows) */}
          <div className="col-span-2 row-span-2 bg-green-500/20 backdrop-blur-lg rounded-2xl p-3 border border-white/10">
            <div className="text-white text-xs font-medium mb-1">Messages</div>
            <div className="text-white text-lg font-semibold mb-1">4</div>
            <div className="text-white/80 text-xs">Client conversations</div>
            <div className="mt-2">
              <div className="text-white/80 text-xs truncate">Latest: TeamBank project update</div>
            </div>
          </div>

          {/* App Icons Row 1 */}
          {apps.slice(0, 4).map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppTap(app.id)}
              className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 active:scale-95 transition-transform duration-150 flex flex-col items-center justify-center p-2"
            >
              <div className="w-12 h-12 mb-1">
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-white text-xs font-medium text-center truncate w-full">
                {app.name}
              </span>
            </button>
          ))}

          {/* App Icons Row 2 */}
          {apps.slice(4, 8).map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppTap(app.id)}
              className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 active:scale-95 transition-transform duration-150 flex flex-col items-center justify-center p-2"
            >
              <div className="w-12 h-12 mb-1">
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-white text-xs font-medium text-center truncate w-full">
                {app.name}
              </span>
            </button>
          ))}

        </div>

        {/* Search bar (like iPhone) */}
        <div className="mt-8 mb-4">
          <button
            onClick={handleSearchTap}
            className="w-full bg-white/10 backdrop-blur-lg rounded-full px-4 py-3 border border-white/20 flex items-center active:scale-98 transition-transform duration-150"
          >
            <Search className="w-5 h-5 text-white/60 mr-3" />
            <span className="text-white/60 text-sm">Search</span>
          </button>
        </div>

      </div>

      {/* Dock - iPhone style with 4 apps */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="mx-4 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/20">
            <div className="grid grid-cols-4 gap-4">
              {dockApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppTap(app.id)}
                  className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 active:scale-95 transition-transform duration-150 flex items-center justify-center"
                >
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={48}
                    height={48}
                    className="object-contain w-12 h-12"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}