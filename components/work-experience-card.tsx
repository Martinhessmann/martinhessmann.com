import Image from 'next/image'

interface WorkExperienceCardProps {
  role: string
  company: string
  location: string
  period: string
  description: string
  imageSrc?: string
}

export function WorkExperienceCard({
  role,
  company,
  location,
  period,
  description,
  imageSrc
}: WorkExperienceCardProps) {
  return (
    <div className="mb-8 bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 md:h-56 w-full">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${role} at ${company}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-lg md:text-xl font-medium mb-1">{role}</h3>
          <p className="text-sm md:text-base text-white/90 font-medium">{company}</p>
          <div className="flex flex-wrap items-center gap-2 mt-1 mb-2">
            <span className="text-xs text-white/80">{location}</span>
            <span className="text-white/60">•</span>
            <span className="text-xs text-white/80">{period}</span>
          </div>
          <p className="text-xs md:text-sm text-white/80 line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  )
}