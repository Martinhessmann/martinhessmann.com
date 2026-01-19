"use client"

import { motion } from "framer-motion"
import type { ProfileMix, Work } from "@/types/resume"

function formatWorkDate(date: string | undefined): string {
  if (!date) return ""
  const [y, m] = date.split("-")
  if (!y || !m) return date
  const d = new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1)
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

function formatDateRange(start: string | undefined, end: string | undefined): string {
  const startStr = formatWorkDate(start)
  const endStr = end ? formatWorkDate(end) : "Present"
  if (!startStr) return endStr
  return `${startStr} – ${endStr}`
}

interface Section09ResumeProps {
  work: Work[]
}

const defaultProfileMix: Required<ProfileMix> = {
  design: 30,
  code: 30,
  lead: 20,
  align: 20,
}

const profileSegmentConfig = [
  { key: "design", label: "Design", summaryLabel: "Design", className: "bg-blue-400" },
  { key: "code", label: "Code", summaryLabel: "Code", className: "bg-amber-400" },
  { key: "lead", label: "Lead", summaryLabel: "Leadership", className: "bg-lime-400" },
  { key: "align", label: "Align", summaryLabel: "Alignment", className: "bg-lilac-400" },
] as const

function getProfileMix(profileMix?: ProfileMix): Required<ProfileMix> {
  return {
    design: profileMix?.design ?? defaultProfileMix.design,
    code: profileMix?.code ?? defaultProfileMix.code,
    lead: profileMix?.lead ?? defaultProfileMix.lead,
    align: profileMix?.align ?? defaultProfileMix.align,
  }
}

function buildProfileSegments(profileMix?: ProfileMix) {
  if (profileMix?.segments?.length) {
    return profileMix.segments.map((segment, index) => {
      const config = profileSegmentConfig[index]
      return {
        label: segment.label,
        summaryLabel: segment.label,
        value: segment.value,
        className: config?.className ?? "bg-gray-300/80",
      }
    })
  }
  const mix = getProfileMix(profileMix)
  return profileSegmentConfig.map((segment) => ({
    label: segment.label,
    summaryLabel: segment.summaryLabel,
    value: mix[segment.key],
    className: segment.className,
  }))
}

function MicroProfileGraph({ profileMix }: { profileMix?: ProfileMix }) {
  const segments = buildProfileSegments(profileMix)
  const summary = `Profile mix: ${segments
    .map((segment) => `${segment.summaryLabel} ${segment.value}%`)
    .join(", ")}`
  return (
    <div className="flex flex-col gap-2 text-[11px]" role="img" aria-label={summary}>
      {segments.map((segment) => (
        <div key={segment.label} className="flex items-center gap-2">
          <span className="w-24 uppercase tracking-[0.18em] text-gray-600 whitespace-nowrap">
            {segment.label}
          </span>
          <div className="h-1.5 w-24 rounded-full bg-gray-200/70 overflow-hidden">
            <span
              className={`block h-full ${segment.className}`}
              style={{ width: `${segment.value}%` }}
            />
          </div>
          <span className="w-8 text-right text-gray-600 tabular-nums">{segment.value}%</span>
        </div>
      ))}
    </div>
  )
}

export function Section09Resume({ work }: Section09ResumeProps) {
  if (!work?.length) return null

  return (
    <section id="work" className="py-20 lg:py-28 bg-transparent border-t border-gray-200/60">
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
            Work Experience
          </h2>
          <p
            className="text-sm md:text-base text-gray-500 mt-2 italic"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Prior positions — from freelance design to leading product trios
          </p>
        </motion.div>

        {/* Work entries matrix */}
        <div className="space-y-8 lg:space-y-10">
          {work.map((job, index) => {
            const isCurrent = !job.endDate
            return (
              <motion.article
                key={`${job.name}-${job.position}-${job.startDate}-${index}`}
                className="relative rounded-2xl border border-gray-200/70 bg-white p-6 md:p-7"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-gray-950">
                        {job.position}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-600 underline underline-offset-2"
                          >
                            {job.name}
                          </a>
                        ) : (
                          job.name
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:justify-end">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 whitespace-nowrap">
                        {formatDateRange(job.startDate, job.endDate)}
                      </p>
                      <span
                        className={`h-2 w-2 rounded-full ${isCurrent ? "bg-lime-400" : "bg-amber-400"}`}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Summary */}
                      {job.summary && (
                        <p className="text-[12px] text-gray-700 leading-[1.6]">{job.summary}</p>
                      )}

                      {/* Highlights */}
                      {job.highlights && job.highlights.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1.5 text-[12px] text-gray-600 leading-[1.6] marker:text-gray-400">
                          {job.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="sm:self-end">
                      <MicroProfileGraph profileMix={job.profileMix} />
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
