"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import type { ClientProjectsGroup, ProjectEntry } from "@/lib/clients-projects"

const ACCENTS = [
  {
    dot: "bg-amber-400",
    ring: "focus-visible:ring-amber-400",
    highlight: "border-amber-200/70",
  },
  {
    dot: "bg-blue-400",
    ring: "focus-visible:ring-blue-400",
    highlight: "border-blue-200/70",
  },
  {
    dot: "bg-lime-400",
    ring: "focus-visible:ring-lime-400",
    highlight: "border-lime-200/70",
  },
  {
    dot: "bg-lilac-300",
    ring: "focus-visible:ring-lilac-300",
    highlight: "border-lilac-200/70",
  },
]

const CLIENT_STORIES: Record<string, { intro: string; contribution: string }> = {
  TeamBank: {
    intro:
      "TeamBank is the maker of easyCredit, focused on liquidity and financial flexibility for consumers and partners.",
    contribution:
      "Connected brand, content, and tech across four platforms, translating vision into UI, structuring partner content, and aligning stakeholders with the Head of Product.",
  },
  "DPF Group": {
    intro:
      "DPF Group is a senior living investor and operator shaping life in old age across multiple brands and services.",
    contribution:
      "Central point of contact across six brands with distinct systems, keeping stacks maintainable while coordinating CRM migration and cross-team execution.",
  },
  "Open Wonder": {
    intro:
      "Open Wonder helps teams create on-brand images and marketing assets at scale with a built-in brand model.",
    contribution:
      "Defined AI guardrails and workflows, shaping governance for brand-safe output while shipping product design and implementation with AI-assisted development.",
  },
  EVG: {
    intro:
      "EVG is Germany's Railway and Transport Union, advocating for worker rights, fair agreements, and co-determination.",
    contribution:
      "Built subsidy applications as clear digital flows, plus a multilingual, audited AI assistant that reduces routine workload and escalates edge cases.",
  },
  "Gruen Berlin": {
    intro:
      "Gruen Berlin is a state-owned company that develops, builds, and operates sustainable green and blue infrastructure for Berlin.",
    contribution:
      "Translated civic infrastructure into modular TYPO3 systems, launched infraSignal with its own brand and Mapbox reporting, and coordinated backend partnerships.",
  },
}

function formatYears(project: ProjectEntry): string {
  if (!project.startYear) return ""
  if (project.endYear) return `${project.startYear} - ${project.endYear}`
  return `${project.startYear} - now`
}

function getClientNarrative(group: ClientProjectsGroup): { intro: string; contribution: string } {
  const predefined = CLIENT_STORIES[group.client]
  if (predefined) return predefined
  const intro = group.projects.find((project) => project.summary)?.summary ?? ""
  const roles = Array.from(
    new Set(
      group.projects
        .flatMap((project) => project.role.split(","))
        .map((role) => role.trim())
        .filter(Boolean)
    )
  )
  const contribution = roles.length > 0 ? `Roles: ${roles.join(", ")}.` : ""
  return { intro, contribution }
}

function ClientProjectCard({
  group,
  index,
}: {
  group: ClientProjectsGroup
  index: number
}) {
  const { client, projects } = group
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const accent = ACCENTS[index % ACCENTS.length]
  const narrative = getClientNarrative(group)

  if (projects.length === 0) {
    return null
  }

  useEffect(() => {
    if (reducedMotion || isPaused || projects.length < 2) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length)
    }, 3600)
    return () => clearInterval(interval)
  }, [reducedMotion, isPaused, projects.length])

  const activeProject = projects[activeIndex] ?? projects[0]

  return (
    <motion.article
      className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/80 p-6 lg:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget as Node | null
        if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
          setIsPaused(false)
        }
      }}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3
              className="text-lg font-semibold text-gray-950"
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              {client}
            </h3>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
              {projects.length} projects
            </span>
          </div>
          <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-4 space-y-3">
            {narrative.intro && (
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Client</p>
                <p className="text-xs text-gray-700 leading-relaxed">{narrative.intro}</p>
              </div>
            )}
            {narrative.contribution && (
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">My role</p>
                <p className="text-xs text-gray-600 leading-relaxed">{narrative.contribution}</p>
              </div>
            )}
          </div>
          <p
            className="text-[11px] text-gray-500"
            style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
          >
            Hover or focus a project to update the preview.
          </p>
          <ul className="space-y-2">
            {projects.map((project, projectIndex) => {
              const isActive = projectIndex === activeIndex
              const years = formatYears(project)
              return (
                <li
                  key={`${project.project}-${projectIndex}`}
                  className={`group rounded-2xl border px-4 py-3 transition ${
                    isActive
                      ? `bg-white/90 ${accent.highlight} shadow-sm`
                      : "border-transparent hover:border-gray-200/70 hover:bg-white/70"
                  }`}
                  onMouseEnter={() => setActiveIndex(projectIndex)}
                  onClick={() => setActiveIndex(projectIndex)}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 h-2 w-2 rounded-full ${
                        isActive ? accent.dot : "bg-gray-300"
                      }`}
                      aria-hidden
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-gray-950">
                          {project.project}
                        </span>
                        {years && (
                          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                            {years}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                        {project.type && <span>{project.type}</span>}
                        {project.type && project.displayUrl && <span className="text-gray-300">·</span>}
                        {project.displayUrl && project.isExternal && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-semibold text-gray-700 underline underline-offset-4 decoration-amber-400/80 hover:decoration-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${accent.ring}`}
                            onFocus={() => setActiveIndex(projectIndex)}
                          >
                            {project.displayUrl}
                          </a>
                        )}
                        {project.displayUrl && !project.isExternal && (
                          <span className="uppercase tracking-[0.2em] text-gray-400">
                            {project.displayUrl}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100/80">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProject.project}-${activeProject.image}`}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeProject.image})` }}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
                aria-hidden
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/30 to-white/0" />
            <div className="absolute inset-0 ring-1 ring-black/5" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/70 bg-white/85 px-4 py-3 backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                Now showing
              </p>
              <h4 className="text-sm font-semibold text-gray-950">
                {activeProject.project}
              </h4>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-gray-600">
                {activeProject.type && <span>{activeProject.type}</span>}
                {activeProject.type && activeProject.displayUrl && <span className="text-gray-300">·</span>}
                {activeProject.displayUrl && (
                  <span className="font-semibold text-gray-700">
                    {activeProject.displayUrl}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function ClientProjectsGallery({ clients }: { clients: ClientProjectsGroup[] }) {
  if (!clients.length) return null

  return (
    <section id="client-projects" className="py-20 lg:py-28 bg-transparent border-t border-gray-200/60">
      <div className="container mx-auto px-6 lg:px-12">
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
            Client web projects
          </h2>
          <p
            className="text-sm md:text-base text-gray-500 mt-2 italic"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Every site, grouped by client, with live links and rolling project imagery.
          </p>
        </motion.div>

        <div className="space-y-10">
          {clients.map((group, index) => (
            <ClientProjectCard key={group.client} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
