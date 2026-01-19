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
    color: "bg-blue-300/70",
    skills: ["UX/UI Design", "Design Systems", "Figma", "Prototyping", "User Research"]
  },
  {
    name: "Code & Build",
    percentage: 30,
    color: "bg-amber-300/70",
    skills: ["React", "Next.js", "TypeScript", "Headless CMS", "AI-assisted Workflows"]
  },
  {
    name: "Leadership",
    percentage: 20,
    color: "bg-lime-300/70",
    skills: ["Team Coordination", "Resource Planning", "GitOps", "CI/CD"]
  },
  {
    name: "Stakeholder Alignment",
    percentage: 20,
    color: "bg-lilac-200/70",
    skills: ["Discovery Workshops", "Cross-functional Collaboration", "Client Strategy"]
  }
]

export function Section08Skills() {
  return (
    <section id="skills" className="py-20 lg:py-28 bg-transparent border-t border-gray-200/60">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-xl md:text-2xl font-semibold text-gray-950 tracking-tight"
            style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
          >
            Profile
          </h2>
          <p
            className="text-sm md:text-base text-gray-500 mt-2 italic"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            A balanced hybrid: 30% design, 30% code, 20% leadership, 20% stakeholder alignment
          </p>
        </motion.div>

        {/* Skills Bars */}
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              className={`space-y-4 rounded-xl border border-gray-200/80 bg-white p-6 md:w-[48%] lg:w-[23%] ${index % 2 === 1 ? "lg:mt-6" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Bar visualization */}
              <div className="relative h-24 rounded-lg border border-gray-200/70 bg-gray-100/70 overflow-hidden">
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 ${category.color}`}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${category.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-2">
                  <span className="text-xs font-semibold text-gray-900">
                    {category.percentage}%
                  </span>
                </div>
              </div>

              {/* Category name */}
              <h3 className="text-sm font-semibold text-gray-950">
                {category.name}
              </h3>

              {/* Skills list */}
              <ul className="space-y-1.5">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-[11px] text-gray-600">
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
