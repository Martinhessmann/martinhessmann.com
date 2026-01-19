"use client"

import { CaseStudy } from "./case-study"
import Image from "next/image"

// DPF/Tertianum illustration
const DPFIllustration = () => (
  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
    {/* Background gradient */}
    <div
      className="absolute w-[180px] h-[180px] rounded-full opacity-30"
      style={{
        background: "rgb(219, 190, 237)",
        filter: "blur(50px)",
        transform: "translate(-30%, 10%)"
      }}
    />

    {/* Try to load the illustration image, fallback to geometric */}
    <div className="relative">
      <Image
        src="/images/projects/tertianum-illu.png"
        alt="DPF / Tertianum illustration"
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

export function Section03DPF() {
  return (
    <CaseStudy
      id="dpf"
      title="DPF / Tertianum"
      subline="Premium brands with distinct systems, consistently led"
      narrative="I became the central point of contact for everything digital — multiple brands, their own design systems, different stacks, a CRM migration — and kept it maintainable while keeping teams capable."
      proofPoints={[
        "6 brands, each with own design system (not shared components)",
        "WordPress + Next.js/Prismic hybrid stack",
        "CRM migration from proprietary to Microsoft Dynamics",
        "Coordinated brand, marketing, SEO, HR, Google Ads teams"
      ]}
      quote="I invest time upfront to understand how clients operate their business, what success looks like for them, and who they need to satisfy."
      illustration={<DPFIllustration />}
      url="https://tertianum.de"
      technologies={["WordPress", "Next.js", "Prismic", "Microsoft Dynamics", "Nuxt"]}
      reversed={true}
    />
  )
}
