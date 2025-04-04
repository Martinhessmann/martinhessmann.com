'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, ExternalLink, Tag, ImageIcon } from 'lucide-react'
import { getAllWebProjects, getProjectCategories, getTechnologyColor } from '@/lib/app-content'
import { WebProject, Technology } from '@/types/app-content'

export function WebProjects() {
  const allCategories = getProjectCategories()
  const projects = getAllWebProjects()
  const [selectedCategory, setSelectedCategory] = useState<'All Projects' | Technology>('All Projects')

  const filteredProjects = selectedCategory === 'All Projects'
    ? projects
    : projects.filter(project => project.technologies.includes(selectedCategory))

  return (
    <div className="h-full flex flex-col">
      {/* Search and filters */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1 flex-wrap">
                <button
                  key="All Projects"
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === 'All Projects'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  onClick={() => setSelectedCategory('All Projects')}
                >
                  All Projects
                </button>
                {allCategories.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedCategory === category
                        ? getTechnologyColor(category)
                        : 'bg-secondary hover:bg-secondary/80'
                    } text-white`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <a
              key={project.id}
              href={`https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-lg bg-card border border-border hover:border-border-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Project Image */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.classList.add('flex', 'items-center', 'justify-center')
                      const fallback = document.createElement('div')
                      fallback.className = 'flex items-center justify-center w-full h-full bg-muted'
                      const icon = document.createElement('div')
                      icon.className = 'text-muted-foreground'
                      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
                      fallback.appendChild(icon)
                      parent.appendChild(fallback)
                    }
                  }}
                />
                {/* Technology Badge */}
                <div className="absolute top-2 right-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${getTechnologyColor(tech)} ml-1`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-4">
                {/* Title */}
                <h3 className="font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {project.description}
                </p>

                {/* URL and External Link */}
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="flex-1 truncate">{project.url}</span>
                  <ExternalLink className="h-3 w-3 flex-shrink-0 ml-1 opacity-70" />
                </div>

                {/* Roles */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.roles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}