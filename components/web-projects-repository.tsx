'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, ExternalLink, Tag, Calendar } from 'lucide-react'

interface WebProject {
  title: string
  url: string
  lastUpdated: string
  tags: Array<'Design' | 'Dev' | 'PM'>
  since?: string
  imagePath?: string
  techStack: string
}

export function WebProjectsRepository() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [filterTech, setFilterTech] = useState<string | null>(null)
  const [webProjects] = useState<WebProject[]>([
    {
      title: 'The African Forum for Utility Regulators',
      url: 'afurnet.org',
      lastUpdated: '5 days ago',
      tags: ['Design', 'PM'],
      since: '2022',
      imagePath: '/images/clients/afurnet.org-og.jpg',
      techStack: 'WordPress'
    },
    {
      title: 'Brasserie Colette',
      url: 'brasseriecolette.de',
      lastUpdated: '2 weeks ago',
      tags: ['Design', 'Dev'],
      since: '2020',
      imagePath: '/images/clients/brasseriecolette.de-og.jpg',
      techStack: 'TYPO3'
    },
    {
      title: 'DPF Investment',
      url: 'dpf-investment.de',
      lastUpdated: '3 weeks ago',
      tags: ['Design', 'PM'],
      since: '2021',
      imagePath: '/images/clients/dpf-investment.de-og.jpg',
      techStack: 'WordPress'
    },
    {
      title: 'RAS Services',
      url: 'ras-services.de',
      lastUpdated: 'Last month',
      tags: ['Design', 'Dev', 'PM'],
      since: '2019',
      imagePath: '/images/clients/ras-services.de-og.jpg',
      techStack: 'WordPress'
    },
    {
      title: 'Tertianum Premium Residences',
      url: 'tertianum-premiumresidences.de',
      lastUpdated: '6 days ago',
      tags: ['Design', 'Dev', 'PM'],
      since: '2018',
      imagePath: '/images/clients/tertianum-premiumresidences.de-og.jpg',
      techStack: 'Prismic'
    },
    {
      title: 'Tertianum Premium Group',
      url: 'tertianum.de',
      lastUpdated: '1 week ago',
      tags: ['Design', 'PM'],
      since: '2019',
      imagePath: '/images/clients/tertianum.de-og.jpg',
      techStack: 'WordPress'
    },
    {
      title: 'SpotsUp',
      url: 'spotsup.rent',
      lastUpdated: '2 weeks ago',
      tags: ['Dev', 'PM'],
      since: '2022',
      imagePath: '/images/clients/spotsup.rent-og.jpg',
      techStack: 'Vue.js'
    },
    {
      title: 'Electronica Group',
      url: 'electronica.group',
      lastUpdated: '1 month ago',
      tags: ['Design', 'Dev'],
      since: '2020',
      imagePath: '/images/clients/electronica.group-og.jpg',
      techStack: 'Next.js'
    },
    {
      title: 'Fairworks',
      url: 'fairworks.com',
      lastUpdated: 'Last week',
      tags: ['Design', 'PM'],
      since: '2021',
      imagePath: '/images/clients/fairworks.com-og.jpg',
      techStack: 'React'
    },
    {
      title: 'Grün Berlin',
      url: 'gruen-berlin.de',
      lastUpdated: '4 days ago',
      tags: ['Design', 'Dev', 'PM'],
      since: '2019',
      imagePath: '/images/clients/gruen-berlin.de-og.jpg',
      techStack: 'TYPO3'
    },
    {
      title: 'Infrasignal',
      url: 'infrasignal.de',
      lastUpdated: '1 week ago',
      tags: ['Design', 'Dev'],
      since: '2020',
      imagePath: '/images/clients/infrasignal.de-og.jpg',
      techStack: 'WordPress'
    },
    {
      title: 'Stadt Weide Land',
      url: 'stadtweideland.de',
      lastUpdated: '3 weeks ago',
      tags: ['Design', 'PM'],
      since: '2022',
      imagePath: '/images/clients/stadtweideland.de-og.jpg',
      techStack: 'WordPress'
    },
    {
      title: 'easyCredit Partner',
      url: 'partner.easycredit.de',
      lastUpdated: '2 days ago',
      tags: ['Design', 'Dev'],
      since: '2020',
      imagePath: '/images/clients/partner.easycredit.de-og.jpg',
      techStack: 'Vue.js'
    },
    {
      title: 'Porsche Lifestyle Group Pressroom',
      url: 'press.porsche-design.com',
      lastUpdated: '1 month ago',
      tags: ['Design', 'PM'],
      since: '2019',
      imagePath: '/images/clients/press.porsche-design.com-og.jpg',
      techStack: 'Laravel'
    },
    {
      title: 'TeamBank',
      url: 'teambank.de',
      lastUpdated: 'Last week',
      tags: ['Design', 'Dev', 'PM'],
      since: '2018',
      imagePath: '/images/clients/teambank.de-og.jpg',
      techStack: 'TYPO3'
    },
    {
      title: 'Dein WoMo',
      url: 'dein-womo.de',
      lastUpdated: '6 days ago',
      tags: ['Design', 'Dev'],
      since: '2021',
      imagePath: '/images/clients/dein-womo.de-og.jpg',
      techStack: 'Next.js'
    },
    {
      title: 'Fonds für Wohnen und Mobilität',
      url: 'womofonds.de',
      lastUpdated: '5 days ago',
      tags: ['Design', 'PM'],
      since: '2021',
      imagePath: '/images/clients/womofonds.de-og.jpg',
      techStack: 'Next.js'
    }
  ])

  // Tag colors
  const tagColors = {
    Design: 'bg-blue-500',
    Dev: 'bg-purple-500',
    PM: 'bg-amber-500'
  }

  // Tech stack colors
  const techColors: Record<string, string> = {
    'WordPress': 'bg-blue-600',
    'TYPO3': 'bg-orange-600',
    'Prismic': 'bg-purple-600',
    'Next.js': 'bg-gray-800',
    'React': 'bg-blue-400',
    'Vue.js': 'bg-green-600',
    'Laravel': 'bg-red-600'
  }

  // Filter projects based on search term, tag filter, and tech stack filter
  const filteredProjects = webProjects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.url.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTag = filterTag ? project.tags.includes(filterTag as any) : true
    const matchesTech = filterTech ? project.techStack === filterTech : true

    return matchesSearch && matchesTag && matchesTech
  })

  // Get all unique tech stacks for filtering
  const uniqueTechStacks = Array.from(new Set(webProjects.map(project => project.techStack)))

  return (
    <section id="web-projects" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Title added directly without SectionHeader component */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center mb-2">
            <span className="text-2xl md:text-3xl mr-3">🌐</span>
            <h2 className="text-2xl md:text-3xl font-bold">Web Projects Repository</h2>
          </div>
          <p className="text-muted-foreground">A collection of websites and web applications I've worked on</p>
        </div>

        {/* Search and filters */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Tag filters */}
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                {(['Design', 'Dev', 'PM'] as const).map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      filterTag === tag
                        ? `text-white ${tagColors[tag]}`
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech stack filters */}
            <div className="flex items-center space-x-1">
              <div className="h-4 w-4 text-muted-foreground">
                <span className="sr-only">Tech Stack</span>
                💻
              </div>
              <div className="flex gap-1 flex-wrap">
                {uniqueTechStacks.map(tech => (
                  <button
                    key={tech}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      filterTech === tech
                        ? `text-white ${techColors[tech] || 'bg-gray-600'}`
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => setFilterTech(filterTech === tech ? null : tech)}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProjects.map((project, index) => (
            <Link
              href={`https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-lg bg-secondary shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Tech stack indicator */}
              <div className="absolute top-2 right-2 z-10">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white ${techColors[project.techStack] || 'bg-gray-600'}`}>
                  {project.techStack}
                </span>
              </div>

              {/* Website screenshot */}
              <div className="relative aspect-video bg-background overflow-hidden">
                {project.imagePath && (
                  <Image
                    src={project.imagePath}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="flex-1 p-4">
                {/* Website title */}
                <div className="flex items-start mb-2">
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>

                {/* URL */}
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <span className="flex-1 truncate">{project.url}</span>
                  <ExternalLink className="h-3 w-3 flex-shrink-0 ml-1 opacity-70" />
                </div>

                {/* Tags and timestamp */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex space-x-1">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`inline-block h-4 w-4 rounded-full ${tagColors[tag]}`}
                        title={tag}
                      ></span>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {project.lastUpdated}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}