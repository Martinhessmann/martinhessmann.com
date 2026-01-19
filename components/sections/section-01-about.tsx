"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

// Geometric wireframe icons for principles
const PrincipleIcon = ({ type, size = 64 }: { type: "empathy" | "research" | "responsibility" | "ensemble"; size?: number }) => {
  const iconSize = size
  // Keep the mark thin and precise.
  const strokeWidth = size >= 200 ? 1.4 : size > 100 ? 1.2 : size > 60 ? 1.1 : 1
  const strokeColor = "currentColor"

  switch (type) {
    case "empathy":
      // Dashed circle - listening, understanding
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
          <circle
            cx="32" cy="32" r="24"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray="4 4"
          />
        </svg>
      )
    case "research":
      // Circle with inner arc - investigation, depth
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="24" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path
            d="M 20 32 A 12 12 0 0 1 44 32"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        </svg>
      )
    case "responsibility":
      // Horizontal line with dots - connections, flow
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
          <line x1="8" y1="32" x2="56" y2="32" stroke={strokeColor} strokeWidth={strokeWidth} strokeDasharray="2 6" />
          <circle cx="16" cy="32" r="3" fill={strokeColor} />
          <circle cx="32" cy="32" r="3" fill={strokeColor} />
          <circle cx="48" cy="32" r="3" fill={strokeColor} />
        </svg>
      )
    case "ensemble":
      // Overlapping circles - collaboration, collective
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 64 64" fill="none">
          <circle cx="24" cy="32" r="16" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="40" cy="32" r="16" stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      )
  }
}

// Blur colors per principle - bold and saturated
const BLUR_COLORS: Record<"blue" | "amber" | "lime" | "lilac", { blur1: string; blur2: string }> = {
  blue:  { blur1: "rgb(80, 100, 255)",   blur2: "rgb(200, 170, 240)" },
  amber: { blur1: "rgb(255, 210, 60)",   blur2: "rgb(210, 180, 240)" },
  lime:  { blur1: "rgb(180, 255, 80)",   blur2: "rgb(80, 100, 255)" },
  lilac: { blur1: "rgb(210, 170, 250)", blur2: "rgb(80, 100, 255)" },
}

// Icon color inside the orb - darker for contrast
const ICON_STROKE_COLOR: Record<"blue" | "amber" | "lime" | "lilac", string> = {
  blue:  "rgb(12, 12, 12)",
  amber: "rgb(12, 12, 12)",
  lime:  "rgb(12, 12, 12)",
  lilac: "rgb(12, 12, 12)",
}

// Orb: large icon with bold blur background, no outline
const PrincipleOrb = ({
  activeColor,
  iconType,
  reducedMotion,
}: {
  activeColor: "blue" | "amber" | "lime" | "lilac"
  iconType: "empathy" | "research" | "responsibility" | "ensemble"
  reducedMotion: boolean | null
}) => {
  const { blur1, blur2 } = BLUR_COLORS[activeColor]
  const iconColor = ICON_STROKE_COLOR[activeColor]
  const duration = reducedMotion ? 0.15 : 0.4

  return (
    <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] mx-auto flex items-center justify-center">
      {/* Large gradient blur layers - more opaque */}
      <motion.div
        className="absolute w-[520px] h-[520px] sm:w-[600px] sm:h-[600px] lg:w-[680px] lg:h-[680px] rounded-full"
        style={{ filter: "blur(110px)", opacity: 0.82 }}
        animate={{
          background: blur1,
          x: reducedMotion ? "-10%" : ["-10%", "6%", "-10%"],
          y: reducedMotion ? "-6%" : ["-6%", "9%", "-6%"],
        }}
        transition={{
          background: { duration },
          x: reducedMotion ? { duration: 0 } : { duration: 18, repeat: Infinity, ease: "easeInOut" },
          y: reducedMotion ? { duration: 0 } : { duration: 18, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute w-[480px] h-[480px] sm:w-[560px] sm:h-[560px] lg:w-[620px] lg:h-[620px] rounded-full"
        style={{ filter: "blur(120px)", opacity: 0.68 }}
        animate={{
          background: blur2,
          x: reducedMotion ? "14%" : ["14%", "0%", "14%"],
          y: reducedMotion ? "10%" : ["10%", "-6%", "10%"],
        }}
        transition={{
          background: { duration },
          x: reducedMotion ? { duration: 0 } : { duration: 16, repeat: Infinity, ease: "easeInOut" },
          y: reducedMotion ? { duration: 0 } : { duration: 16, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Large icon centered */}
      <AnimatePresence mode="wait">
        <motion.div
          key={iconType}
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          style={{ color: iconColor }}
        >
          <div className="relative">
            <svg width="220" height="220" viewBox="0 0 220 220" fill="none" className="absolute -left-4 -top-4">
              <circle cx="110" cy="110" r="104" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" opacity="0.6" />
              <circle cx="110" cy="110" r="78" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
              <path d="M18 110a92 92 0 0 1 184 0" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
            </svg>
            <PrincipleIcon type={iconType} size={180} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

type PrincipleColor = "blue" | "amber" | "lime" | "lilac"

interface Principle {
  id: string
  icon: "empathy" | "research" | "responsibility" | "ensemble"
  color: PrincipleColor
  title: string
  description: string
}

const principles: Principle[] = [
  { id: "complexity", icon: "empathy", color: "blue",  title: "Go where the complexity is", description: "I don't shy away from cross-disciplinary responsibility. I open black boxes, learn what's inside, and translate it so teams can make decisions." },
  { id: "systems",    icon: "research", color: "amber", title: "Make design systems fun again", description: "When a design system feels like a burden, I dig in quickly and achieve results. Systems should enable, not constrain." },
  { id: "enable",     icon: "responsibility", color: "lime",  title: "Enable, don't just execute", description: "I don't just build — I make teams capable of building themselves. Enablement over handoff." },
  { id: "iterate",    icon: "ensemble", color: "lilac", title: "Think in systems, ship in iterations", description: "I prototype, test, iterate. Big-bang launches are risky; small bets compound into real impact." },
]

const DOT_BG_ACTIVE: Record<PrincipleColor, string> = {
  blue:  "bg-blue-500",
  amber: "bg-amber-500",
  lime:  "bg-lime-500",
  lilac: "bg-lilac-400",
}

const DOT_RING_CLASS: Record<PrincipleColor, string> = {
  blue:  "focus-visible:ring-blue-500",
  amber: "focus-visible:ring-amber-500",
  lime:  "focus-visible:ring-lime-500",
  lilac: "focus-visible:ring-lilac-400",
}

export function Section01About() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const reducedMotion = useReducedMotion()

  const scrollToWork = () => document.getElementById("teambank")?.scrollIntoView({ behavior: "smooth" })

  // Auto-rotate every 4.5s when user hasn't interacted and reducedMotion is off
  useEffect(() => {
    if (hasInteracted || reducedMotion) return
    const t = setInterval(() => setActiveIndex((prev) => (prev + 1) % 4), 4500)
    return () => clearInterval(t)
  }, [hasInteracted, reducedMotion])

  const active = principles[activeIndex]

  return (
    <section className="relative min-h-screen bg-white bg-[radial-gradient(980px_680px_at_72%_18%,rgba(245,158,11,0.28),rgba(255,255,255,0))]">
      <div className="container mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Hero text + CTA */}
          <div className="space-y-7">
            <motion.p
              className="text-sm uppercase tracking-[0.32em] text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Martin Heßmann
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[0.95] tracking-[-0.02em] text-gray-950"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              Systems<br />Designer —<br />Design,<br />Engineering, AI
            </motion.h1>
            <motion.p
              className="text-base lg:text-lg text-gray-700 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I connect brand, product, and technology into systems that make teams autonomous.
              10+ years bridging design and engineering — building maintainable platforms,
              AI-assisted workflows, and design systems at scale. Seeking long-term partnerships
              where I can drive sustained impact across the full product lifecycle.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                type="button"
                onClick={scrollToWork}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-400 text-gray-950 font-semibold border border-amber-300/60 hover:bg-amber-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
              >
                See case studies
              </button>
            </motion.div>
          </div>

          {/* Right: Orb with icon + principle text + dot pagination */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Orb: dashed outline with icon */}
            <PrincipleOrb activeColor={active.color} iconType={active.icon} reducedMotion={reducedMotion} />

            {/* Principle text */}
            <div className="mt-6 text-center max-w-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <h3
                    className="font-serif italic text-lg text-gray-950"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    {active.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{active.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot pagination (no icons) */}
            <div role="tablist" aria-label="Principles" className="flex justify-center gap-3 mt-6">
              {principles.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-label={p.title}
                  onClick={() => { setActiveIndex(i); setHasInteracted(true) }}
                  className={`w-8 h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${DOT_RING_CLASS[p.color]} ${
                    activeIndex === i ? `${DOT_BG_ACTIVE[p.color]} scale-110 shadow-[0_0_0_3px_rgba(0,0,0,0.06)]` : "bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
