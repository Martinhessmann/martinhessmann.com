"use client"

import { CaseStudy } from "./case-study"

// Abstract: layered system orbits — thin, architectural mark
const TeamBankIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
    <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />

    <ellipse cx="200" cy="200" rx="155" ry="65" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    <ellipse cx="200" cy="200" rx="65" ry="155" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
    <ellipse cx="200" cy="200" rx="130" ry="130" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.5" />

    <path d="M70 200c40-48 220-48 260 0" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
    <path d="M70 200c40 48 220 48 260 0" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />

    <circle cx="200" cy="200" r="8" fill="currentColor" opacity="0.7" />
    <circle cx="200" cy="200" r="18" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />
    <circle cx="200" cy="200" r="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 6" opacity="0.5" />
  </svg>
)

const body = `I connected brand, content, and tech into a maintainable platform ecosystem that makes teams decision-capable and autonomous. I translated brand vision into functional UI across four platforms, turned partner handbooks into structured, searchable content instead of PDFs, and led the right conversations in the right order — I knew when to bring who in. I worked directly with the Head of Product on easyCredit B2B payment services.

When a design system becomes a burden instead of an enabler, I dig in, simplify the complexity, and get teams back to shipping.`

export function Section02TeamBank() {
  return (
    <CaseStudy
      id="teambank"
      title="TeamBank"
      subline="Platform ecosystem from brand, content, and tech"
      body={body}
      illustration={<TeamBankIllustration />}
      url="https://teambank.de"
      technologies={["WordPress", "Azure", "ACF Pro", "Algolia", "React"]}
      illustrationPosition="right"
    />
  )
}
