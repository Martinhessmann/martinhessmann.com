'use client'

import { useState } from 'react'
import Image from 'next/image'

interface WebProject {
  id: string
  title: string
  description: string
  image: string
  url: string
  technologies: string[]
  year: string
}

export function WebProjects() {
  const [activeTab, setActiveTab] = useState('all')

  const projects: WebProject[] = [
    {
      id: 'ecommerce-platform',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce solution with headless CMS integration, custom product configurator, and international payment processing.',
      image: '/images/projects/ecommerce.jpg',
      url: 'https://example-ecommerce.com',
      technologies: ['Next.js', 'Stripe', 'Contentful', 'Tailwind CSS'],
      year: '2023'
    },
    {
      id: 'fintech-dashboard',
      title: 'FinTech Dashboard',
      description: 'A comprehensive financial analytics dashboard with real-time data visualization, user authentication, and reporting features.',
      image: '/images/projects/fintech.jpg',
      url: 'https://fintech-dashboard.com',
      technologies: ['React', 'D3.js', 'Firebase', 'Material UI'],
      year: '2022'
    },
    {
      id: 'social-platform',
      title: 'Social Media Platform',
      description: 'A community platform with real-time messaging, content sharing, and customizable user profiles.',
      image: '/images/projects/social.jpg',
      url: 'https://social-platform.com',
      technologies: ['React', 'Socket.io', 'MongoDB', 'Express', 'Node.js'],
      year: '2022'
    },
    {
      id: 'health-tracker',
      title: 'Health & Fitness Tracker',
      description: 'A wellness application for tracking health metrics, workout routines, and nutrition with personalized recommendations.',
      image: '/images/projects/health.jpg',
      url: 'https://health-tracker.app',
      technologies: ['React Native', 'Redux', 'Firebase', 'Chart.js'],
      year: '2021'
    },
    {
      id: 'education-platform',
      title: 'Education Platform',
      description: 'An interactive learning platform with course management, video lessons, quizzes, and progress tracking.',
      image: '/images/projects/education.jpg',
      url: 'https://education-platform.com',
      technologies: ['Vue.js', 'Laravel', 'PostgreSQL', 'AWS'],
      year: '2021'
    },
    {
      id: 'realestate-app',
      title: 'Real Estate Application',
      description: 'A property listing and management system with map integration, virtual tours, and agent collaboration tools.',
      image: '/images/projects/realestate.jpg',
      url: 'https://realestate-app.com',
      technologies: ['React', 'Node.js', 'MongoDB', 'Mapbox', 'ThreeJS'],
      year: '2020'
    }
  ]

  // Filter projects based on active tab
  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(project => project.technologies.some(tech =>
        tech.toLowerCase().includes(activeTab.toLowerCase())
      ))

  return (
    <div className="h-full flex flex-col">
      {/* Safari-like toolbar */}
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-1 flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1">
          <button className="text-gray-600 dark:text-gray-400 px-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="text-gray-600 dark:text-gray-400 px-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex-grow">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-md flex items-center px-3 py-1 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-gray-500 dark:text-gray-300">martinhessmann.com/projects</span>
          </div>
        </div>

        <button className="text-gray-600 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <button className="text-gray-600 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      {/* Filter tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
        <div className="flex space-x-4 overflow-x-auto text-sm">
          <button
            className={`px-3 py-1 rounded-md ${activeTab === 'all' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setActiveTab('all')}
          >
            All Projects
          </button>
          <button
            className={`px-3 py-1 rounded-md ${activeTab === 'react' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setActiveTab('react')}
          >
            React
          </button>
          <button
            className={`px-3 py-1 rounded-md ${activeTab === 'next' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setActiveTab('next')}
          >
            Next.js
          </button>
          <button
            className={`px-3 py-1 rounded-md ${activeTab === 'vue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setActiveTab('vue')}
          >
            Vue.js
          </button>
          <button
            className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'node' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setActiveTab('node')}
          >
            Node.js
          </button>
        </div>
      </div>

      {/* Projects grid */}
      <div className="flex-grow overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{project.year}</span>
                  <a
                    href={project.url}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Project →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}