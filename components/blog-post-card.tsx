import Link from 'next/link'
import Image from 'next/image'

interface BlogPostCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
  imageSrc?: string
  emoji?: string
}

export function BlogPostCard({ title, excerpt, date, slug, imageSrc, emoji }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="bg-secondary rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {imageSrc ? (
          <div className="relative h-40 w-full">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : emoji ? (
          <div className="h-40 w-full flex items-center justify-center bg-accent/10 text-5xl">
            {emoji}
          </div>
        ) : null}

        <div className="p-4 md:p-5 flex-grow flex flex-col">
          <div className="text-xs text-muted-foreground mb-2">{date}</div>
          <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{excerpt}</p>
          <div className="mt-auto">
            <span className="text-xs font-medium text-primary group-hover:underline">Read more</span>
          </div>
        </div>
      </div>
    </Link>
  )
}