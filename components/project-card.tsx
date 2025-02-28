import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  title: string
  description: string
  url: string
  technologies?: string
  imageSrc: string
}

export function ProjectCard({ title, description, url, technologies, imageSrc }: ProjectCardProps) {
  return (
    <div className="mb-8 bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 md:h-56 lg:h-64 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-3 text-sm md:text-base">{description}</p>
        {technologies && (
          <p className="text-xs md:text-sm text-muted-foreground mb-3">
            <span className="font-medium">Technologies:</span> {technologies}
          </p>
        )}
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-accent text-white rounded-md text-xs md:text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          Visit {new URL(url).hostname}
        </Link>
      </div>
    </div>
  )
}