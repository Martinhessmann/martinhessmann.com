"use client"

import { CaseStudy } from "./case-study"

// Abstract: civic infrastructure — map fragment + traffic signal + incident card
const GrunBerlinIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
    {/* Torn map fragment */}
    <path d="M 80 100 L 200 80 L 220 160 L 180 200 L 100 180 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
    <path d="M 100 120 L 160 110 M 120 150 L 180 140 M 140 170 L 200 160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />

    {/* Glowing pin */}
    <circle cx="150" cy="140" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    <circle cx="150" cy="140" r="8" fill="currentColor" />

    {/* Traffic signal */}
    <rect x="260" y="100" width="40" height="100" rx="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="280" cy="125" r="12" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="280" cy="155" r="12" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="280" cy="185" r="12" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />

    {/* Signal heartbeat */}
    <path d="M 320 150 L 340 150 L 350 130 L 360 170 L 370 150 L 390 150" stroke="currentColor" strokeWidth="2" />

    {/* Incident report card */}
    <rect x="100" y="260" width="100" height="70" rx="4" stroke="currentColor" strokeWidth="2" />
    <line x1="115" y1="280" x2="185" y2="280" stroke="currentColor" strokeWidth="1.5" />
    <line x1="115" y1="295" x2="170" y2="295" stroke="currentColor" strokeWidth="1" />
    <line x1="115" y1="310" x2="160" y2="310" stroke="currentColor" strokeWidth="1" />

    {/* Connection lines */}
    <line x1="200" y1="180" x2="260" y2="150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
    <line x1="150" y1="260" x2="150" y2="200" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
  </svg>
)

const body = `I translated urban infrastructure and civic participation into digital systems that benefit teams and citizens equally. Rebrand: photos and content into a sensible sitemap. TYPO3 modularization with a specialized backend partner. infraSignal as a spin-off with a cloned template, own branding, and fault reporting on Mapbox. Interactive project map, digitized annual reports, park newsletters.

I found the right partner for TYPO3 backend expertise and connected it with our frontend know-how.`

export function Section06GrunBerlin() {
  return (
    <CaseStudy
      id="grunberlin"
      title="Grün Berlin + infraSignal"
      subline="Branding translated into modular TYPO3 system"
      body={body}
      illustration={<GrunBerlinIllustration />}
      url="https://gruen-berlin.de"
      technologies={["TYPO3", "Mapbox", "Brevo", "Cloudflare", "Sentry"]}
      illustrationPosition="right"
    />
  )
}
