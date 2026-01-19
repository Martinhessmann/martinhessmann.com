"use client"

import { CaseStudy } from "./case-study"

// Abstract: AI system — central agent with orbiting model frames + feedback loop
const OpenWonderIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
    {/* Central AI agent */}
    <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="2" />
    <circle cx="200" cy="200" r="20" fill="currentColor" fillOpacity="0.2" />

    {/* Orbiting model frames */}
    <rect x="80" y="80" width="60" height="45" stroke="currentColor" strokeWidth="1.5" transform="rotate(-15 110 102)" />
    <rect x="260" y="70" width="60" height="45" stroke="currentColor" strokeWidth="1.5" transform="rotate(10 290 92)" />
    <rect x="280" y="200" width="60" height="45" stroke="currentColor" strokeWidth="1.5" transform="rotate(5 310 222)" />
    <rect x="60" y="240" width="60" height="45" stroke="currentColor" strokeWidth="1.5" transform="rotate(-8 90 262)" />

    {/* Feedback loop — circular arc */}
    <path d="M 120 150 A 100 100 0 0 1 280 150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
    <path d="M 280 250 A 100 100 0 0 1 120 250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />

    {/* Output nodes */}
    <circle cx="200" cy="320" r="15" stroke="currentColor" strokeWidth="2" />
    <circle cx="160" cy="340" r="10" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="240" cy="340" r="10" stroke="currentColor" strokeWidth="1.5" />
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
