"use client"

import { CaseStudy } from "./case-study"

// Abstract: premium brand architecture — keyhole + floating cards
const DPFIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
    {/* Architectural block with keyhole */}
    <rect x="100" y="80" width="200" height="240" stroke="currentColor" strokeWidth="2" />
    <circle cx="200" cy="180" r="40" stroke="currentColor" strokeWidth="2" />
    <rect x="190" y="180" width="20" height="60" fill="currentColor" fillOpacity="0.2" />

    {/* Floating brand cards */}
    <rect x="60" y="120" width="50" height="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    <rect x="290" y="100" width="50" height="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    <rect x="290" y="160" width="50" height="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    <rect x="60" y="220" width="50" height="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    <rect x="290" y="240" width="50" height="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    <rect x="60" y="280" width="50" height="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />

    {/* Central coordination node */}
    <circle cx="200" cy="350" r="20" stroke="currentColor" strokeWidth="2" />
    <circle cx="200" cy="350" r="8" fill="currentColor" />
  </svg>
)

const body = `I became the central point of contact for everything digital across multiple brands — each with its own design system, different stacks, and a CRM migration — and kept it maintainable while keeping teams capable. Six brands, each with its own system rather than shared components; a WordPress and Next.js/Prismic hybrid; CRM migration from proprietary to Microsoft Dynamics; and coordination across brand, marketing, SEO, HR, and Google Ads.

I invest time upfront to understand how clients operate, what success looks like for them, and who they need to satisfy.`

export function Section03DPF() {
  return (
    <CaseStudy
      id="dpf"
      title="DPF / Tertianum"
      subline="Premium brands with distinct systems, consistently led"
      body={body}
      illustration={<DPFIllustration />}
      url="https://tertianum.de"
      technologies={["WordPress", "Next.js", "Prismic", "Microsoft Dynamics", "Nuxt"]}
      illustrationPosition="left"
      reversed={true}
    />
  )
}
