"use client"

import { Resume, Work, Project, Skill, Education, Language, Interest } from '@/types/resume'
import { ExternalLink } from 'lucide-react'

interface ResumeProps {
  resume: Resume
}

export function Resume({ resume }: ResumeProps) {
  return (
    <div className="space-y-12 print:space-y-6">
      {/* Header Section */}
      <header className="mb-12 print:mb-6">
        <h1 className="text-4xl font-bold mb-2 print:text-2xl text-foreground">
          {resume.basics.name}
        </h1>
        {resume.basics.label && (
          <p className="text-xl text-muted-foreground mb-4 print:text-base">
            {resume.basics.label}
          </p>
        )}

        {resume.basics.summary && (
          <p className="text-base text-foreground leading-relaxed max-w-3xl mb-6 print:text-sm print:mb-4">
            {resume.basics.summary}
          </p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground print:gap-2 print:text-xs">
          {resume.basics.location && (
            <span>
              {resume.basics.location.city && `${resume.basics.location.city}`}
              {resume.basics.location.countryCode && `, ${resume.basics.location.countryCode}`}
            </span>
          )}
          {resume.basics.email && (
            <a
              href={`mailto:${resume.basics.email}`}
              className="hover:text-foreground transition-colors"
            >
              {resume.basics.email}
            </a>
          )}
          {resume.basics.phone && (
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

      {/* Work Experience */}
      {resume.work && resume.work.length > 0 && (
        <section className="mb-12 print:mb-6">
          <h2 className="text-2xl font-bold mb-6 print:text-lg print:mb-3 text-foreground">
            Work Experience
          </h2>
          <div className="space-y-6 print:space-y-3">
            {resume.work.map((job, index) => {
              const isCurrentJob = !job.endDate || job.endDate === ''
              return (
                <div key={index} className={`border-l-2 pl-4 ${isCurrentJob ? 'border-foreground' : 'border-muted'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground print:text-base">
                        {job.position}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground print:text-xs">
                        <span>{job.name}</span>
                        {job.url && (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-foreground transition-colors print:hidden"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground print:text-xs">
                      {job.startDate && (
                        <span>
                          {job.startDate}
                          {job.endDate ? ` - ${job.endDate}` : ' - Present'}
                        </span>
                      )}
                    </div>
                  </div>

                  {job.summary && (
                    <p className="text-sm text-foreground mb-3 leading-relaxed print:text-xs print:mb-2">
                      {job.summary}
                    </p>
                  )}

                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="text-sm text-foreground space-y-1 print:text-xs">
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
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-12 print:mb-6">
          <h2 className="text-2xl font-bold mb-6 print:text-lg print:mb-3 text-foreground">
            Projects
          </h2>

          {/* Grid layout for screen, list for print */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 print:block print:space-y-3">
            {resume.projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-muted/30 hover:bg-muted/50 rounded-xl transition-all duration-200 flex flex-col overflow-hidden print:bg-transparent print:rounded-none print:border-l-2 print:border-muted print:pl-4"
              >
                {/* Project Image - hidden in print */}
                {project.image && (
                  <div className="w-full relative bg-muted print:hidden">
                    <img
                      src={project.image}
                      alt={`${project.name} project screenshot`}
                      className="w-full h-40 object-cover"
                    />
                    {/* Role tags overlay on image */}
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

                {/* Project Content */}
                <div className="p-4 flex-1 flex flex-col gap-1 print:p-0">
                  <div className="flex items-start justify-between gap-2 print:flex-col">
                    <h3 className="text-base font-medium text-foreground group-hover:text-foreground transition-colors print:text-sm">
                      {project.name}
                    </h3>
                    {project.startDate && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {(() => {
                          const startYear = parseInt(project.startDate.split('-')[0])
                          return `since ${startYear}`
                        })()}
                      </span>
                    )}
                  </div>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors line-clamp-1 hover:underline"
                    >
                      {project.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </a>
                  )}

                  {project.description && (
                    <p className="text-sm text-muted-foreground mt-2 print:text-xs print:mt-1">
                      {project.description}
                    </p>
                  )}

                  {/* Technologies */}
                  {project.keywords && project.keywords.length > 0 && (
                    <div className="mt-auto pt-3 print:pt-2">
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
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-12 print:mb-6">
          <h2 className="text-2xl font-bold mb-6 print:text-lg print:mb-3 text-foreground">
            Skills
          </h2>
          <div className="grid gap-6 md:grid-cols-2 print:gap-3">
            {resume.skills.map((skill, index) => (
              <div key={index} className="space-y-2 print:space-y-1">
                <h3 className="font-semibold text-foreground print:text-sm">
                  {skill.name}
                </h3>
                {skill.keywords && skill.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 text-sm text-muted-foreground print:text-xs">
                    {skill.keywords.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section className="mb-12 print:mb-6">
          <h2 className="text-2xl font-bold mb-6 print:text-lg print:mb-3 text-foreground">
            Education
          </h2>
          <div className="space-y-4 print:space-y-2">
            {resume.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-muted pl-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground print:text-base">
                      {edu.studyType} in {edu.area}
                    </h3>
                    <p className="text-sm text-muted-foreground print:text-xs">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground print:text-xs">
                    {edu.startDate && (
                      <span>
                        {edu.startDate}
                        {edu.endDate ? ` - ${edu.endDate}` : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {resume.languages && resume.languages.length > 0 && (
        <section className="mb-12 print:mb-6">
          <h2 className="text-2xl font-bold mb-6 print:text-lg print:mb-3 text-foreground">
            Languages
          </h2>
          <div className="grid gap-4 md:grid-cols-2 print:gap-2">
            {resume.languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium text-foreground print:text-sm">
                  {lang.language}
                </span>
                <span className="text-sm text-muted-foreground print:text-xs">
                  {lang.fluency}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests */}
      {resume.interests && resume.interests.length > 0 && (
        <section className="mb-12 print:mb-6">
          <h2 className="text-2xl font-bold mb-6 print:text-lg print:mb-3 text-foreground">
            Interests
          </h2>
          <div className="grid gap-6 md:grid-cols-2 print:gap-3">
            {resume.interests.map((interest, index) => (
              <div key={index} className="space-y-2 print:space-y-1">
                <h3 className="font-semibold text-foreground print:text-sm">
                  {interest.name}
                </h3>
                {interest.keywords && interest.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 text-sm text-muted-foreground print:text-xs">
                    {interest.keywords.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}