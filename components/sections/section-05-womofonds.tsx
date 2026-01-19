"use client"

import { CaseStudy } from "./case-study"

// Abstract: subsidy flow — house/mobility icons + step ribbon + chat bubble
const WoMoFondsIllustration = () => (
  <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
    {/* House icon */}
    <path d="M 100 180 L 140 140 L 180 180 L 180 240 L 100 240 Z" stroke="currentColor" strokeWidth="2" />
    <rect x="125" y="200" width="30" height="40" stroke="currentColor" strokeWidth="1.5" />

    {/* Car silhouette */}
    <ellipse cx="80" cy="290" rx="35" ry="15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    <circle cx="60" cy="300" r="8" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="100" cy="300" r="8" stroke="currentColor" strokeWidth="1.5" />

    {/* Train silhouette */}
    <rect x="200" y="270" width="80" height="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
    <circle cx="220" cy="320" r="8" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="260" cy="320" r="8" stroke="currentColor" strokeWidth="1.5" />

    {/* Step ribbon — application flow */}
    <line x1="200" y1="100" x2="200" y2="220" stroke="currentColor" strokeWidth="2" />
    <circle cx="200" cy="100" r="8" fill="currentColor" />
    <circle cx="200" cy="140" r="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="200" cy="180" r="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="200" cy="220" r="8" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />

    {/* Chat bubble — AI assistant */}
    <rect x="280" y="120" width="70" height="50" rx="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="295" cy="145" r="4" fill="currentColor" />
    <circle cx="315" cy="145" r="4" fill="currentColor" />
    <circle cx="335" cy="145" r="4" fill="currentColor" />
  </svg>
)

const body = `I built subsidy applications as understandable digital flows — with AI chatbot support that measurably relieves teams. These are not just forms: two platforms that pay real subsidies to real people. The AI assistant is precise, multilingual in 15+ languages, privacy-compliant and PwC audited, with a "think first, then act" principle: no hallucinations, no fantasy answers. Routine is automated, edge cases go to humans — best of both.

The AI doesn't hallucinate. When it's about real entitlements and real deadlines, reliability is non-negotiable.`

export function Section05WoMoFonds() {
  return (
    <CaseStudy
      id="womofonds"
      title="WoMoFonds"
      subline="Subsidy logic built as a clear digital process"
      body={body}
      illustration={<WoMoFondsIllustration />}
      url="https://womofonds.de"
      technologies={["TYPO3", "Eleventy", "Cohere", "Upstash RAG", "Multilingual"]}
      illustrationPosition="left"
      reversed={true}
    />
  )
}
