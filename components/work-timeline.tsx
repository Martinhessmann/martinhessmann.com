import { WorkExperienceCard } from './work-experience-card'
import { SectionHeader } from './section-header'

export function WorkTimeline() {
  return (
    <div className="my-6 md:my-8">
      <SectionHeader
        title="Work Experience"
        subtitle="My professional journey through the years"
        id="experience"
      />

      <WorkExperienceCard
        role="Digital Product Manager"
        company="AN"
        location="Berlin"
        period="2023 — Present"
        description="Leading digital product strategy and development, managing client relationships, and coordinating cross-functional teams to deliver innovative solutions."
        imageSrc="/images/2x1-serious-man-office.png"
      />

      <WorkExperienceCard
        role="Art Director"
        company="Unit 4"
        location="Berlin"
        period="2018 — 2023"
        description="Directed creative teams, established design systems, and managed client relationships for various digital products and brand identities."
        imageSrc="/images/1x1-group-of-people-smiling-at-each-other-conference-hall.png"
      />

      <WorkExperienceCard
        role="UX/UI Designer"
        company="Ape Unit GmbH"
        location="Berlin"
        period="2014 — 2018"
        description="Created user-centered designs, conducted user research, and collaborated with developers to implement intuitive interfaces for web and mobile applications."
      />

      <WorkExperienceCard
        role="Intern"
        company="Ape Unit GmbH"
        location="Berlin"
        period="2013 — 2014"
        description="Assisted with design tasks, learned UX/UI principles, and contributed to various client projects while developing professional skills."
      />

      <WorkExperienceCard
        role="Freelance Designer"
        company="Self-employed"
        location="Berlin"
        period="2010 — 2014"
        description="Provided design services to various clients, focusing on visual design, branding, and early web design projects."
      />
    </div>
  )
}