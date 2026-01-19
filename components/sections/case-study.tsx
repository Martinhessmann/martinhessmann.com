"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface CaseStudyProps {
  id: string
  title: string
  subline: string
  narrative: string
  proofPoints: string[]
  quote: string
  illustration?: ReactNode
  url?: string
  technologies?: string[]
  reversed?: boolean
}

export function CaseStudy({
  id,
  title,
  subline,
  narrative,
  proofPoints,
  quote,
  illustration,
  url,
  technologies,
  reversed = false
}: CaseStudyProps) {
  return (
    <section
      id={id}
      className={`py-16 lg:py-24 ${reversed ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content Side */}
          <motion.div
            className={`space-y-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <div className="space-y-2">
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-950 tracking-tight"
                style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
              >
                {title}
              </h2>
              <p
                className="text-lg text-gray-500 italic"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {subline}
              </p>
            </div>

            {/* Core Narrative */}
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
              {narrative}
            </p>

            {/* Proof Points */}
            <ul className="space-y-2">
              {proofPoints.map((point, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-600"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className="text-amber-500 mt-1">—</span>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>

            {/* Quote */}
            <blockquote className="border-l-2 border-blue-600 pl-4 py-2">
              <p
                className="text-base italic text-gray-600"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                "{quote}"
              </p>
            </blockquote>

            {/* Technologies */}
            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* URL */}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>{url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5">
                  <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}
          </motion.div>

          {/* Illustration Side */}
          <motion.div
            className={`${reversed ? 'lg:order-1' : 'lg:order-2'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {illustration ? (
              <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
                {illustration}
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
