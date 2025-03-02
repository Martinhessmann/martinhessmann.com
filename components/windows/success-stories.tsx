'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SuccessStory {
  id: string
  title: string
  description: string
  technologies: string
  clientName: string
  year: string
  imageSrc: string
  impact: string
}

export function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const stories: SuccessStory[] = [
    {
      id: 'banking-platform',
      title: 'Digital Banking Platform',
      description: 'Led the redesign of a major banking platform, improving user satisfaction by 35% and increasing mobile transactions by 28%.',
      clientName: 'TeamBank AG',
      year: '2022',
      technologies: 'UX Research, Figma, Design System, Prototyping',
      imageSrc: '/images/projects/banking-platform.jpg',
      impact: 'Increased mobile transactions by 28%, improved user satisfaction by 35%, reduced support tickets by 42%'
    },
    {
      id: 'womofonds',
      title: 'WoMo Fonds Platform',
      description: 'Designed and developed a funding platform for sustainable mobile living, enabling users to invest in eco-friendly mobile homes.',
      clientName: 'EVG / WoMoFonds',
      year: '2021',
      technologies: 'Next.js, User Flows, Authentication, Payment Integration',
      imageSrc: '/images/projects/womofonds.jpg',
      impact: 'Facilitated €2.5M in investments, 12,000+ registered users, 98% payment success rate'
    },
    {
      id: 'government-services',
      title: 'Government Services Portal',
      description: 'Revamped a digital services platform for a government agency, focusing on accessibility and streamlined user journeys.',
      clientName: 'Bundesministerium',
      year: '2021',
      technologies: 'React, Accessibility Testing, Design Systems, User Research',
      imageSrc: '/images/projects/government.jpg',
      impact: 'Improved WCAG compliance from 65% to 98%, reduced form completion time by 47%, increased service utilization by 31%'
    },
    {
      id: 'healthcare-platform',
      title: 'Healthcare Management System',
      description: 'Developed a comprehensive patient management system for healthcare providers, integrating appointment scheduling, medical records, and billing.',
      clientName: 'Medical Group GmbH',
      year: '2020',
      technologies: 'React, Node.js, MongoDB, Express, HIPAA Compliance',
      imageSrc: '/images/projects/healthcare.jpg',
      impact: 'Reduced administrative time by 35%, improved appointment adherence by 28%, 99.9% uptime'
    }
  ]

  const currentStory = stories[currentIndex]

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1))
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1))
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Preview toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="ml-4 text-xs">
          {currentIndex + 1} of {stories.length}
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-grow overflow-auto p-6">
        <div className="max-w-xl mx-auto">
          {/* Image */}
          <div className="mb-6 rounded-lg overflow-hidden shadow-md relative h-64">
            <Image
              src={currentStory.imageSrc}
              alt={currentStory.title}
              fill
              sizes="(max-width: 768px) 100vw, 576px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <div className="flex items-center">
                <span className="text-xs py-1 px-2 bg-white/20 backdrop-blur-sm rounded mr-2">
                  {currentStory.year}
                </span>
                <span className="text-xs">Client: {currentStory.clientName}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-xl font-bold mb-3">{currentStory.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {currentStory.description}
          </p>

          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Technologies</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {currentStory.technologies}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">Impact</h3>
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-3">
              <p className="text-green-800 dark:text-green-300 text-sm">
                {currentStory.impact}
              </p>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {stories.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}