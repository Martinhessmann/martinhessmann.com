'use client'

import { useState } from 'react'
import { SectionHeader } from './section-header'

interface Skill {
  name: string
  level: number
  category: 'design' | 'development' | 'management'
  icon: string
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const skills: Skill[] = [
    // Design skills
    { name: 'UX Design', level: 90, category: 'design', icon: '🎨' },
    { name: 'UI Design', level: 85, category: 'design', icon: '🖌️' },
    { name: 'Design Systems', level: 80, category: 'design', icon: '🧩' },
    { name: 'Figma', level: 95, category: 'design', icon: '🔍' },
    { name: 'Prototyping', level: 85, category: 'design', icon: '📱' },

    // Development skills
    { name: 'HTML/CSS', level: 80, category: 'development', icon: '🌐' },
    { name: 'JavaScript', level: 75, category: 'development', icon: '📜' },
    { name: 'React', level: 70, category: 'development', icon: '⚛️' },
    { name: 'Next.js', level: 65, category: 'development', icon: '⏭️' },
    { name: 'Git', level: 75, category: 'development', icon: '📊' },

    // Management skills
    { name: 'Product Strategy', level: 90, category: 'management', icon: '🧠' },
    { name: 'Team Leadership', level: 85, category: 'management', icon: '👥' },
    { name: 'Agile/Scrum', level: 80, category: 'management', icon: '🔄' },
    { name: 'Client Relations', level: 95, category: 'management', icon: '🤝' },
    { name: 'Project Planning', level: 85, category: 'management', icon: '📋' },
  ]

  const filteredSkills = activeCategory
    ? skills.filter(skill => skill.category === activeCategory)
    : skills

  const skillCategories = [
    {
      name: 'Product Management',
      skills: [
        'Product Strategy', 'Roadmapping', 'User Research', 'Agile/Scrum',
        'Stakeholder Management', 'Product Analytics', 'A/B Testing',
        'Market Analysis', 'Competitive Analysis', 'Product Discovery'
      ]
    },
    {
      name: 'UX Design',
      skills: [
        'User-Centered Design', 'Wireframing', 'Prototyping', 'Usability Testing',
        'Information Architecture', 'Interaction Design', 'Design Systems',
        'User Flows', 'Heuristic Evaluation', 'Accessibility'
      ]
    },
    {
      name: 'Tools & Software',
      skills: [
        'Figma', 'Sketch', 'Adobe XD', 'InVision', 'Miro', 'Jira',
        'Confluence', 'Google Analytics', 'Amplitude', 'Mixpanel',
        'Notion', 'Slack', 'Microsoft Office'
      ]
    },
    {
      name: 'Technical',
      skills: [
        'HTML/CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS',
        'Git', 'API Design', 'SQL', 'Data Analysis', 'SEO Principles'
      ]
    }
  ]

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="Areas where I excel and technologies I work with"
          emoji="💪"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="bg-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-medium mb-4 text-primary">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}