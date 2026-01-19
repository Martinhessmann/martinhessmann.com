"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

type PrincipleColor = "blue" | "amber" | "lime" | "lilac"

interface Principle {
  id: string
  color: PrincipleColor
  title: string
  description: string
}

const principles: Principle[] = [
  { id: "complexity", color: "blue",  title: "Go where the complexity is", description: "I don't shy away from cross-disciplinary responsibility. I open black boxes, learn what's inside, and translate it so teams can make decisions." },
  { id: "systems",    color: "amber", title: "Make design systems fun again", description: "When a design system feels like a burden, I dig in quickly and achieve results. Systems should enable, not constrain." },
  { id: "enable",     color: "lime",  title: "Enable, don't just execute", description: "I don't just build — I make teams capable of building themselves. Enablement over handoff." },
  { id: "iterate",    color: "lilac", title: "Think in systems, ship in iterations", description: "I prototype, test, iterate. Big-bang launches are risky; small bets compound into real impact." },
]

type OrbLayout = {
  glow: { core: string; edge: string; halo: string; x: string; y: string; x2: string; y2: string }
  ellipses: Array<{
    cx: number
    cy: number
    rx: number
    ry: number
    rotate: number
    opacity: number
    dash?: string
  }>
}

const ORB_LAYOUTS: OrbLayout[] = [
  {
    glow: { core: "rgba(255, 122, 70, 0.95)", edge: "rgba(255, 200, 120, 0.75)", halo: "rgba(255, 160, 90, 0.55)", x: "40%", y: "50%", x2: "62%", y2: "36%" },
    ellipses: [
      { cx: 90, cy: 160, rx: 44, ry: 120, rotate: -8, opacity: 0.9 },
      { cx: 120, cy: 160, rx: 54, ry: 126, rotate: -3, opacity: 0.86 },
      { cx: 154, cy: 160, rx: 62, ry: 130, rotate: 2, opacity: 0.78, dash: "1.5 6" },
      { cx: 190, cy: 160, rx: 70, ry: 124, rotate: 8, opacity: 0.84 },
      { cx: 224, cy: 160, rx: 56, ry: 112, rotate: 14, opacity: 0.78 },
    ],
  },
  {
    glow: { core: "rgba(90, 130, 235, 0.95)", edge: "rgba(170, 200, 255, 0.75)", halo: "rgba(120, 150, 255, 0.5)", x: "58%", y: "52%", x2: "42%", y2: "68%" },
    ellipses: [
      { cx: 160, cy: 160, rx: 122, ry: 70, rotate: 0, opacity: 0.86 },
      { cx: 160, cy: 160, rx: 108, ry: 56, rotate: 0, opacity: 0.7, dash: "2 6" },
      { cx: 130, cy: 160, rx: 50, ry: 128, rotate: -14, opacity: 0.88 },
      { cx: 190, cy: 160, rx: 50, ry: 128, rotate: 14, opacity: 0.88 },
      { cx: 160, cy: 160, rx: 30, ry: 92, rotate: 90, opacity: 0.7 },
    ],
  },
  {
    glow: { core: "rgba(120, 205, 110, 0.93)", edge: "rgba(220, 230, 140, 0.7)", halo: "rgba(240, 190, 120, 0.45)", x: "46%", y: "44%", x2: "66%", y2: "60%" },
    ellipses: [
      { cx: 120, cy: 132, rx: 64, ry: 96, rotate: -22, opacity: 0.84 },
      { cx: 148, cy: 150, rx: 74, ry: 108, rotate: -10, opacity: 0.86 },
      { cx: 178, cy: 172, rx: 84, ry: 118, rotate: 4, opacity: 0.82, dash: "1.8 6" },
      { cx: 208, cy: 194, rx: 46, ry: 86, rotate: 18, opacity: 0.72 },
      { cx: 138, cy: 198, rx: 40, ry: 74, rotate: -32, opacity: 0.7 },
    ],
  },
  {
    glow: { core: "rgba(175, 130, 235, 0.9)", edge: "rgba(205, 190, 255, 0.72)", halo: "rgba(130, 165, 235, 0.55)", x: "52%", y: "50%", x2: "38%", y2: "42%" },
    ellipses: [
      { cx: 160, cy: 160, rx: 104, ry: 58, rotate: 90, opacity: 0.78 },
      { cx: 160, cy: 160, rx: 96, ry: 62, rotate: 0, opacity: 0.78 },
      { cx: 160, cy: 160, rx: 68, ry: 122, rotate: -24, opacity: 0.86 },
      { cx: 160, cy: 160, rx: 68, ry: 122, rotate: 24, opacity: 0.86 },
      { cx: 160, cy: 160, rx: 124, ry: 124, rotate: 0, opacity: 0.6, dash: "3 8" },
    ],
  },
]

type TransitionProfile = {
  order: number[]
  duration: number
  ease: number[] | string
  stagger: number
  overshoot: number
  rxPulse: number
  ryPulse: number
  opacityPulse: number
  dashShift: number
  drift: { x: number; y: number }
}

const ORDER_PATTERNS = [
  [0, 1, 2, 3, 4],
  [4, 3, 2, 1, 0],
  [0, 2, 4, 3, 1],
  [1, 3, 0, 4, 2],
]

const TRANSITION_STYLES: Omit<TransitionProfile, "order" | "drift">[] = [
  { duration: 0.85, ease: [0.22, 1, 0.36, 1], stagger: 0.05, overshoot: 14, rxPulse: 1.08, ryPulse: 0.92, opacityPulse: 0.6, dashShift: 10 },
  { duration: 0.95, ease: [0.55, 0, 0.25, 1], stagger: 0.06, overshoot: -18, rxPulse: 0.94, ryPulse: 1.1, opacityPulse: 0.5, dashShift: -12 },
  { duration: 0.75, ease: [0.34, 1.56, 0.64, 1], stagger: 0.04, overshoot: 10, rxPulse: 1.12, ryPulse: 0.86, opacityPulse: 0.7, dashShift: 6 },
  { duration: 0.9, ease: "easeInOut", stagger: 0.07, overshoot: 20, rxPulse: 0.9, ryPulse: 1.15, opacityPulse: 0.5, dashShift: 14 },
]

const REDUCED_PROFILE: TransitionProfile = {
  order: [0, 1, 2, 3, 4],
  duration: 0.2,
  ease: "easeOut",
  stagger: 0,
  overshoot: 0,
  rxPulse: 1,
  ryPulse: 1,
  opacityPulse: 1,
  dashShift: 0,
  drift: { x: 0, y: 0 },
}

const getTransitionProfile = (from: number, to: number, reducedMotion: boolean): TransitionProfile => {
  if (reducedMotion || from === to) return REDUCED_PROFILE
  const patternIndex = from * 4 + to
  const style = TRANSITION_STYLES[patternIndex % TRANSITION_STYLES.length]
  const order = ORDER_PATTERNS[Math.floor(patternIndex / TRANSITION_STYLES.length)]
  const drift = {
    x: ((patternIndex % 5) - 2) * 7,
    y: (((patternIndex >> 2) % 5) - 2) * 7,
  }
  return { ...style, order, drift }
}

const PrincipleOrb = ({
  layoutIndex,
  fromIndex,
  reducedMotion,
}: {
  layoutIndex: number
  fromIndex: number
  reducedMotion: boolean
}) => {
  const layout = ORB_LAYOUTS[layoutIndex % ORB_LAYOUTS.length]
  const profile = getTransitionProfile(fromIndex, layoutIndex, reducedMotion)
  const orderIndex = profile.order.reduce((acc, value, idx) => {
    acc[value] = idx
    return acc
  }, Array(5).fill(0) as number[])

  return (
    <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[480px] lg:h-[480px] mx-auto lg:mx-0 flex items-center justify-center isolate">
      <motion.div
        className="absolute inset-[8%] z-0 rounded-full pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${layout.glow.x} ${layout.glow.y}, ${layout.glow.core} 0%, ${layout.glow.edge} 52%, rgba(255,255,255,0) 78%), radial-gradient(circle at ${layout.glow.x2} ${layout.glow.y2}, ${layout.glow.halo} 0%, rgba(255,255,255,0) 64%)`,
        }}
        transition={{ duration: profile.duration, ease: profile.ease }}
        style={{ filter: "blur(64px)", opacity: 1 }}
        aria-hidden="true"
      />
      <motion.svg
        viewBox="0 0 320 320"
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        {layout.ellipses.map((ellipse, idx) => {
          const delay = orderIndex[idx] * profile.stagger
          const direction = idx % 2 === 0 ? 1 : -1
          return (
            <motion.ellipse
              key={idx}
              initial={false}
              animate={{
                cx: [ellipse.cx + profile.drift.x * direction, ellipse.cx],
                cy: [ellipse.cy + profile.drift.y * direction, ellipse.cy],
                rx: [ellipse.rx * profile.rxPulse, ellipse.rx],
                ry: [ellipse.ry * profile.ryPulse, ellipse.ry],
                rotate: [ellipse.rotate + profile.overshoot * direction, ellipse.rotate],
                opacity: [Math.max(0.35, ellipse.opacity * profile.opacityPulse), ellipse.opacity],
                strokeDashoffset: ellipse.dash ? [profile.dashShift * direction, 0] : 0,
              }}
              transition={{ duration: profile.duration, ease: profile.ease, delay }}
              style={{ transformOrigin: `${ellipse.cx}px ${ellipse.cy}px` }}
              stroke="rgba(15, 15, 15, 0.85)"
              strokeWidth="1.4"
              fill="none"
              strokeDasharray={ellipse.dash}
            />
          )
        })}
      </motion.svg>
    </div>
  )
}

export function Section01About() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const reducedMotion = useReducedMotion()
  const prevIndexRef = useRef(0)

  const fromIndex = prevIndexRef.current

  const scrollToWork = () => document.getElementById("teambank")?.scrollIntoView({ behavior: "smooth" })

  // Auto-rotate every 4.5s when user hasn't interacted and reducedMotion is off
  useEffect(() => {
    if (hasInteracted || reducedMotion) return
    const t = setInterval(() => setActiveIndex((prev) => (prev + 1) % 4), 4500)
    return () => clearInterval(t)
  }, [hasInteracted, reducedMotion])

  useEffect(() => {
    prevIndexRef.current = activeIndex
  }, [activeIndex])

  const active = principles[activeIndex]

  return (
    <section className="relative min-h-screen isolate bg-transparent overflow-hidden">
      <motion.div
        className="absolute -inset-[16%] z-0 pointer-events-none bg-[radial-gradient(1100px_760px_at_74%_14%,rgba(255,175,120,0.28),rgba(255,255,255,0)),radial-gradient(900px_700px_at_22%_74%,rgba(96,140,205,0.22),rgba(255,255,255,0)),radial-gradient(760px_520px_at_86%_70%,rgba(245,204,140,0.2),rgba(255,255,255,0))]"
        animate={{ x: ["-2%", "2%", "-2%"], y: ["2%", "-2%", "2%"], scale: [1, 1.04, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-20 lg:pb-28 relative z-10">
        <div className="grid min-h-[72vh] items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* Left: Hero text + CTA */}
          <div className="relative z-30 max-w-[560px] space-y-6">
            <motion.p
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.45em] text-gray-500"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              <span className="text-gray-400">01 / About</span>
              <span className="text-gray-700">Martin Heßmann</span>
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.04] tracking-[-0.02em] text-gray-950"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              Systems Designer —<br />Design, Engineering, AI
            </motion.h1>
            <motion.p
              className="text-[13px] sm:text-sm text-gray-700 max-w-xl leading-[1.65]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              I connect brand, product, and technology into systems that make teams autonomous.
              10+ years bridging design and engineering — building maintainable platforms,
              AI-assisted workflows, and design systems at scale. Seeking long-term partnerships
              where I can drive sustained impact across the full product lifecycle.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                type="button"
                onClick={scrollToWork}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-amber-400 text-gray-950 text-[11px] font-semibold uppercase tracking-[0.25em] border border-amber-300/60 shadow-[0_14px_24px_-18px_rgba(140,80,20,0.45)] transition-all hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
              >
                See case studies
              </button>
            </motion.div>
          </div>

          {/* Right: Orb with sketch + principle text + dot pagination */}
          <motion.div
            className="relative z-20 flex flex-col items-center isolate"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <div className="relative w-full flex justify-center z-10">
              <PrincipleOrb layoutIndex={activeIndex} fromIndex={fromIndex} reducedMotion={Boolean(reducedMotion)} />
            </div>

            <div className="mt-8 w-full max-w-[420px] text-center relative z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2 min-h-[96px]"
                >
                  <h3
                    className="font-serif italic text-[13px] sm:text-sm text-gray-900"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                  >
                    {active.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-gray-700 leading-relaxed">{active.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div role="tablist" aria-label="Principles" className="flex justify-center gap-3 mt-6 relative z-20">
              {principles.map((p, i) => {
                const isActive = activeIndex === i
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={p.title}
                    onClick={() => { setActiveIndex(i); setHasInteracted(true) }}
                    className={`w-10 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 ${
                      isActive ? "bg-black scale-110" : "bg-black/15 hover:bg-black/25"
                    }`}
                  />
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
