'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Define the timeline data structure
interface WorkPhase {
  title: string
  company: string
  period: string
  location: string
  skills: string[]
  tools: string[]
  clientTypes: string[]
}

const workPhases: WorkPhase[] = [
  {
    title: 'Creative Technologist',
    company: 'Aperto | IBM',
    period: '2018 — 2023',
    location: 'Berlin',
    skills: ['Frontend Development', 'UI/UX Design', 'Technical Project Management', 'Creative Direction', 'Client Consulting'],
    tools: ['Next.js', 'React', 'TypeScript', 'Vue.js', 'Node.js', 'Figma', 'Adobe Creative Suite'],
    clientTypes: ['Enterprise Clients', 'Government', 'Public Sector', 'NGOs']
  },
  {
    title: 'Frontend Developer',
    company: 'Aperto',
    period: '2014 — 2018',
    location: 'Berlin',
    skills: ['Frontend Development', 'UI Design', 'Web Animation', 'Responsive Design'],
    tools: ['JavaScript', 'HTML/CSS', 'jQuery', 'SASS/LESS', 'PHP', 'WordPress', 'TYPO3'],
    clientTypes: ['Enterprise Clients', 'E-Commerce', 'Corporate Websites']
  },
  {
    title: 'Web Designer',
    company: 'Digital Pioneers',
    period: '2013 — 2014',
    location: 'Berlin',
    skills: ['UI Design', 'Frontend Development', 'Visual Design'],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'HTML/CSS', 'WordPress'],
    clientTypes: ['Startups', 'Small Businesses', 'Local Agencies']
  },
  {
    title: 'Freelance Designer',
    company: 'Self-employed',
    period: '2010 — 2014',
    location: 'Berlin',
    skills: ['Graphic Design', 'Logo Design', 'Brand Identity', 'Web Design', 'Print Design'],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'HTML/CSS', 'WordPress'],
    clientTypes: ['Local Businesses', 'Startups', 'Artists', 'Small Agencies']
  }
]

export function WorkJourney() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const activePhase = workPhases[activePhaseIndex]

  const handleNext = () => {
    setActivePhaseIndex((prev) => (prev + 1) % workPhases.length)
  }

  const handlePrev = () => {
    setActivePhaseIndex((prev) => (prev - 1 + workPhases.length) % workPhases.length)
  }

  return (
    <section id="journey" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center mb-2">
            <span className="text-2xl md:text-3xl mr-3">💼</span>
            <h2 className="text-2xl md:text-3xl font-bold">Professional Experience</h2>
          </div>
          <p className="text-muted-foreground">My career path and skill development</p>
        </div>

        {/* Timeline navigation */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Previous phase"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex-1 mx-4">
              <div className="relative h-1 bg-muted rounded-full">
                {/* Timeline dots */}
                {workPhases.map((phase, index) => (
                  <button
                    key={index}
                    className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full transition-colors ${
                      index === activePhaseIndex ? 'bg-primary' : 'bg-primary/50 hover:bg-primary/70'
                    }`}
                    style={{ left: `${(index / (workPhases.length - 1)) * 100}%` }}
                    onClick={() => setActivePhaseIndex(index)}
                    aria-label={`View ${phase.period}`}
                  />
                ))}
              </div>

              {/* Year labels */}
              <div className="flex justify-between mt-2 text-sm">
                {workPhases.map((phase, index) => (
                  <div
                    key={index}
                    className={`text-xs ${index === activePhaseIndex ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                    style={{
                      position: 'absolute',
                      left: `calc(${(index / (workPhases.length - 1)) * 100}% - 20px)`,
                      width: '40px',
                      textAlign: 'center'
                    }}
                  >
                    {phase.period.split('—')[0].trim()}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Next phase"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Work cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {workPhases.map((phase, index) => (
            <div
              key={index}
              className={`p-4 bg-secondary rounded-lg shadow transition-opacity duration-300 ${
                index === activePhaseIndex ? 'opacity-100 border-2 border-primary' : 'opacity-70 hover:opacity-90'
              }`}
              onClick={() => setActivePhaseIndex(index)}
            >
              {/* Job title and company */}
              <div className="mb-3">
                <h3 className="text-base font-bold">{phase.title}</h3>
                <p className="text-sm text-primary">{phase.company}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <span>{phase.period}</span>
                  <span className="mx-2">•</span>
                  <span>{phase.location}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-2">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {phase.skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {phase.skills.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{phase.skills.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Tools */}
              <div className="mb-2">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Tools</h4>
                <div className="flex flex-wrap gap-1">
                  {phase.tools.slice(0, 3).map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs bg-muted px-2 py-0.5 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                  {phase.tools.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{phase.tools.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Client Types */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Clients</h4>
                <div className="flex flex-wrap gap-1">
                  {phase.clientTypes.slice(0, 2).map((clientType, i) => (
                    <span
                      key={i}
                      className="text-xs bg-background px-2 py-0.5 rounded-full"
                    >
                      {clientType}
                    </span>
                  ))}
                  {phase.clientTypes.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{phase.clientTypes.length - 2} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}