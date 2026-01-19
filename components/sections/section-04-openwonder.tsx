"use client"

import { CaseStudy } from "./case-study"
import Image from "next/image"

// Open Wonder illustration
const OpenWonderIllustration = () => (
  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
    {/* Background gradient - AI/tech feel */}
    <div
      className="absolute w-[200px] h-[200px] rounded-full opacity-40"
      style={{
        background: "linear-gradient(135deg, rgb(29, 29, 255), rgb(219, 190, 237))",
        filter: "blur(60px)",
      }}
    />

    {/* Try to load the illustration image */}
    <div className="relative">
      <Image
        src="/images/projects/openwonder-illlu.png"
        alt="Open Wonder illustration"
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

export function Section04OpenWonder() {
  return (
    <CaseStudy
      id="openwonder"
      title="Open Wonder"
      subline="AI workflows between creative freedom and brand guardrails"
      narrative="I shape how our AI system balances creative freedom with brand restrictions — and how AI agents transform our development process."
      proofPoints={[
        "Daily involvement in LLM process definition",
        "Governance at scale: how much restriction, how much freedom?",
        "AI-assisted development (Cursor agents, tracer agents)",
        "Product design + development: both sides simultaneously"
      ]}
      quote="I've integrated AI into my workflow from day one — not as a novelty, but as a practical tool for prototyping, content development, and accelerating delivery."
      illustration={<OpenWonderIllustration />}
      url="https://openwonder.com"
      technologies={["Next.js", "Supabase", "fal.ai", "LLM Integration", "Cursor"]}
      reversed={false}
    />
  )
}
