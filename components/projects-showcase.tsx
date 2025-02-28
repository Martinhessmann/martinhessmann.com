import { ProjectCard } from './project-card'
import { SectionHeader } from './section-header'

export function ProjectsShowcase() {
  return (
    <div className="my-6 md:my-8">
      <SectionHeader
        title="Featured Projects"
        subtitle="Selected work from my professional career"
        id="projects"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <ProjectCard
          title="ElodieCarstensen.com"
          description="Personal website and Digital Rental Catalogue as a React app powered by AirTable."
          url="https://www.elodiecarstensen.com"
          technologies="React, AirTable, Next.js"
          imageSrc="/images/2x1-two-man-smiling-with-phones-in-the-hand.png"
        />

        <ProjectCard
          title="WoMoFonds"
          description="Supporting the digital presence for WoMoFonds and Dein-WoMo."
          url="https://womofonds.de/"
          technologies="Next.js, Tailwind CSS"
          imageSrc="/images/1x1-three-people-standing-and-laughting-outside.png"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
        <ProjectCard
          title="Whats Netz"
          description="An interactive 3D strategy game for E.ON in collaboration with Ray Sono."
          url="https://www.eon.com/de/c/whatsnetz.html"
          technologies="Three.js, React"
          imageSrc="/images/1x1-curious-group-of-people.png"
        />

        <ProjectCard
          title="easyCredit Partner"
          description="Co-creating the web platform and style guide, shaping their B2B brand identity."
          url="https://www.easycredit-ratenkauf.de/"
          technologies="Design System, UI/UX"
          imageSrc="/images/1x1-group-of-people-smiling-at-each-other-conference-hall.png"
        />
      </div>
    </div>
  )
}