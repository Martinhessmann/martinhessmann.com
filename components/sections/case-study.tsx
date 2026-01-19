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

  if (hasTech && !displayUrl) {
    return (
      <div className="flex flex-wrap gap-2 text-xs">
        {technologies!.map((tech) => (
          <span key={tech} className="rounded-md border border-gray-200/80 bg-gray-50/90 px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-gray-600 uppercase">
            {tech}
          </span>
        ))}
      </div>
    )
  }

  if (displayUrl && !hasTech) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-900 underline underline-offset-4 decoration-amber-400/80 hover:decoration-amber-600 transition-colors"
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
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <div className="flex flex-wrap gap-2">
          {technologies!.map((tech) => (
            <span key={tech} className="rounded-md border border-gray-200/80 bg-gray-50/90 px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-gray-600 uppercase">
              {tech}
            </span>
          ))}
        </div>
        <span className="text-gray-400">·</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 underline underline-offset-4 decoration-amber-400/80 hover:decoration-amber-600 transition-colors">
          {displayUrl}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    )
  }
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {technologies!.map((tech) => (
        <span key={tech} className="rounded-md border border-gray-200/80 bg-gray-50/90 px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-gray-600 uppercase">
          {tech}
        </span>
      ))}
    </div>
  )
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
  const bg = "bg-transparent"
  const positionClass = illustrationPosition === "left"
    ? "left-0 lg:-left-24"
    : "right-0 lg:-right-24"
  const cardAlignClass = illustrationPosition === "left" ? "lg:ml-auto" : "lg:mr-auto"

  return (
    <section id={id} className={`py-24 lg:py-32 ${bg} overflow-hidden relative border-t border-gray-200/60`}>
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(1100px_600px_at_15%_30%,rgba(116,173,213,0.2),transparent),radial-gradient(1100px_600px_at_85%_60%,rgba(244,173,121,0.22),transparent),radial-gradient(680px_520px_at_70%_10%,rgba(245,210,150,0.2),transparent)]"
        animate={{ x: ["0%", "2%", "0%"], y: ["0%", "-2%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="relative">
          {/* Background illustration — positioned behind text, fades on edges */}
          {illustration && (
            <motion.div
              className={`absolute top-1/2 -translate-y-1/2 ${positionClass} z-10 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[580px] lg:h-[580px] pointer-events-none select-none text-gray-800/55 mix-blend-multiply`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              animate={{ rotate: [0, 2, 0] }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                rotate: { duration: 18, repeat: Infinity, ease: "easeInOut" }
              }}
              aria-hidden="true"
            >
              {illustration}
            </motion.div>
          )}

          {/* Content — flows over the illustration */}
          <motion.div
            className={`relative z-20 max-w-[620px] lg:w-[54%] ${cardAlignClass} space-y-3 rounded-2xl border border-gray-200/80 bg-white/90 p-10 md:p-12`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-lg md:text-xl font-semibold text-gray-950 tracking-tight"
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              {title}
            </h2>
            {subline && (
              <p className="text-[11px] md:text-xs text-gray-500 italic" style={{ fontFamily: "'EB Garamond', serif" }}>
                {subline}
              </p>
            )}
            <div
              className="text-[12px] md:text-[13px] text-gray-700 leading-[1.55]"
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
