import Image from 'next/image'

interface WorkExperienceCardProps {
  role: string
  company: string
  location: string
  period: string
  description?: string
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
    <div className="mb-8 flex flex-col md:flex-row gap-4 md:gap-6 bg-secondary rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      {imageSrc && (
        <div className="relative w-full md:w-1/3 h-40 md:h-auto rounded-md overflow-hidden">
          <Image
            src={imageSrc}
            alt={`${role} at ${company}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className={imageSrc ? "md:w-2/3" : "w-full"}>
        <div className="font-medium text-base md:text-lg">{role}</div>
        <div className="text-muted-foreground text-sm md:text-base">
          <span className="font-medium">{company}</span> | {location}
        </div>
        <div className="text-xs md:text-sm text-muted-foreground mb-2">{period}</div>
        {description && (
          <p className="text-sm md:text-base mt-2">{description}</p>
        )}
      </div>
    </div>
  )
}