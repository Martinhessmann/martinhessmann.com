"use client"

import { motion } from "framer-motion"

interface SkillCategory {
  name: string
  percentage: number
  color: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Design",
    percentage: 30,
    color: "bg-blue-600",
    skills: ["UX/UI Design", "Design Systems", "Figma", "Prototyping", "User Research"]
  },
  {
    name: "Code & Build",
    percentage: 30,
    color: "bg-amber-500",
    skills: ["React", "Next.js", "TypeScript", "Headless CMS", "AI-assisted Workflows"]
  },
  {
    name: "Leadership",
    percentage: 20,
    color: "bg-lime-500",
    skills: ["Team Coordination", "Resource Planning", "GitOps", "CI/CD"]
  },
  {
    name: "Stakeholder Alignment",
    percentage: 20,
    color: "bg-lilac-400",
    skills: ["Discovery Workshops", "Cross-functional Collaboration", "Client Strategy"]
  }
]

export function Section08Skills() {
  return (
    <section id="skills" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight"
            style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
          >
            Profile
          </h2>
          <p
            className="text-lg text-gray-500 mt-2 italic"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            A balanced hybrid: 30% design, 30% code, 20% leadership, 20% stakeholder alignment
          </p>
        </motion.div>

        {/* Skills Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Bar visualization */}
              <div className="relative h-32 bg-gray-100 rounded overflow-hidden">
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 ${category.color}`}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${category.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-2">
                  <span className="text-2xl font-bold text-white drop-shadow-sm">
                    {category.percentage}%
                  </span>
                </div>
              </div>

              {/* Category name */}
              <h3 className="text-lg font-semibold text-gray-950">
                {category.name}
              </h3>

              {/* Skills list */}
              <ul className="space-y-1">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-sm text-gray-600">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
