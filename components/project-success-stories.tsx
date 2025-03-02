'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { SectionHeader } from './section-header'

interface ProjectSuccess {
  title: string
  description: string
  technologies: string
  clientName: string
  year: string
  imageSrc: string
  videoSrc?: string  // Optional video source for hover effect
  url: string
}

export function ProjectSuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const projects: ProjectSuccess[] = [
    {
      title: 'Digital Banking Platform',
      description: 'Led the redesign of a major banking platform, improving user satisfaction by 35% and increasing mobile transactions by 28%.',
      clientName: 'TeamBank AG',
      year: '2022',
      technologies: 'UX Research, Figma, Design System, Prototyping',
      imageSrc: '/images/projects/banking-platform.jpg',
      videoSrc: '/videos/banking-platform.webm',
      url: 'https://teambank.de'
    },
    {
      title: 'WoMo Fonds Platform',
      description: 'Designed and developed a funding platform for sustainable mobile living, enabling users to invest in eco-friendly mobile homes.',
      clientName: 'EVG / WoMoFonds',
      year: '2021',
      technologies: 'Next.js, User Flows, Authentication, Payment Integration',
      imageSrc: '/images/projects/womofonds.jpg',
      videoSrc: '/videos/womofonds.webm',
      url: 'https://womofonds.de'
    },
    {
      title: 'Tertianum Premium Residences',
      description: 'Created a digital platform for luxury senior living, integrating resident services, dining options, and event management.',
      clientName: 'Tertianum',
      year: '2019',
      technologies: 'User Research, Accessibility, Information Architecture',
      imageSrc: '/images/projects/tertianum.jpg',
      videoSrc: '/videos/tertianum.webm',
      url: 'https://tertianum.de'
    },
    {
      title: 'SpotsUp Rental Platform',
      description: 'Built a marketplace platform for renting and listing unique event spaces and locations in major European cities.',
      clientName: 'Electronica Group',
      year: '2022',
      technologies: 'Marketplace Design, UX/UI Design, React, Maps Integration',
      imageSrc: '/images/projects/spotsup.jpg',
      videoSrc: '/videos/spotsup.webm',
      url: 'https://spotsup.rent'
    },
    {
      title: 'Fairworks HR Platform',
      description: 'Developed a comprehensive HR management system for fair employment practices and workforce management.',
      clientName: 'Electronica Group',
      year: '2021',
      technologies: 'Product Strategy, UX/UI Design, User Testing',
      imageSrc: '/images/projects/fairworks.jpg',
      videoSrc: '/videos/fairworks.webm',
      url: 'https://fairworks.com'
    }
  ]

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -500, behavior: 'smooth' })
      const newIndex = Math.max(0, activeIndex - 1)
      setActiveIndex(newIndex)
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 500, behavior: 'smooth' })
      const newIndex = Math.min(projects.length - 1, activeIndex + 1)
      setActiveIndex(newIndex)
    }
  }

  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <SectionHeader
            title="Project Success Stories"
            subtitle="Key achievements from collaborations with innovative clients"
            emoji="🚀"
          />
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Previous project"
              disabled={activeIndex === 0}
            >
              <ChevronLeft className={`h-5 w-5 ${activeIndex === 0 ? 'text-muted-foreground' : ''}`} />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Next project"
              disabled={activeIndex === projects.length - 1}
            >
              <ChevronRight className={`h-5 w-5 ${activeIndex === projects.length - 1 ? 'text-muted-foreground' : ''}`} />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} isActive={index === activeIndex} />
          ))}
        </div>

        {/* Project Milestones */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Milestone
            title="35%"
            description="Increase in user satisfaction for the Digital Banking Platform"
            clientName="TeamBank AG"
          />
          <Milestone
            title="50+"
            description="Funding applications processed through the WoMo Fonds Platform"
            clientName="EVG / WoMoFonds"
          />
          <Milestone
            title="28%"
            description="Growth in mobile transactions for banking clients"
            clientName="TeamBank AG"
          />
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

function ProjectCard({ project, isActive }: { project: ProjectSuccess, isActive: boolean }) {
  const [isHovering, setIsHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle video playback on hover
  const handleMouseEnter = () => {
    setIsHovering(true)
    if (videoRef.current && project.videoSrc) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error)
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className={`min-w-[300px] md:min-w-[650px] h-[400px] snap-start bg-secondary rounded-lg shadow-md overflow-hidden transition-all duration-500 ${isActive ? 'scale-100' : 'scale-95 opacity-80'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-3/5 h-48 md:h-full relative">
          {/* Image */}
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className={`object-cover transition-opacity duration-300 ${isHovering && project.videoSrc ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Video overlay (shown on hover) */}
          {project.videoSrc && (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
              muted
              loop
              playsInline
              preload="none"
            >
              <source src={project.videoSrc} type="video/webm" />
            </video>
          )}

          {/* Play button indicator */}
          {project.videoSrc && (
            <div className={`absolute bottom-4 right-4 bg-black/70 rounded-full p-2 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-70'}`}>
              <Play className="h-6 w-6 text-white" />
            </div>
          )}

          {/* Client and year */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
              {project.clientName}
            </span>
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
              {project.year}
            </span>
          </div>
        </div>

        <div className="w-full md:w-2/5 p-6 flex flex-col">
          <h3 className="text-xl font-medium mb-3">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>

          <div className="mt-auto">
            <div className="text-xs text-muted-foreground mb-2">Technologies:</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.split(',').map((tech, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full">
                  {tech.trim()}
                </span>
              ))}
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              View project
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Milestone({ title, description, clientName }: { title: string, description: string, clientName: string }) {
  return (
    <div className="bg-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-3">{title}</div>
      <p className="text-sm mb-2">{description}</p>
      <span className="text-xs text-muted-foreground block">{clientName}</span>
    </div>
  )
}