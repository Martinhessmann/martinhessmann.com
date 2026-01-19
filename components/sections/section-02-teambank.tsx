"use client"

import { CaseStudy } from "./case-study"

// Abstract: modular platform blocks — stacked rectangles with connection lines
const TeamBankIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
    {/* Platform blocks — modular ecosystem */}
    <rect x="60" y="80" width="120" height="80" stroke="currentColor" strokeWidth="2" />
    <rect x="100" y="120" width="120" height="80" stroke="currentColor" strokeWidth="2" />
    <rect x="140" y="160" width="120" height="80" stroke="currentColor" strokeWidth="2" />
    <rect x="180" y="200" width="120" height="80" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />

    {/* Connection lines — integration */}
    <line x1="200" y1="280" x2="300" y2="340" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
    <line x1="240" y1="280" x2="320" y2="340" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />

    {/* Central node */}
    <circle cx="310" cy="350" r="30" stroke="currentColor" strokeWidth="2" />
    <circle cx="310" cy="350" r="12" fill="currentColor" />
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
