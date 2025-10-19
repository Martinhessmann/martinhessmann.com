"use client"

import { Resume, Work, Project, Skill, Education, Language, Interest } from '@/types/resume'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'
import { useAdminStore } from '@/lib/store/admin-store'
import Image from 'next/image'
import { useEffect, useState, useMemo } from 'react'

interface ResumeProps {
  resume: Resume
}

export function Resume({ resume }: ResumeProps) {
  const { isAdminMode, setHydrated } = useAdminStore()
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Hydrate admin mode from localStorage on mount
  useEffect(() => {
    setHydrated()
  }, [])

  // Get all unique skills from all skill categories
  const allSkills = useMemo(() => {
    if (!resume.skills) return []
    return resume.skills.flatMap(skill => skill.keywords || [])
  }, [resume.skills])

  // Filter projects based on active skill filters and sort alphabetically
  const filteredProjects = useMemo(() => {
    if (!resume.projects) return []

    // If no filters, return all projects sorted alphabetically
    if (activeFilters.length === 0) {
      return [...resume.projects].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      )
    }

    // Filter projects and sort alphabetically
    return resume.projects
      .filter(project => {
        const projectKeywords = project.keywords || []
        return activeFilters.some(filter =>
          projectKeywords.some(keyword =>
            keyword.toLowerCase().includes(filter.toLowerCase()) ||
            filter.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      })
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      )
  }, [resume.projects, activeFilters])

  // Toggle skill filter
  const toggleFilter = (skill: string) => {
    setActiveFilters(prev =>
      prev.includes(skill)
        ? prev.filter(f => f !== skill)
        : [...prev, skill]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([])
  }

  // Define section order and render functions
  const sectionConfig = [
    { key: 'skills', title: 'Skills', render: renderSkills },
    { key: 'projects', title: 'Projects', render: renderProjects },
    { key: 'work', title: 'Work Experience', render: renderWork },
    { key: 'education', title: 'Education', render: renderEducation },
    { key: 'languages', title: 'Languages', render: renderLanguages },
    { key: 'interests', title: 'Interests', render: renderInterests },
    { key: 'stories', title: 'Stories', render: renderStories },
  ]

  return (
    <div className="space-y-12 print:space-y-8">
      {/* Header Section */}
      <header className="mb-12 print:mb-8">
        <div className="flex items-start gap-6 mb-6">
          {/* Profile Image (only in admin mode) */}
          {isAdminMode && resume.basics.image && (
            <div className="flex-shrink-0">
              <Image
                src={resume.basics.image}
                alt={resume.basics.name}
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 print:text-3xl text-foreground">
              {resume.basics.name}
            </h1>
            {resume.basics.label && (
              <p className="text-xl text-muted-foreground mb-4 print:text-lg">
                {resume.basics.label}
              </p>
            )}
          </div>
        </div>

        {resume.basics.summary && (
          <p className="text-base text-foreground leading-relaxed max-w-3xl">
            {resume.basics.summary}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          {resume.basics.location && (
            <span>
              {resume.basics.location.city && `${resume.basics.location.city}`}
              {resume.basics.location.countryCode && `, ${resume.basics.location.countryCode}`}
            </span>
          )}
          {isAdminMode && resume.basics.email && (
            <a
              href={`mailto:${resume.basics.email}`}
              className="hover:text-foreground transition-colors"
            >
              {resume.basics.email}
            </a>
          )}
          {isAdminMode && resume.basics.phone && (
            <a
              href={`tel:${resume.basics.phone}`}
              className="hover:text-foreground transition-colors"
            >
              {resume.basics.phone}
            </a>
          )}
          {resume.basics.url && (
            <a
              href={resume.basics.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {resume.basics.url}
            </a>
          )}
        </div>
      </header>

      {/* Dynamic Sections */}
      {sectionConfig.map(({ key, title, render }) => {
        const data = resume[key as keyof Resume]
        if (!data || (Array.isArray(data) && data.length === 0)) return null

        return (
          <section key={key} className="mb-12 print:mb-8">
            <h2 className="text-2xl font-bold mb-6 print:text-xl print:mb-4 text-foreground">
              {title}
            </h2>
            {render(data)}
          </section>
        )
      })}
    </div>
  )

  // Render functions for each section type
  function renderSkills(skills: Skill[]) {
    return (
      <div className="space-y-6">
        {/* Filter Status */}
        {activeFilters.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProjects?.length || 0} of {resume.projects?.length || 0} projects
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Clear all ({activeFilters.length})
            </button>
          </div>
        )}

        {/* Interactive Skills Categories */}
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-foreground">
                {skill.name}
              </h3>
              {skill.keywords && skill.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {skill.keywords.map((keyword, keywordIndex) => {
                    const isActive = activeFilters.includes(keyword)
                    return (
                      <button
                        key={keywordIndex}
                        onClick={() => toggleFilter(keyword)}
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-muted/50 text-foreground'
                            : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        }`}
                      >
                        {keyword}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderProjects(projects: Project[]) {
    // Use filtered projects instead of the passed projects parameter
    const projectsToRender = filteredProjects || projects

    if (projectsToRender.length === 0 && activeFilters.length > 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No projects found matching the selected skills.
          </p>
          <button
            onClick={clearFilters}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Clear filters to see all projects
          </button>
        </div>
      )
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectsToRender.map((project, index) => (
          <a
            key={index}
            href={project.url || '#'}
            target={project.url ? "_blank" : undefined}
            rel={project.url ? "noopener noreferrer" : undefined}
            className="group relative bg-muted/30 hover:bg-muted/50 rounded-xl transition-all duration-200 flex flex-col cursor-pointer overflow-hidden"
          >
            {/* Project Image - Full width, with role tags overlay */}
            {project.image && (
              <div className="w-full relative bg-muted">
                <img
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  className="w-full h-40 object-cover"
                />
                {/* Role tags overlay on image - only show active roles */}
                <div className="absolute top-3 left-3 flex gap-1">
                  {['Design', 'Dev', 'PM'].map((mainRole) => {
                    const roleKey = mainRole === 'Design' ? 'Design' : mainRole === 'Dev' ? 'Development' : 'Project Management'
                    const isActive = project.roles?.includes(roleKey) || false
                    if (!isActive) return null
                    return (
                      <div
                        key={mainRole}
                        className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-foreground"
                      >
                        {mainRole}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Project Content - Safari style */}
            <div className="p-4 flex-1 flex flex-col gap-1">
              {/* Project Title */}
              <h3 className="text-base font-medium text-foreground group-hover:text-foreground transition-colors line-clamp-1">
                {project.name}
              </h3>

              {/* URL */}
              {project.url && (
                <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors line-clamp-1">
                  {project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                </p>
              )}

              {/* Date - Show as ongoing partnership */}
              {project.startDate && (
                <p className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors mt-2">
                  {(() => {
                    const startYear = parseInt(project.startDate.split('-')[0])
                    return `since ${startYear}`
                  })()}
                </p>
              )}

              {/* Project Keywords/Specs - Filter out client/entity names */}
              {project.keywords && project.keywords.length > 0 && (
                <div className="mt-auto pt-3">
                  <div className="flex flex-wrap gap-1 text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
                    {project.keywords
                      .filter(keyword => keyword !== project.entity)
                      .map((keyword, keywordIndex, filteredArray) => (
                        <span key={keywordIndex}>
                          {keyword}
                          {keywordIndex < filteredArray.length - 1 && <span className="mx-1">•</span>}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    )
  }

  function renderWork(work: Work[]) {
    return (
      <div className="space-y-6">
        {work.map((job, index) => {
          // Check if this is the current job (no endDate or endDate is empty)
          const isCurrentJob = !job.endDate || job.endDate === ''

          return (
            <div key={index} className={`border-l-2 pl-4 ${isCurrentJob ? 'border-foreground' : 'border-muted'}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {job.position}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{job.name}</span>
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {job.startDate && (
                    <span>
                      {job.startDate}
                      {job.endDate ? ` - ${job.endDate}` : ' - Present'}
                    </span>
                  )}
                </div>
              </div>

              {job.summary && (
                <p className="text-sm text-foreground mb-3 leading-relaxed">
                  {job.summary}
                </p>
              )}

              {job.highlights && job.highlights.length > 0 && (
                <ul className="text-sm text-foreground space-y-1">
                  {job.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  function renderEducation(education: Education[]) {
    return (
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border-l-2 border-muted pl-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {edu.studyType} in {edu.area}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {edu.institution}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {edu.startDate && (
                  <span>
                    {edu.startDate}
                    {edu.endDate ? ` - ${edu.endDate}` : ''}
                  </span>
                )}
              </div>
            </div>

            {edu.score && (
              <p className="text-sm text-foreground">
                GPA: {edu.score}
              </p>
            )}

            {edu.courses && edu.courses.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-1">Relevant Courses:</p>
                <p className="text-sm text-foreground">
                  {edu.courses.join(', ')}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  function renderLanguages(languages: Language[]) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {languages.map((lang, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-medium text-foreground">
              {lang.language}
            </span>
            <span className="text-sm text-muted-foreground">
              {lang.fluency}
            </span>
          </div>
        ))}
      </div>
    )
  }

  function renderInterests(interests: Interest[]) {
    return (
      <div className="space-y-6">
        {/* Filter Status */}
        {activeFilters.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProjects?.length || 0} of {resume.projects?.length || 0} projects
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Clear all ({activeFilters.length})
            </button>
          </div>
        )}

        {/* Interactive Interests Categories */}
        <div className="grid gap-6 md:grid-cols-2">
          {interests.map((interest, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-foreground">
                {interest.name}
              </h3>
              {interest.keywords && interest.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {interest.keywords.map((keyword, keywordIndex) => {
                    const isActive = activeFilters.includes(keyword)
                    return (
                      <button
                        key={keywordIndex}
                        onClick={() => toggleFilter(keyword)}
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                        }`}
                      >
                        {keyword}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderStories(stories: any[]) {
    // Placeholder for future stories section
    if (!stories || stories.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>Success stories coming soon...</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {stories.map((story, index) => (
          <div key={index} className="border-l-2 border-muted pl-4">
            {/* Story content will be implemented later */}
            <p>Story content placeholder</p>
          </div>
        ))}
      </div>
    )
  }
}
