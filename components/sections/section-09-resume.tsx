"use client"

import { motion } from "framer-motion"
import type { Work } from "@/types/resume"

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
          {work.map((job, index) => (
            <motion.article
              key={`${job.name}-${job.position}-${job.startDate}-${index}`}
              className="relative rounded-2xl border border-gray-200/70 bg-white p-6 md:p-7"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Dot */}
              <div className="absolute right-6 top-6 w-2 h-2 rounded-full bg-amber-300/70" />

              <div className="space-y-2">
                {/* Role + company + dates */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between gap-1">
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
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gray-500 whitespace-nowrap">
                    {formatDateRange(job.startDate, job.endDate)}
                  </p>
                </div>

                {/* Summary */}
                {job.summary && (
                  <p className="text-[12px] text-gray-700 leading-[1.55]">{job.summary}</p>
                )}

                {/* Highlights */}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="space-y-1.5">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-[11px] md:text-xs">
                        <span className="text-gray-400 mt-1 shrink-0">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
