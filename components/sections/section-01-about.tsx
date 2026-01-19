"use client"

import { motion } from "framer-motion"

// Geometric wireframe icons for principles
const PrincipleIcon = ({ type }: { type: "empathy" | "research" | "responsibility" | "ensemble" }) => {
  const iconSize = 64
  const strokeWidth = 1.5
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

// Gradient Orb component
const GradientOrb = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Soft gradient blur layers */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Lilac layer */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-60"
          style={{
            background: "rgb(219, 190, 237)",
            filter: "blur(80px)",
            transform: "translate(-20%, -10%)"
          }}
        />
        {/* Blue layer */}
        <div
          className="absolute w-[250px] h-[250px] rounded-full opacity-50"
          style={{
            background: "rgb(29, 29, 255)",
            filter: "blur(100px)",
            transform: "translate(30%, 20%)"
          }}
        />
      </div>

      {/* Sharp geometric circle with amber fill */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Filled amber circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="rgb(245, 215, 46)"
            fillOpacity="0.9"
          />
          {/* Dashed outline */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgb(26, 26, 26)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </motion.div>
    </div>
  )
}

interface Principle {
  id: string
  icon: "empathy" | "research" | "responsibility" | "ensemble"
  title: string
  description: string
}

const principles: Principle[] = [
  {
    id: "complexity",
    icon: "empathy",
    title: "Go where the complexity is",
    description: "I don't shy away from cross-disciplinary responsibility. I open black boxes, learn what's inside, and translate it so teams can make decisions."
  },
  {
    id: "systems",
    icon: "research",
    title: "Make design systems fun again",
    description: "When a design system feels like a burden, I dig in quickly and achieve results. Systems should enable, not constrain."
  },
  {
    id: "enable",
    icon: "responsibility",
    title: "Enable, don't just execute",
    description: "I don't just build — I make teams capable of building themselves. Enablement over handoff."
  },
  {
    id: "iterate",
    icon: "ensemble",
    title: "Think in systems, ship in iterations",
    description: "I prototype, test, iterate. Big-bang launches are risky; small bets compound into real impact."
  }
]

export function Section01About() {
  return (
    <section className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 lg:px-12 pt-16 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            {/* Name in italic serif */}
            <motion.p
              className="font-serif italic text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "'EB Garamond', serif" }}
            >
              Martin Heßmann
            </motion.p>

            {/* Large headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-950"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: "'TeXGyreHeros', sans-serif" }}
            >
              Systems<br />
              Designer —<br />
              Design,<br />
              Engineering, AI
            </motion.h1>

            {/* Summary */}
            <motion.p
              className="text-base lg:text-lg text-gray-600 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I connect brand, product, and technology into systems that make teams autonomous.
              10+ years bridging design and engineering — building maintainable platforms,
              AI-assisted workflows, and design systems at scale. Seeking long-term partnerships
              where I can drive sustained impact across the full product lifecycle.
            </motion.p>
          </div>

          {/* Right: Gradient Orb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <GradientOrb />
          </motion.div>
        </div>
      </div>

      {/* Principles Section */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.id}
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              {/* Icon */}
              <div className="flex justify-center text-gray-400">
                <PrincipleIcon type={principle.icon} />
              </div>

              {/* Title in italic serif */}
              <h3
                className="font-serif italic text-lg text-gray-950"
                style={{ fontFamily: "'EB Garamond', serif" }}
              >
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
