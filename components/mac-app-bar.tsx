'use client'

import Image from 'next/image'
import { useState } from 'react'

interface AppIcon {
  name: string
  icon: string
  description: string
}

export function MacAppBar() {
  const [activeApp, setActiveApp] = useState<string | null>(null)

  const apps: AppIcon[] = [
    {
      name: 'Finder',
      icon: '/images/app-icons/01 Finder.png',
      description: 'Where I organize my digital life. I\'m a folder structure enthusiast!'
    },
    {
      name: 'System Settings',
      icon: '/images/app-icons/02 System Settings.png',
      description: 'Constantly tweaking my workspace for the perfect setup.'
    },
    {
      name: 'App Store',
      icon: '/images/app-icons/03 App Store.png',
      description: 'Always on the lookout for useful tools and productivity boosters.'
    },
    {
      name: 'Chrome',
      icon: '/images/app-icons/04 Chrome.png',
      description: 'My window to the web. Always with too many tabs open.'
    },
    {
      name: 'Safari',
      icon: '/images/app-icons/05 Safari.png',
      description: 'For testing designs and when I need better battery life.'
    },
    {
      name: 'Spotify',
      icon: '/images/app-icons/06 Spotify.png',
      description: 'My soundtrack for deep work and creative sessions.'
    },
    {
      name: 'Photos',
      icon: '/images/app-icons/07 Photos.png',
      description: 'Where I keep memories and inspiration for design projects.'
    },
    {
      name: 'Cyberduck',
      icon: '/images/app-icons/08 Cyberduck.png',
      description: 'My trusty companion for FTP and cloud storage connections.'
    },
    {
      name: 'Toggl',
      icon: '/images/app-icons/09 Toggl Track.png',
      description: 'Tracking my time to stay productive and bill clients accurately.'
    },
    {
      name: 'RightFont',
      icon: '/images/app-icons/10 RightFont.png',
      description: 'Managing my typography arsenal for design projects.'
    },
    {
      name: 'Screaming Frog',
      icon: '/images/app-icons/11 Screaming Frog SEO Spider.png',
      description: 'For SEO audits and website structure analysis.'
    },
    {
      name: 'Notion',
      icon: '/images/app-icons/12 Notion.png',
      description: 'Where I organize my thoughts, projects, and life.'
    },
    {
      name: 'Airtable',
      icon: '/images/app-icons/13 Airtable.png',
      description: 'For structured data and project management.'
    },
    {
      name: 'Reminders',
      icon: '/images/app-icons/14 Reminders.png',
      description: 'Keeping track of tasks and never missing a deadline.'
    },
    {
      name: 'Notes',
      icon: '/images/app-icons/15 Notes.png',
      description: 'Quick thoughts and ideas before they disappear.'
    },
    {
      name: 'ChatGPT',
      icon: '/images/app-icons/16 ChatGPT.png',
      description: 'My AI assistant for brainstorming and problem-solving.'
    },
    {
      name: 'Figma',
      icon: '/images/app-icons/17 Figma.png',
      description: 'My digital canvas for design thinking and collaboration.'
    },
    {
      name: 'Framer',
      icon: '/images/app-icons/18 Framer.png',
      description: 'For interactive prototypes and design experiments.'
    },
    {
      name: 'Cursor',
      icon: '/images/app-icons/19 Cursor.png',
      description: 'Where ideas become code. I love tinkering with side projects.'
    },
    {
      name: 'Warp',
      icon: '/images/app-icons/20 Warp.png',
      description: 'Where I feel like a hacker, even when just running npm install.'
    },
    {
      name: 'Docker',
      icon: '/images/app-icons/21 Docker Desktop.png',
      description: 'Containerizing applications for consistent environments.'
    },
    {
      name: 'Wispr Flow',
      icon: '/images/app-icons/22 Wispr Flow.png',
      description: 'Creating workflows and automations to save time.'
    },
    {
      name: 'Audacity',
      icon: '/images/app-icons/23 Audacity.png',
      description: 'Editing audio for presentations and occasional podcast appearances.'
    },
    {
      name: 'Calendar',
      icon: '/images/app-icons/24 Calendar.png',
      description: 'Managing my time and avoiding double bookings.'
    },
    {
      name: 'WhatsApp',
      icon: '/images/app-icons/25 WhatApp.png',
      description: 'Keeping in touch with clients and colleagues.'
    },
    {
      name: 'Telegram',
      icon: '/images/app-icons/26 Telegram.png',
      description: 'For more secure communications and larger file sharing.'
    },
    {
      name: 'Slack',
      icon: '/images/app-icons/27 Slack.png',
      description: 'My digital office for team collaboration.'
    },
    {
      name: 'Mail',
      icon: '/images/app-icons/28 Mail.png',
      description: 'Where emails pile up faster than I can respond to them.'
    },
    {
      name: 'Bin',
      icon: '/images/app-icons/30 Bin.png',
      description: 'Where bad ideas and first drafts go to rest.'
    }
  ]

  return (
    <div className="w-full bg-secondary rounded-t-lg overflow-hidden border-b border-border">
      {/* Window controls */}
      <div className="flex items-center h-8 px-4 bg-secondary">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-xs text-muted-foreground font-medium">
          martin-hessmann.com
        </div>
      </div>

      {/* App dock with scrolling */}
      <div className="p-4 flex justify-center bg-secondary/80 backdrop-blur-sm overflow-hidden">
        <div className="flex items-end space-x-2 px-6 py-2 bg-secondary/50 rounded-full backdrop-blur-md border border-border/30 shadow-lg overflow-x-auto max-w-full hide-scrollbar">
          {apps.map((app) => (
            <div
              key={app.name}
              className={`relative group cursor-pointer transition-all duration-300 flex-shrink-0 ${
                activeApp === app.name ? 'scale-110 -translate-y-2' : 'hover:scale-105 hover:-translate-y-1'
              }`}
              onClick={() => setActiveApp(activeApp === app.name ? null : app.name)}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <Image
                  src={app.icon}
                  alt={app.name}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              {/* App tooltip */}
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap pointer-events-none transition-opacity duration-200 z-10">
                {app.name}
              </div>

              {/* Active indicator */}
              {activeApp === app.name && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* App description with marker styling */}
      {activeApp && (
        <div className="relative p-4 transition-all duration-300 animate-fadeIn">
          <p className="font-marker text-lg md:text-xl text-center">
            <span className="inline-block text-primary mr-2">-&gt;</span>
            <span className="bg-gradient-to-r from-primary/20 to-primary/5 px-2 py-1 rounded">
              {apps.find(app => app.name === activeApp)?.description}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}