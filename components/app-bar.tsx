'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface AppIcon {
  name: string
  icon: string
  description: string
  tools?: string[]
}

interface AppBarProps {
  // ... props
}

export function AppBar() {
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [isSticky, setIsSticky] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Handle scroll to make the app bar sticky
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsSticky(offset > 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setActiveApp(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const apps: AppIcon[] = [
    {
      name: 'Finder',
      icon: '/images/app-icons/01 Finder.png',
      description: 'Where I organize my digital life. I\'m a folder structure enthusiast!',
      tools: ['Folder Structure', 'File Organization', 'Version Control', 'Document Management']
    },
    {
      name: 'System Settings',
      icon: '/images/app-icons/02 System Settings.png',
      description: 'Constantly tweaking my workspace for the perfect setup.',
      tools: ['Workflow Optimization', 'Productivity Setup', 'Environment Configuration']
    },
    {
      name: 'App Store',
      icon: '/images/app-icons/03 App Store.png',
      description: 'Always on the lookout for useful tools and productivity boosters.'
    },
    {
      name: 'Chrome',
      icon: '/images/app-icons/04 Chrome.png',
      description: 'My window to the web. Always with too many tabs open.',
      tools: ['Web Development', 'Dev Tools', 'Performance Testing', 'Cross-browser Testing']
    },
    {
      name: 'Safari',
      icon: '/images/app-icons/05 Safari.png',
      description: 'For testing designs and when I need better battery life.',
      tools: ['Browser Testing', 'Web Standards', 'Performance Analysis']
    },
    {
      name: 'Spotify',
      icon: '/images/app-icons/06 Spotify.png',
      description: 'My soundtrack for deep work and creative sessions.',
      tools: ['Focus Playlists', 'Creative Atmosphere', 'Client Presentation Soundtracks']
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
      description: 'Where I organize my thoughts, projects, and life.',
      tools: ['Project Management', 'Client Documentation', 'Knowledge Base', 'Workflow Templates']
    },
    {
      name: 'Airtable',
      icon: '/images/app-icons/13 Airtable.png',
      description: 'For structured data and project management.',
      tools: ['Database Management', 'Project Tracking', 'Content Planning', 'Resource Allocation']
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
      description: 'My AI assistant for brainstorming and problem-solving.',
      tools: ['Content Generation', 'Code Assistance', 'Creative Ideation', 'Research Help']
    },
    {
      name: 'Figma',
      icon: '/images/app-icons/17 Figma.png',
      description: 'My digital canvas for design thinking and collaboration.',
      tools: ['UI Design', 'Prototyping', 'Design Systems', 'Collaborative Design', 'Component Libraries']
    },
    {
      name: 'Framer',
      icon: '/images/app-icons/18 Framer.png',
      description: 'For interactive prototypes and design experiments.'
    },
    {
      name: 'Cursor',
      icon: '/images/app-icons/19 Cursor.png',
      description: 'Where ideas become code. I love tinkering with side projects.',
      tools: ['Frontend Development', 'React', 'Next.js', 'TypeScript', 'AI-Assisted Coding']
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
      description: 'My digital office for team collaboration.',
      tools: ['Team Communication', 'Client Channels', 'File Sharing', 'Integration Hub']
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
    <>
      <div
        className={`w-full bg-secondary/90 backdrop-blur-xl rounded-t-lg overflow-hidden border-b border-white/10 transition-all duration-300 z-50 ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-lg rounded-none' : ''
        }`}
      >
        {/* Window controls */}
        <div className="flex items-center h-10 px-4 bg-secondary/90">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
          </div>
          <div className="flex-1 text-center text-xs text-white/70 font-medium">
            martin-hessmann.com
          </div>
        </div>

        {/* App dock with scrolling */}
        <div className="p-5 flex justify-center bg-secondary/80 backdrop-blur-xl overflow-hidden">
          <div className="flex items-end space-x-2 px-6 py-2 bg-secondary/80 rounded-full backdrop-blur-xl border border-white/10 shadow-[0_0_0_0.5px_rgba(0,0,0,0.5)] overflow-x-auto max-w-full hide-scrollbar">
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
                {/* App name tooltip */}
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
      </div>

      {/* macOS style tooltip */}
      {activeApp && (
        <div
          ref={tooltipRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-secondary/95 backdrop-blur-lg rounded-xl shadow-2xl border border-border/50 max-w-md w-full p-6 animate-fadeIn"
        >
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 relative mr-4">
              <Image
                src={apps.find(app => app.name === activeApp)?.icon || ''}
                alt={activeApp}
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{activeApp}</h3>
              <p className="text-muted-foreground">
                {apps.find(app => app.name === activeApp)?.description}
              </p>
            </div>
            <button
              className="ml-auto bg-secondary rounded-full p-1 hover:bg-muted transition-colors"
              onClick={() => setActiveApp(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">How I use this tool:</h4>
            <div className="flex flex-wrap gap-2">
              {apps.find(app => app.name === activeApp)?.tools?.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground italic">
              Click anywhere outside this window to close
            </p>
          </div>
        </div>
      )}

      {/* Add spacing div when sticky to prevent content jump */}
      {isSticky && <div className="h-[110px]"></div>}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}