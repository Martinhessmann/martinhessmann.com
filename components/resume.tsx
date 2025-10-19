"use client"

import { Resume, Work, Project, Skill, Education, Language, Interest } from '@/types/resume'
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'
import { useAdminStore } from '@/lib/store/admin-store'
import Image from 'next/image'
import { useEffect } from 'react'

interface ResumeProps {
  resume: Resume
}

export function Resume({ resume }: ResumeProps) {
  const { isAdminMode, setHydrated } = useAdminStore()

  // Hydrate admin mode from localStorage on mount
  useEffect(() => {
    setHydrated()
  }, [])

  // Define section order and render functions
  const sectionConfig = [
    { key: 'skills', title: 'Skills', render: renderSkills },
    { key: 'projects', title: 'Projects', render: renderProjects },
    { key: 'work', title: 'Work Experience', render: renderWork },
    { key: 'education', title: 'Education', render: renderEducation },
    { key: 'languages', title: 'Languages', render: renderLanguages },
    { key: 'interests', title: 'Interests', render: renderInterests },
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
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-semibold text-foreground">
              {skill.name}
            </h3>
            {skill.keywords && skill.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {skill.keywords.map((keyword, keywordIndex) => (
                  <Badge key={keywordIndex} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  function renderProjects(projects: Project[]) {
    return (
      <div className="grid gap-6 md:gap-8">
        {projects.map((project, index) => (
          <div key={index} className="border-l-2 border-muted pl-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {project.name}
                </h3>
                {project.entity && (
                  <p className="text-sm text-muted-foreground">
                    {project.entity}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {project.startDate && (
                  <span>{project.startDate}</span>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={14} />
                    Visit
                  </a>
                )}
              </div>
            </div>

            {project.description && (
              <p className="text-sm text-foreground mb-3 leading-relaxed">
                {project.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-2">
              {project.roles && project.roles.map((role, roleIndex) => (
                <Badge key={roleIndex} variant="secondary" className="text-xs">
                  {role}
                </Badge>
              ))}
              {project.type && (
                <Badge variant="outline" className="text-xs">
                  {project.type}
                </Badge>
              )}
            </div>

            {project.keywords && project.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {project.keywords.map((keyword, keywordIndex) => (
                  <Badge key={keywordIndex} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  function renderWork(work: Work[]) {
    return (
      <div className="space-y-6">
        {work.map((job, index) => (
          <div key={index} className="border-l-2 border-muted pl-4">
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
        ))}
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
      <div className="space-y-4">
        {interests.map((interest, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-semibold text-foreground">
              {interest.name}
            </h3>
            {interest.keywords && interest.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {interest.keywords.map((keyword, keywordIndex) => (
                  <Badge key={keywordIndex} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
}
