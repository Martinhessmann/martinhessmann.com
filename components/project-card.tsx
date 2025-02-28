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
    <div className="mb-8 bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 md:h-56 lg:h-64 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-lg md:text-xl font-medium mb-1">{title}</h3>
          <p className="text-xs md:text-sm text-white/80 mb-2 line-clamp-2">{description}</p>
          {technologies && (
            <div className="flex flex-wrap gap-1 mb-3">
              {technologies.split(', ').map((tech) => (
                <span key={tech} className="text-[10px] md:text-xs px-2 py-0.5 bg-white/20 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          )}
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1 bg-primary text-white rounded-md text-xs md:text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Visit {new URL(url).hostname.replace('www.', '')}
          </Link>
        </div>
      </div>
    </div>
  )
}