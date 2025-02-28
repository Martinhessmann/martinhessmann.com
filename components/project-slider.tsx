'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProjectCard } from './project-card'
import { SectionHeader } from './section-header'

export function ProjectSlider() {
  const projects = [
    {
      title: 'Digital Banking Platform',
      description: 'Led the redesign of a major banking platform, improving user satisfaction by 35% and increasing mobile transactions by 28%.',
      url: 'https://example.com/banking-platform',
      technologies: 'UX Research, Figma, Design System, Prototyping',
      imageSrc: '/images/projects/banking-platform.jpg'
    },
    {
      title: 'E-commerce Checkout Optimization',
      description: 'Redesigned the checkout flow for an e-commerce platform, reducing cart abandonment by 24% and increasing conversion rates.',
      url: 'https://example.com/ecommerce-checkout',
      technologies: 'A/B Testing, User Flows, Wireframing, Analytics',
      imageSrc: '/images/projects/ecommerce-checkout.jpg'
    },
    {
      title: 'Healthcare Patient Portal',
      description: 'Designed and launched a patient portal for a healthcare provider, improving patient engagement and satisfaction scores.',
      url: 'https://example.com/healthcare-portal',
      technologies: 'User Research, Accessibility, Information Architecture',
      imageSrc: '/images/projects/healthcare-portal.jpg'
    },
    {
      title: 'Travel Booking Application',
      description: 'Led the product strategy and UX design for a travel booking application, resulting in a 40% increase in bookings.',
      url: 'https://example.com/travel-app',
      technologies: 'Product Strategy, UX/UI Design, User Testing',
      imageSrc: '/images/projects/travel-app.jpg'
    }
  ]

  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <section id="projects" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <SectionHeader
            title="Featured Projects"
            subtitle="Selected work from my professional career"
            id="projects"
            emoji="🚀"
          />
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div key={index} className="min-w-[280px] md:min-w-[350px] snap-start">
              <ProjectCard
                title={project.title}
                description={project.description}
                url={project.url}
                technologies={project.technologies}
                imageSrc={project.imageSrc}
              />
            </div>
          ))}
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