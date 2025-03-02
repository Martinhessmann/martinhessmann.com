'use client'

import { useState } from 'react'

export function AboutNotes() {
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0)

  const notes = [
    {
      id: 'about-me-draft',
      title: 'About Me Draft',
      date: 'March 2, 2023',
      content: `I'm Martin Heßmann, a Product Generalist who bridges the gap between design, development, and business needs.

I'm neither exclusively a PM, Developer, nor Designer—but a blend of all three, helping teams create intuitive, accessible, and impactful digital experiences.

With over a decade in the tech industry, I've developed a holistic approach to product development:

• Translating business requirements into technical specifications
• Bridging communication gaps between diverse stakeholders
• Creating design systems that scale with product growth
• Implementing front-end solutions with modern frameworks
• Building processes for sustainable team collaboration

My philosophy: Great products emerge from the intersection of design intuition, technical possibility, and business necessity.`,
    },
    {
      id: 'skills-overview',
      title: 'Skills Overview',
      date: 'February 28, 2023',
      content: `Core Skills:
- Product Strategy & Roadmapping
- UX/UI Design
- Front-End Development
- Team Leadership
- Stakeholder Management

Technologies:
- Design: Figma, Adobe Creative Suite
- Frontend: React, Next.js, TypeScript, Tailwind
- Documentation: Notion, Confluence

My superpower is connecting these disciplines to create cohesive product experiences that deliver both user and business value.`,
    },
    {
      id: 'work-philosophy',
      title: 'Work Philosophy',
      date: 'February 25, 2023',
      content: `My Product Philosophy:

1. Users First, Always
I believe in deeply understanding user needs before writing a single line of code or drawing a single pixel.

2. Simplicity Over Feature Bloat
Every feature must earn its place in the product. When in doubt, simplify.

3. Collaborative Creation
The best products emerge from cross-functional teams working closely together, respecting each other's expertise.

4. Data-Informed, Not Data-Driven
Data provides insights, but doesn't replace human judgment or empathy.

5. Continuous Improvement
Products are never "done" - they evolve through constant learning and iteration.`,
    },
  ]

  const currentNote = notes[currentNoteIndex]

  return (
    <div className="h-full flex flex-col">
      {/* Notes toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center">
        <button className="text-xs mr-6 text-gray-500">+ New Note</button>
        <button className="text-xs mr-3 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Today
        </button>
        <div className="flex-grow"></div>
        <button className="text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <div className="flex-grow flex">
        {/* Notes sidebar */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-auto">
          <div className="p-3 text-xs text-gray-500">
            <div className="mb-2">On My Mac</div>
            <div className="mb-1 pl-2">Notes: {notes.length}</div>
          </div>

          {notes.map((note, index) => (
            <div
              key={note.id}
              className={`p-2 mx-1 rounded cursor-pointer ${currentNoteIndex === index ? 'bg-blue-100 dark:bg-blue-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => setCurrentNoteIndex(index)}
            >
              <div className="font-medium text-sm mb-1">{note.title}</div>
              <div className="text-xs text-gray-500">
                <span className="mr-1">{note.date}</span>
                {note.content.substring(0, 30)}...
              </div>
            </div>
          ))}
        </div>

        {/* Note content */}
        <div className="w-2/3 p-4 overflow-auto">
          <input
            className="w-full font-bold text-lg mb-2 bg-transparent border-none outline-none"
            defaultValue={currentNote.title}
            readOnly
          />
          <div className="text-xs text-gray-500 mb-4">
            Last edited on {currentNote.date} • 123 words
          </div>
          <div className="whitespace-pre-line">
            {currentNote.content}
          </div>
        </div>
      </div>
    </div>
  )
}