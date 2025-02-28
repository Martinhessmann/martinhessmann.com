import { ProfileImage } from './profile-image'

export function ProfessionalHeadline() {
  return (
    <div className="my-6 md:my-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
      <ProfileImage />
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center md:text-left">
          Product Generalist
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center md:text-left">
          I'm Martin Heßmann, a Product Generalist who bridges the gap between design,
          development, and business needs. I'm neither exclusively a PM, Developer, nor Designer—but
          a blend of all three, helping teams create intuitive, accessible, and impactful
          digital experiences.
        </p>
      </div>
    </div>
  )
}