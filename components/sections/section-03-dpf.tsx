"use client"

import { CaseStudy } from "./case-study"

// Abstract: premium brand architecture — thin frames + keyed core
const DPFIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
    {/* Architectural frame */}
    <rect x="110" y="90" width="180" height="220" stroke="currentColor" strokeWidth="1.1" opacity="0.6" />
    <circle cx="200" cy="180" r="36" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    <circle cx="200" cy="180" r="10" stroke="currentColor" strokeWidth="1" opacity="0.7" />

    {/* Floating brand cards */}
    <rect x="70" y="120" width="48" height="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 6" opacity="0.6" />
    <rect x="282" y="110" width="48" height="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 6" opacity="0.6" />
    <rect x="286" y="165" width="48" height="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 6" opacity="0.6" />
    <rect x="70" y="230" width="48" height="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 6" opacity="0.6" />
    <rect x="286" y="238" width="48" height="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 6" opacity="0.6" />
    <rect x="70" y="280" width="48" height="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 6" opacity="0.6" />

    {/* Coordination ring */}
    <circle cx="200" cy="320" r="24" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 6" opacity="0.6" />
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
