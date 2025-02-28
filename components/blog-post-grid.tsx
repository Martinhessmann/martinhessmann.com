import Link from 'next/link'
import { SectionHeader } from './section-header'

interface BlogPost {
  slug: string
  title: string
  date: string
  emoji: string
  excerpt: string
}

export function BlogPostGrid() {
  const posts: BlogPost[] = [
    {
      slug: 'getting-started',
      title: 'Getting Started (2010-2014)',
      date: '2010-2014',
      emoji: '🎓',
      excerpt: 'My journey into the world of design and technology, from education to first professional experiences.'
    },
    {
      slug: 'from-design-to-ux',
      title: 'From Design to UX (2013-2018)',
      date: '2013-2018',
      emoji: '🎨',
      excerpt: 'Transitioning from graphic design to user experience design, discovering the power of user-centered approaches.'
    },
    {
      slug: 'art-direction',
      title: '"Art" Direction (2018-2023)',
      date: '2018-2023',
      emoji: '🖌️',
      excerpt: 'Taking on leadership roles in design and product management, guiding teams and shaping digital products.'
    },
    {
      slug: 'ankommen',
      title: '"AN"kommen (2023-Present)',
      date: '2023-Present',
      emoji: '🚀',
      excerpt: 'My current chapter, focusing on product strategy and innovation in the digital landscape.'
    },
    {
      slug: 'side-projects',
      title: 'Side Projects',
      date: 'Ongoing',
      emoji: '🛠️',
      excerpt: 'Personal projects and explorations that keep me learning and growing outside of my main professional work.'
    },
    {
      slug: 'whats-next',
      title: "What's Next?",
      date: 'Future',
      emoji: '🔮',
      excerpt: 'Looking ahead to future opportunities and challenges in the ever-evolving digital product landscape.'
    }
  ]

  return (
    <section id="journey" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="My Journey"
          subtitle="The story of my professional path and key milestones"
          emoji="🗺️"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group"
            >
              <div className="bg-secondary rounded-lg p-6 h-full shadow-md hover:shadow-lg transition-all duration-300 group-hover:translate-y-[-4px]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{post.emoji}</span>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                <div className="mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}