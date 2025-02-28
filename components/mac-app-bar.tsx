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
      icon: '/images/app-icons/finder.png',
      description: 'Where I organize my digital life. I\'m a folder structure enthusiast!'
    },
    {
      name: 'Chrome',
      icon: '/images/app-icons/chrome.png',
      description: 'My window to the web. Always with too many tabs open.'
    },
    {
      name: 'VSCode',
      icon: '/images/app-icons/vscode.png',
      description: 'Where ideas become code. I love tinkering with side projects.'
    },
    {
      name: 'Figma',
      icon: '/images/app-icons/figma.png',
      description: 'My digital canvas for design thinking and collaboration.'
    },
    {
      name: 'Spotify',
      icon: '/images/app-icons/spotify.png',
      description: 'My soundtrack for deep work and creative sessions.'
    },
    {
      name: 'Notion',
      icon: '/images/app-icons/notion.png',
      description: 'Where I organize my thoughts, projects, and life.'
    },
    {
      name: 'Slack',
      icon: '/images/app-icons/slack.png',
      description: 'My digital office for team collaboration.'
    },
    {
      name: 'Terminal',
      icon: '/images/app-icons/terminal.png',
      description: 'Where I feel like a hacker, even when just running npm install.'
    }
  ]

  return (
    <div className="w-full bg-secondary rounded-t-lg overflow-hidden border-b border-border">
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
    </div>
  )
}