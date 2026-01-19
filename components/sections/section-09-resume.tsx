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
    <section id="work" className="py-16 lg:py-24 bg-gray-50">
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
            Work Experience
          </h2>
          <p
            className="text-lg text-gray-500 mt-2 italic"
            style={{ fontFamily: "'EB Garamond', serif" }}
          >
            Prior positions — from freelance design to leading product trios
          </p>
        </motion.div>

        {/* Work entries matrix */}
        <div className="space-y-10 lg:space-y-12">
          {work.map((job, index) => (
            <motion.article
              key={`${job.name}-${job.position}-${job.startDate}-${index}`}
              className="relative pl-6 md:pl-8 border-l-2 border-gray-200 hover:border-amber-500/60 transition-colors"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {/* Dot */}
              <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-amber-500" />

              <div className="space-y-3">
                {/* Role + company + dates */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-950">
                      {job.position}
                    </h3>
                    <p className="text-gray-600">
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
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {formatDateRange(job.startDate, job.endDate)}
                  </p>
                </div>

                {/* Summary */}
                {job.summary && (
                  <p className="text-gray-700 leading-relaxed">{job.summary}</p>
                )}

                {/* Highlights */}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="space-y-1.5">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm md:text-base">
                        <span className="text-amber-500 mt-1 shrink-0">•</span>
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
