"use client"

import { CaseStudy } from "./case-study"

// Abstract: AI system — thin orbits + model frames
const OpenWonderIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
    {/* Central AI agent */}
    <circle cx="200" cy="200" r="48" stroke="currentColor" strokeWidth="1.1" opacity="0.65" />
    <circle cx="200" cy="200" r="18" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />

    {/* Orbiting model frames */}
    <rect x="86" y="86" width="56" height="40" stroke="currentColor" strokeWidth="0.9" opacity="0.6" transform="rotate(-15 114 106)" />
    <rect x="258" y="76" width="56" height="40" stroke="currentColor" strokeWidth="0.9" opacity="0.6" transform="rotate(10 286 96)" />
    <rect x="282" y="202" width="56" height="40" stroke="currentColor" strokeWidth="0.9" opacity="0.6" transform="rotate(5 310 222)" />
    <rect x="66" y="242" width="56" height="40" stroke="currentColor" strokeWidth="0.9" opacity="0.6" transform="rotate(-8 94 262)" />

    {/* Feedback loop — circular arc */}
    <path d="M 120 150 A 100 100 0 0 1 280 150" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 6" fill="none" opacity="0.55" />
    <path d="M 280 250 A 100 100 0 0 1 120 250" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 6" fill="none" opacity="0.55" />

    {/* Output nodes */}
    <circle cx="200" cy="320" r="14" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
    <circle cx="160" cy="338" r="9" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
    <circle cx="240" cy="338" r="9" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
  </svg>
)

const body = `I shape how our AI system balances creative freedom with brand restrictions — and how AI agents transform our development process. That means daily involvement in LLM process definition, decisions about governance at scale (how much restriction, how much freedom?), and hands-on AI-assisted development with Cursor and tracer agents while doing both product design and implementation.

I've integrated AI into my workflow from day one — not as a novelty, but as a practical tool for prototyping, content development, and accelerating delivery.`

export function Section04OpenWonder() {
  return (
    <CaseStudy
      id="openwonder"
      title="Open Wonder"
      subline="AI workflows between creative freedom and brand guardrails"
      body={body}
      illustration={<OpenWonderIllustration />}
      url="https://openwonder.com"
      technologies={["Next.js", "Supabase", "fal.ai", "LLM Integration", "Cursor"]}
      illustrationPosition="right"
    />
  )
}
