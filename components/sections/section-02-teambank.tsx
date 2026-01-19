"use client"

import { CaseStudy } from "./case-study"

// TeamBank illustration - modular content blocks
const TeamBankIllustration = () => (
  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
    {/* Background gradient */}
    <div
      className="absolute w-[200px] h-[200px] rounded-full opacity-30"
      style={{
        background: "rgb(29, 29, 255)",
        filter: "blur(60px)",
        transform: "translate(20%, -20%)"
      }}
    />

    {/* Geometric composition */}
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
      {/* Platform blocks */}
      <rect x="50" y="80" width="80" height="60" stroke="rgb(26, 26, 26)" strokeWidth="1.5" fill="none" />
      <rect x="70" y="100" width="80" height="60" stroke="rgb(26, 26, 26)" strokeWidth="1.5" fill="none" />
      <rect x="90" y="120" width="80" height="60" stroke="rgb(26, 26, 26)" strokeWidth="1.5" fill="none" />
      <rect x="110" y="140" width="80" height="60" stroke="rgb(26, 26, 26)" strokeWidth="1.5" fill="rgb(245, 215, 46)" fillOpacity="0.3" />

      {/* Connection lines */}
      <line x1="130" y1="200" x2="200" y2="240" stroke="rgb(26, 26, 26)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="170" y1="200" x2="220" y2="240" stroke="rgb(26, 26, 26)" strokeWidth="1" strokeDasharray="4 4" />

      {/* Central node */}
      <circle cx="210" cy="250" r="20" stroke="rgb(29, 29, 255)" strokeWidth="1.5" fill="none" />
      <circle cx="210" cy="250" r="8" fill="rgb(29, 29, 255)" />
    </svg>
  </div>
)

export function Section02TeamBank() {
  return (
    <CaseStudy
      id="teambank"
      title="TeamBank"
      subline="Platform ecosystem from brand, content, and tech"
      narrative="I connected brand, content, and tech into a maintainable platform ecosystem that makes teams decision-capable and autonomous."
      proofPoints={[
        "Translated brand vision into functional UI across 4 platforms",
        "Digitized partner handbooks: structured, searchable, maintainable (not 'PDFs into web')",
        "Led right conversations in right order — knew when to bring who in",
        "Worked directly with Head of Product on easyCredit B2B payment services"
      ]}
      quote="When a design system becomes a burden instead of an enabler, I dig in, simplify the complexity, and get teams back to shipping."
      illustration={<TeamBankIllustration />}
      url="https://teambank.de"
      technologies={["WordPress", "Azure", "ACF Pro", "Algolia", "React"]}
      reversed={false}
    />
  )
}
