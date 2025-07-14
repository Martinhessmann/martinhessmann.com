'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useIsMobile } from '@/hooks/use-mobile'

export function ProjectInfo() {
  const isMobile = useIsMobile()

  // Notes-style content for Project Info
  const projectNotes = [
    {
      id: 'project-overview',
      title: 'Project Overview',
      date: 'Recently updated',
      content: `🚀 macOS Desktop Simulation Website
This personal portfolio transforms a traditional website into a macOS desktop simulation with draggable windows, a dock, and other macOS-inspired UI elements.

📱 Mobile: iOS-style interface with widgets and fluid grid
💻 Desktop: Full macOS simulation with window management
🎨 Design: Dark mode, authentic OS styling, smooth animations

Built with modern web technologies to showcase technical skills while providing an engaging, interactive experience.`
    },
    {
      id: 'tech-stack',
      title: 'Technology Stack',
      date: '3 days ago',
      content: `⚛️ Frontend Framework
• Next.js 14 (App Router)
• React 18 with TypeScript
• Tailwind CSS for styling
• Shadcn/UI component library

🏗️ Architecture
• Zustand for state management
• Custom hooks for device detection
• Component-based architecture
• Server-side rendering (SSR)

🎯 Key Features
• Responsive design (mobile/desktop)
• Window management system
• iOS-style mobile interface
• Dark mode support
• Smooth animations & transitions`
    },
    {
      id: 'development',
      title: 'Development Process',
      date: '1 week ago',
      content: `🛠️ Built with Cursor AI IDE
This entire project was developed using Cursor, showcasing the power of AI-assisted development.

📅 Timeline
• First commit: April 2024
• Mobile interface: July 2024
• iOS refinements: Current

🌐 Hosting & Deployment
• Vercel for hosting and CI/CD
• GitHub for version control
• Automatic deployments on push

🎨 Design Philosophy
• Authentic OS simulation
• Performance-first approach
• Mobile-first responsive design
• Accessibility considerations`
    },
    {
      id: 'inspiration',
      title: 'Concept & Inspiration',
      date: '2 weeks ago',
      content: `💡 Why a Desktop Simulation?
The idea was to create something unique that stands out from typical portfolio websites while demonstrating advanced frontend capabilities.

🎯 Goals Achieved
• Interactive, engaging user experience
• Showcase of technical skills
• Unique personal branding
• Cross-platform compatibility

🚀 What Makes It Special
• Full window management system
• Authentic macOS styling
• iOS mobile interface
• Real app-like functionality
• Attention to detail in animations

This project serves as both a portfolio and a technical demonstration of modern web development capabilities.`
    }
  ]

  return (
    <div className="h-full bg-background">
      {/* Desktop layout - traditional notes view */}
      {!isMobile ? (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="border-b border-border p-4 bg-card">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="white"/>
                  <path d="M14 2V8H20" fill="none" stroke="#3B82F6" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Project Information</h1>
                <p className="text-sm text-muted-foreground">About This Website Project</p>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <ScrollArea className="flex-grow">
            <div className="p-4 space-y-4">
              {projectNotes.map((note) => (
                <div key={note.id} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base">{note.title}</h3>
                    <span className="text-xs text-muted-foreground">{note.date}</span>
                  </div>
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                      {note.content}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      ) : (
        /* Mobile layout - iOS Notes style */
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-blue-500 p-4 pt-8">
            <div className="flex items-center">
              <div className="text-white mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor"/>
                  <path d="M14 2V8H20" fill="none" stroke="white" strokeWidth="2"/>
                  <path d="M16 13H8V15H16V13Z" fill="white"/>
                  <path d="M16 17H8V19H16V17Z" fill="white"/>
                </svg>
              </div>
              <h1 className="text-white text-xl font-semibold">Notes</h1>
            </div>
            <p className="text-white/90 text-sm mt-1">Project Information</p>
          </div>

          {/* Notes List */}
          <div className="flex-grow bg-black">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {projectNotes.map((note) => (
                  <div key={note.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-medium text-base">{note.title}</h3>
                      <span className="text-gray-400 text-xs">{note.date}</span>
                    </div>
                    <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  )
}