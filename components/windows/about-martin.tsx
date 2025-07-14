'use client'

import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useIsMobile } from '@/hooks/use-mobile'

export function AboutMartin() {
  const isMobile = useIsMobile()

  // Notes-style content for About Martin
  const aboutNotes = [
    {
      id: 'personal-info',
      title: 'Personal Information',
      date: 'Recently updated',
      content: `Martin Heßmann
Product Generalist
📍 Friedrichshain, Berlin, Germany

✉️ Contact: info@martinhessmann.com
🌐 Website: martinhessmann.com

With over a decade in the tech industry, I bridge the gap between design, development, and business needs. I work on various projects ranging from finance platforms to interactive 3D experiences.`
    },
    {
      id: 'experience',
      title: 'Experience & Skills',
      date: '2 days ago',
      content: `🎯 Product Strategy & Management
• End-to-end product development
• User research and validation
• Market analysis and positioning

💻 Technical Development
• Frontend: React, Next.js, TypeScript
• Backend: Node.js, Python
• Design: Figma, Sketch, Adobe Creative Suite

🚀 Recent Projects
• Interactive 3D energy grid simulation for E.ON
• Digital communication platform for Grün Berlin
• AI-powered services for Tertianum Premium Residences`
    },
    {
      id: 'philosophy',
      title: 'Work Philosophy',
      date: '1 week ago',
      content: `🎨 Design Thinking First
I believe great products start with understanding user needs and pain points. Every solution should be both beautiful and functional.

⚡ Rapid Prototyping
Quick iterations and user feedback loops are essential. I prefer building and testing over endless planning.

🌱 Continuous Learning
The tech landscape evolves rapidly. I stay current with new technologies and methodologies to deliver cutting-edge solutions.

🤝 Collaborative Approach
The best results come from diverse teams working together. I value open communication and shared ownership of outcomes.`
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
              <div className="w-10 h-10 relative rounded-full overflow-hidden mr-3">
                <Image
                  src="/images/profile.png"
                  alt="Martin Heßmann"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold">About Martin Heßmann</h1>
                <p className="text-sm text-muted-foreground">Personal & Professional Information</p>
              </div>
            </div>
          </div>

          {/* Notes List */}
          <ScrollArea className="flex-grow">
            <div className="p-4 space-y-4">
              {aboutNotes.map((note) => (
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
          <div className="bg-yellow-400 p-4 pt-8">
            <div className="flex items-center">
              <div className="text-white mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2H15C16.1046 2 17 2.89543 17 4V20C17 21.1046 16.1046 22 15 22H9C7.89543 22 7 21.1046 7 20V4C7 2.89543 7.89543 2 9 2Z" fill="currentColor"/>
                  <path d="M9 6H15V8H9V6Z" fill="#FEF3C7"/>
                  <path d="M9 10H15V12H9V10Z" fill="#FEF3C7"/>
                  <path d="M9 14H12V16H9V14Z" fill="#FEF3C7"/>
                </svg>
              </div>
              <h1 className="text-white text-xl font-semibold">Notes</h1>
            </div>
            <p className="text-white/90 text-sm mt-1">About Martin Heßmann</p>
          </div>

          {/* Notes List */}
          <div className="flex-grow bg-black">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {aboutNotes.map((note, index) => (
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