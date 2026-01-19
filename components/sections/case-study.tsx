"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface CaseStudyProps {
  id: string
  title: string
  /** Optional; rendered as the only serif-italic (emotional/why). */
  subline?: string
  /** Merged narrative: one or two paragraphs. Single type role (body). */
  body: string
  /** Abstract SVG/illustration rendered as background element; text flows over it. */
  illustration?: ReactNode
  url?: string
  technologies?: string[]
  /** Position illustration: 'right' (default) or 'left' */
  illustrationPosition?: "left" | "right"
  reversed?: boolean
}

function MetaLine({ url, technologies }: { url?: string; technologies?: string[] }) {
  const hasTech = technologies && technologies.length > 0
  const displayUrl = url?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
  const parts: string[] = []
  if (hasTech) parts.push(technologies!.join(", "))
  if (displayUrl) parts.push(displayUrl)
  const text = parts.join(" · ")
  if (!text) return null

  if (displayUrl && !hasTech) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
      >
        <span>{displayUrl}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
          <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    )
  }
  if (hasTech && displayUrl) {
    return (
      <p className="text-sm text-gray-500">
        {technologies!.join(", ")} ·{" "}
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
          {displayUrl}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </p>
    )
  }
  return <p className="text-sm text-gray-500">{technologies!.join(", ")}</p>
}

export function CaseStudy({
  id,
  title,
  subline,
  body,
  illustration,
  url,
  technologies,
  illustrationPosition = "right",
  reversed = false
}: CaseStudyProps) {
  const bg = reversed ? "bg-gray-50" : "bg-white"
  const positionClass = illustrationPosition === "left"
    ? "left-0 lg:-left-16"
    : "right-0 lg:-right-16"

  return (
    <section id={id} className={`py-16 lg:py-24 ${bg} overflow-hidden`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative">
          {/* Background illustration — positioned behind text, fades on edges */}
          {illustration && (
            <motion.div
              className={`absolute top-1/2 -translate-y-1/2 ${positionClass} w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] pointer-events-none select-none text-gray-300`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              aria-hidden="true"
            >
              {illustration}
            </motion.div>
          )}

          {/* Content — flows over the illustration */}
          <motion.div
            className="relative z-10 max-w-2xl space-y-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight"
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              {title}
            </h2>
            {subline && (
              <p className="text-lg text-gray-500 italic" style={{ fontFamily: "'EB Garamond', serif" }}>
                {subline}
              </p>
            )}
            <div
              className="text-lg lg:text-xl text-gray-700 leading-relaxed"
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              {body.split("\n\n").map((p, i) => (
                <p key={i} className={i > 0 ? "mt-4" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <MetaLine url={url} technologies={technologies} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
