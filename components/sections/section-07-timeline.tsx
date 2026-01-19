"use client"

import { motion } from "framer-motion"

// Time range for the chart: Jan 2019 – Dec 2025
const RANGE_START = new Date("2019-01-01")
const RANGE_END = new Date("2025-12-31")

function toMonths(d: Date): number {
  return d.getFullYear() * 12 + d.getMonth()
}

const RANGE_MONTHS = toMonths(RANGE_END) - toMonths(RANGE_START) + 1

function parseStart(s: string): Date {
  const [y, m] = s.split("-")
  const year = parseInt(y ?? "2019", 10)
  const month = (m ? parseInt(m, 10) : 1) - 1
  return new Date(year, month, 1)
}

function toLeftPercent(start: Date): number {
  const months = toMonths(start) - toMonths(RANGE_START)
  return Math.max(0, (months / RANGE_MONTHS) * 100)
}

function toWidthPercent(start: Date, end: Date | null): number {
  const endDate = end ?? RANGE_END
  const startM = toMonths(start)
  const endM = toMonths(endDate)
  const months = Math.max(1, endM - startM + 1)
  return (months / RANGE_MONTHS) * 100
}

// Client phases: each client has one or more project phases (stacked bars) with milestones.
interface ProjectPhase {
  name: string
  start: string // YYYY or YYYY-MM
  end?: string | null // null = ongoing
  milestones?: { date: string; label: string }[]
}

interface ClientPhase {
  client: string
  color: "blue" | "amber" | "lime" | "lilac" | "green"
  projects: ProjectPhase[]
}

const clientPhases: ClientPhase[] = [
  {
    client: "Grün Berlin",
    color: "lime",
    projects: [
      { name: "Grün Berlin", start: "2020-11", milestones: [{ date: "2021-06", label: "Rebrand launch" }] },
      { name: "infraSignal", start: "2022-10", milestones: [{ date: "2023-09", label: "Mapbox autocomplete" }] },
    ],
  },
  {
    client: "TeamBank",
    color: "amber",
    projects: [
      { name: "teambank.de", start: "2019" },
      { name: "easyCredit Partner", start: "2020-03", milestones: [{ date: "2021-05", label: "Ratenkauf rebrand #1" }, { date: "2023-04", label: "Ratenkauf rebrand #2" }] },
      { name: "Markenportal", start: "2020", milestones: [{ date: "2025-01", label: "Redesign in progress" }] },
    ],
  },
  {
    client: "DPF Group",
    color: "blue",
    projects: [
      { name: "Tertianum", start: "2019-07" },
      { name: "RAS Services", start: "2021-07" },
      { name: "Brasserie Colette", start: "2021-03", milestones: [{ date: "2022-10", label: "Relaunch" }] },
    ],
  },
  {
    client: "EVG / WoMo",
    color: "lilac",
    projects: [
      { name: "WoMoFonds", start: "2021-09" },
      { name: "Dein WoMo", start: "2022-11" },
      { name: "AI Chatbot", start: "2025-01", milestones: [{ date: "2025-01", label: "15 languages, PwC audited" }] },
    ],
  },
  {
    client: "Open Wonder",
    color: "green",
    projects: [
      { name: "Open Wonder", start: "2025-01", milestones: [{ date: "2025-01", label: "AI-native product" }] },
    ],
  },
]

// Five unique legend colors for bars and legend dots (500 for even contrast).
const legendColorMap: Record<ClientPhase["color"], string> = {
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  lime: "bg-lime-500",
  lilac: "bg-lilac-500",
  green: "bg-green-500",
}

const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025]

// Milestone marker component with CSS-only hover tooltip
function MilestoneMarker({ label, pct }: { label: string; pct: number }) {
  return (
    <span
      className="absolute top-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: `${pct}%` }}
    >
      {/* Marker dot - larger, with ring on hover */}
      <span
        className="block w-4 h-4 -ml-2 rounded-full bg-white border-2 border-gray-600 shadow-md transition-all duration-150 group-hover:scale-125 group-hover:border-gray-900 group-hover:ring-2 group-hover:ring-gray-900/20"
      />
      {/* Tooltip - hidden by default, shown on hover via group-hover */}
      <span
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm whitespace-nowrap shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 pointer-events-none"
        style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
      >
        {label}
        {/* Arrow */}
        <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-900" />
      </span>
    </span>
  )
}

export function Section07Timeline() {
  return (
    <section id="timeline" className="py-16 lg:py-24 bg-white">
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
            className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight"
            style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
          >
            Journey
          </h2>
          <p
            className="text-lg text-gray-500 mt-2 italic"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Client web projects and key milestones — 2019 to today
          </p>
        </motion.div>

        {/* Timeline chart */}
        <div className="flex flex-col gap-6">
          {/* Year axis */}
          <div className="relative h-6">
            {years.map((y) => {
              const d = new Date(y, 0, 1)
              const left = toLeftPercent(d)
              return (
                <div
                  key={y}
                  className="absolute top-0 text-sm font-medium text-gray-400"
                  style={{ left: `${left}%`, transform: "translateX(-50%)" }}
                >
                  {y}
                </div>
              )
            })}
          </div>

          {/* Client rows: label + bars + milestones list */}
          {clientPhases.map((group, gIdx) => {
            const phaseStart = (p: ProjectPhase) => parseStart(p.start)
            const phaseEnd = (p: ProjectPhase) => (p.end ? parseStart(p.end) : RANGE_END)
            const inPhase = (p: ProjectPhase, m: { date: string }) => {
              const d = parseStart(m.date)
              return d >= phaseStart(p) && d <= phaseEnd(p)
            }
            // Collect all milestones for this client
            const allMilestones = group.projects.flatMap((p) =>
              (p.milestones ?? []).map((m) => ({ ...m, project: p.name }))
            )

            return (
              <motion.div
                key={group.client}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gIdx * 0.08 }}
              >
                {/* Client label row */}
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full shrink-0 ${legendColorMap[group.color]}`}
                    aria-hidden
                  />
                  <span
                    className="text-sm font-semibold text-gray-900"
                    style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
                  >
                    {group.client}
                  </span>
                </div>

                {/* Bar track */}
                <div className="relative h-6">
                  {group.projects.map((p) => {
                    const start = parseStart(p.start)
                    const end = p.end ? parseStart(p.end) : null
                    const left = toLeftPercent(start)
                    const width = toWidthPercent(start, end)
                    const barBg = legendColorMap[group.color]
                    return (
                      <div
                        key={p.name}
                        className={`absolute top-1/2 -translate-y-1/2 h-3 rounded-full ${barBg} opacity-80`}
                        style={{
                          left: `${left}%`,
                          width: `${Math.min(width, 100 - left)}%`,
                        }}
                      >
                        {/* Milestone markers on bar */}
                        {(p.milestones ?? [])
                          .filter((m) => inPhase(p, m))
                          .map((m) => {
                            const msLeft = toLeftPercent(parseStart(m.date))
                            const pct = width > 0 ? Math.max(0, Math.min(100, ((msLeft - left) / width) * 100)) : 0
                            return (
                              <MilestoneMarker
                                key={`${m.date}-${m.label}`}
                                label={m.label}
                                pct={pct}
                              />
                            )
                          })}
                      </div>
                    )
                  })}
                </div>

                {/* Milestones list (visible labels) */}
                {allMilestones.length > 0 && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 pl-5">
                    {allMilestones.map((m, i) => (
                      <span key={`${m.date}-${i}`} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <span>{m.label}</span>
                        <span className="text-gray-400 text-xs">
                          ({parseStart(m.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })})
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
