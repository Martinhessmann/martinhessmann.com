"use client"

import { motion } from "framer-motion"

interface TimelineItem {
  year: string
  title: string
  description: string
  isHero?: boolean
  color?: "blue" | "amber" | "lime" | "lilac"
}

const timelineItems: TimelineItem[] = [
  { year: "2025", title: "AI Chatbot Integration", description: "15 languages, PwC audited", isHero: true, color: "blue" },
  { year: "2024", title: "Open Wonder", description: "AI-native product work", isHero: true, color: "lilac" },
  { year: "2023", title: "TeamBank Markenportal", description: "Design systems at scale", isHero: true, color: "amber" },
  { year: "2022", title: "infraSignal", description: "Civic tech with real impact", isHero: true, color: "lime" },
  { year: "2021", title: "WoMoFonds Launch", description: "First major subsidy platform", isHero: true, color: "amber" },
  { year: "2019", title: "Foundation Year", description: "Grün Berlin, DPF/Tertianum, TeamBank", isHero: true, color: "blue" },
]

const technicalMilestones = [
  "GitLab CI/CD",
  "Sentry Automations",
  "AI-assisted Workflows",
  "Cursor Hackathon Recognition"
]

const colorMap = {
  blue: "bg-blue-600",
  amber: "bg-amber-500",
  lime: "bg-lime-500",
  lilac: "bg-lilac-400"
}

export function Section07Timeline() {
  return (
    <section id="timeline" className="py-16 lg:py-24 bg-gray-950 text-white">
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
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
          >
            Journey
          </h2>
          <p className="text-gray-400 mt-2">Key milestones from 2019 to today</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-gray-700" />

          {/* Timeline items */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative pt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Dot */}
                <div
                  className={`absolute top-6 left-0 w-4 h-4 rounded-full ${item.color ? colorMap[item.color] : 'bg-gray-600'}`}
                />

                {/* Content */}
                <div className="space-y-1">
                  <span className="text-2xl font-bold text-white">{item.year}</span>
                  <h3 className="text-sm font-medium text-gray-300">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Milestones */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Technical Milestones</p>
          <div className="flex flex-wrap gap-3">
            {technicalMilestones.map((milestone, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm text-gray-400 border border-gray-700 rounded"
              >
                {milestone}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
