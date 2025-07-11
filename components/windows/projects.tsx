'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ExternalLink, ChevronLeft } from 'lucide-react'
import { getAllWebProjects, getProjectCategories } from '@/lib/content'
import { WebProject, Technology } from '@/types/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SearchInput } from '@/components/primitives/search-input'
import { FilterTags } from '@/components/primitives/filter-tags'
import { EmptyState } from '@/components/primitives/empty-state'
import { useIsMobile } from '@/hooks/use-mobile'

export function Projects() {
  const isMobile = useIsMobile()
  const allCategories = getProjectCategories()
  const projects = getAllWebProjects()
  const [filter, setFilter] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'All Projects' | Technology>('All Projects')
  const [selectedProject, setSelectedProject] = useState<WebProject | null>(null)
  const [view, setView] = useState<'overview' | 'detail'>('overview')

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

  const handleProjectSelect = (project: WebProject) => {
    setSelectedProject(project)
    if (isMobile) {
      setView('detail')
    }
  }

  const handleBackToOverview = () => {
    setView('overview')
    setSelectedProject(null)
  }

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

  // Desktop layout (existing grid view)
  if (!isMobile) {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-background">
        {/* Header with search and filters */}
        <div className="p-3 border-b border-border bg-secondary">
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
        <ScrollArea className="flex-1 h-0 bg-background">
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
                  <ProjectCard key={project.id} project={project} onSelect={handleProjectSelect} />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    )
  }

  // Mobile layout (overview-detail pattern)
  return (
    <div className="h-full bg-background relative overflow-hidden">
      {/* Overview View - Projects Grid */}
      <div className={`absolute inset-0 transition-transform duration-300 ease-out ${
        view === 'overview' ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-card border-b border-border p-4 pt-8">
            <h1 className="text-xl font-semibold">Projects</h1>
            <p className="text-sm text-muted-foreground">Web Projects & Portfolio</p>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <SearchInput
              placeholder="Search projects..."
              onChange={handleSearch}
              value={filter}
            />
          </div>

          {/* Category filters */}
          <div className="px-4 py-2 border-b border-border">
            <FilterTags
              options={allCategories}
              selected={selectedCategory}
              onChange={handleCategoryChange}
              allLabel="All Projects"
              className="w-full"
            />
          </div>

          {/* Projects List */}
          <div className="flex-grow overflow-y-auto">
            <div className="p-4">
              {filteredProjects.length === 0 ? (
                <EmptyState
                  message="No projects found matching your criteria."
                  actionLabel="Clear filters"
                  onAction={handleClearFilters}
                />
              ) : (
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className="w-full text-left bg-card rounded-lg overflow-hidden hover:bg-muted transition-colors"
                    >
                      {/* Project Image */}
                      <div className="relative aspect-video w-full bg-muted overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Project Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{project.description}</p>

                        <div className="text-sm text-muted-foreground mb-3">
                          <span>{project.url}</span> • <span>Since {project.since}</span>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail View - Project Detail */}
      <div className={`absolute inset-0 transition-transform duration-300 ease-out ${
        view === 'detail' ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {selectedProject && (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-card border-b border-border p-4 pt-8 flex items-center">
              <button
                onClick={handleBackToOverview}
                className="mr-3 p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              <div className="flex-grow">
                <div className="font-medium text-base line-clamp-1">{selectedProject.title}</div>
                <div className="text-sm text-muted-foreground">{selectedProject.url}</div>
              </div>
            </div>

            {/* Project Content */}
            <div className="flex-grow overflow-y-auto">
              <div className="p-4">
                {/* Project Image */}
                <div className="mb-6 relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">{selectedProject.title}</h2>
                  <p className="text-base leading-relaxed text-muted-foreground mb-4">{selectedProject.description}</p>
                  <div className="text-sm text-muted-foreground">
                    <span>Since {selectedProject.since}</span> • <span>Last updated {selectedProject.lastUpdated}</span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Roles */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">Roles</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.roles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className="text-sm"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Visit Website */}
                <div>
                  <a
                    href={`https://${selectedProject.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Project card component (specific to this window)
function ProjectCard({ project, onSelect }: { project: WebProject, onSelect?: (project: WebProject) => void }) {
  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault()
      onSelect(project)
    }
  }

  return (
    <Card
      className={cn(
        'group h-full flex flex-col overflow-hidden bg-background border-border',
        'transition-all duration-200',
        'hover:bg-secondary hover:shadow-md'
      )}
    >
      <a
        href={`https://${project.url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full"
        onClick={handleClick}
      >
        {/* Project Image */}
        <div className="relative aspect-video bg-muted overflow-hidden">
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
                fallback.className = 'flex items-center justify-center w-full h-full bg-muted'
                const icon = document.createElement('div')
                icon.className = 'text-muted-foreground'
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
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {project.description}
          </p>

          {/* URL and External Link */}
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="flex-1 truncate">{project.url}</span>
            <ExternalLink className="h-3 w-3 flex-shrink-0 ml-1 opacity-70" />
          </div>

          {/* Since Year */}
          <div className="text-xs text-muted-foreground mt-1">
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