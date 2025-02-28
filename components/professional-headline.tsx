import { ProfileImage } from './profile-image'

export function ProfessionalHeadline() {
  return (
    <div className="my-6 md:my-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
      <ProfileImage />
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center md:text-left">
          Digital Product Manager & UX Designer
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center md:text-left">
          I'm Martin Heßmann, a Digital Product Manager with a background in UX/UI Design.
          I help teams create user-centered digital products by bridging the gap between design,
          development, and business needs. With experience in various industries, I focus on
          creating intuitive, accessible, and impactful digital experiences.
        </p>
      </div>
    </div>
  )
}