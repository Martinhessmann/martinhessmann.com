"use client"

import { CaseStudy } from "./case-study"
import Image from "next/image"

// WoMoFonds illustration
const WoMoFondsIllustration = () => (
  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
    {/* Background gradient */}
    <div
      className="absolute w-[180px] h-[180px] rounded-full opacity-30"
      style={{
        background: "rgb(219, 255, 111)",
        filter: "blur(50px)",
        transform: "translate(20%, -10%)"
      }}
    />

    {/* Try to load the illustration image */}
    <div className="relative">
      <Image
        src="/images/projects/womofonds-illlu.png"
        alt="WoMoFonds illustration"
        width={300}
        height={300}
        className="object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  </div>
)

export function Section05WoMoFonds() {
  return (
    <CaseStudy
      id="womofonds"
      title="WoMoFonds"
      subline="Subsidy logic built as a clear digital process"
      narrative="I built subsidy applications as understandable digital flows — with AI chatbot support that measurably relieves teams."
      proofPoints={[
        "Not 'just forms' — two platforms paying real subsidies to real people",
        "AI assistant: precise, multilingual (15+ languages), privacy-compliant (PwC audited)",
        "'Think first, then act' principle — no hallucinations, no fantasy answers",
        "Routine automated, edge cases to humans — best of both"
      ]}
      quote="The AI assistant doesn't hallucinate. When it's about real entitlements and real deadlines, reliability is non-negotiable."
      illustration={<WoMoFondsIllustration />}
      url="https://womofonds.de"
      technologies={["TYPO3", "Eleventy", "Cohere", "Upstash RAG", "Multilingual"]}
      reversed={true}
    />
  )
}
