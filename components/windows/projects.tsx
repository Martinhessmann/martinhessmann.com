'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { getAllWebProjects, getProjectCategories } from '@/lib/content'
import { WebProject, Technology } from '@/types/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SearchInput } from '@/components/primitives/search-input'
import { FilterTags } from '@/components/primitives/filter-tags'
import { EmptyState } from '@/components/primitives/empty-state'

export function Projects() {
  const allCategories = getProjectCategories()
  const projects = getAllWebProjects()
  const [filter, setFilter] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'All Projects' | Technology>('All Projects')

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase())
  }, [])

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category as 'All Projects' | Technology)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilter('')
    setSelectedCategory('All Projects')
  }, [])

  const filteredProjects = projects
    .filter(project => {
      // Category filter
      if (selectedCategory !== 'All Projects' && !project.technologies.includes(selectedCategory)) {
        return false
      }

      // Text search filter
      if (filter && !project.title.toLowerCase().includes(filter) &&
          !project.description.toLowerCase().includes(filter) &&
          !project.url.toLowerCase().includes(filter)) {
        return false
      }

      return true
    })

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with search and filters */}
      <div className="p-3 border-b border-bd">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
          <div className="w-full md:w-1/3">
            <SearchInput
              placeholder="Search projects..."
              onChange={handleSearch}
              value={filter}
            />
          </div>

          {/* Category filters */}
          <FilterTags
            options={allCategories}
            selected={selectedCategory}
            onChange={handleCategoryChange}
            allLabel="All Projects"
            className="w-full md:w-auto pb-1 md:pb-0"
          />
        </div>
      </div>

      {/* Project Grid */}
      <ScrollArea className="flex-1 h-0">
        <div className="p-3">
          {filteredProjects.length === 0 ? (
            <EmptyState
              message="No projects found matching your criteria."
              actionLabel="Clear filters"
              onAction={handleClearFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

// Project card component (specific to this window)
function ProjectCard({ project }: { project: WebProject }) {
  return (
    <Card
      className={cn(
        'group h-full flex flex-col overflow-hidden',
        'transition-all duration-200',
        'hover:bg-bg-subtle hover:shadow-md'
      )}
    >
      <a
        href={`https://${project.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full"
      >
        {/* Project Image */}
        <div className="relative aspect-video bg-bg-subtle overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.classList.add('flex', 'items-center', 'justify-center')
                const fallback = document.createElement('div')
                fallback.className = 'flex items-center justify-center w-full h-full bg-bg-subtle'
                const icon = document.createElement('div')
                icon.className = 'text-txt-subtle'
                icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
                fallback.appendChild(icon)
                parent.appendChild(fallback)
              }
            }}
          />
        </div>

        <div className="flex-1 p-3">
          {/* Title */}
          <h3 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-txt-subtle mb-2 line-clamp-2">
            {project.description}
          </p>

          {/* URL and External Link */}
          <div className="flex items-center text-xs text-txt-subtle">
            <span className="flex-1 truncate">{project.url}</span>
            <ExternalLink className="h-3 w-3 flex-shrink-0 ml-1 opacity-70" />
          </div>

          {/* Since Year */}
          <div className="text-xs text-txt-subtle mt-1">
            <span>Since {project.since}</span>
          </div>

          {/* Technologies and Roles */}
          <div className="mt-2 flex flex-wrap gap-1">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-[10px] px-1 py-0"
              >
                {tech}
              </Badge>
            ))}
            {project.roles.map((role) => (
              <Badge
                key={role}
                variant="outline"
                className="text-[10px] px-1 py-0"
              >
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </a>
    </Card>
  )
}