import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from './section-header'

interface ClientProject {
  name: string
  description: string
  logoSrc: string
  url: string
  platform: string
  industry: string
}

export function ClientProjectsShowcase() {
  const clientProjects: ClientProject[] = [
    {
      name: 'Grün Berlin',
      description: 'Digital communication platform for public participation in sustainable urban development projects.',
      logoSrc: '/images/clients/grun-berlin-logo.jpg',
      url: 'https://www.gruen-berlin.de/',
      platform: 'Web Application',
      industry: 'Urban Development'
    },
    {
      name: 'E.ON - What\'s Netz',
      description: 'Interactive 3D grid simulation that explains complex energy grid structures through gamification.',
      logoSrc: '/images/clients/eon-logo.jpg',
      url: 'https://www.eon.com/de/c/whatsnetz.html',
      platform: 'Interactive Installation',
      industry: 'Energy'
    },
    {
      name: 'Tertianum Premium Residences',
      description: 'Digital services and solutions for future-oriented living catering to an aging society.',
      logoSrc: '/images/clients/tertianum-logo.jpg',
      url: 'https://www.tertianum.de/',
      platform: 'Digital Services',
      industry: 'Real Estate'
    }
  ]

  return (
    <section id="clients" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Client Partnerships"
          subtitle="Long-term collaborations with innovative organizations"
          emoji="🤝"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientProjects.map((project) => (
            <div
              key={project.name}
              className="bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] group"
            >
              <div className="h-40 bg-white flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <Image
                    src={project.logoSrc}
                    alt={`${project.name} logo`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">{project.platform}</span>
                  <span className="text-xs px-2 py-1 bg-muted rounded-full">{project.industry}</span>
                </div>

                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary group-hover:underline"
                >
                  Visit website
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}