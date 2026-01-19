"use client"

import { CaseStudy } from "./case-study"
import Image from "next/image"

// Grün Berlin illustration
const GrunBerlinIllustration = () => (
  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
    {/* Background gradient - green/nature feel */}
    <div
      className="absolute w-[200px] h-[200px] rounded-full opacity-30"
      style={{
        background: "rgb(219, 255, 111)",
        filter: "blur(60px)",
        transform: "translate(-20%, 10%)"
      }}
    />

    {/* Try to load the illustration image */}
    <div className="relative">
      <Image
        src="/images/projects/gruenberlin-illu.png"
        alt="Grün Berlin illustration"
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

export function Section06GrunBerlin() {
  return (
    <CaseStudy
      id="grunberlin"
      title="Grün Berlin + infraSignal"
      subline="Branding translated into modular TYPO3 system"
      narrative="I translated urban infrastructure and civic participation into digital systems that benefit teams and citizens equally."
      proofPoints={[
        "Rebrand translation: photos + content into sensible sitemap",
        "TYPO3 modularization with specialized backend partner",
        "infraSignal spin-off: cloned template, own branding, fault reporting on Mapbox",
        "Interactive project map, digitized annual reports, park newsletters"
      ]}
      quote="I found the right partner for TYPO3 backend expertise and connected it with our frontend know-how."
      illustration={<GrunBerlinIllustration />}
      url="https://gruen-berlin.de"
      technologies={["TYPO3", "Mapbox", "Brevo", "Cloudflare", "Sentry"]}
      reversed={false}
    />
  )
}
