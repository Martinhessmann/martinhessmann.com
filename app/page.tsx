import { promises as fs } from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'

import { ProfessionalHeadline } from '@/components/professional-headline'
import { SocialLinks } from '@/components/social-links'
import { ProjectsShowcase } from '@/components/projects-showcase'
import { WorkTimeline } from '@/components/work-timeline'
import { SectionHeader } from '@/components/section-header'

export default async function Home() {
  const filePath = path.join(process.cwd(), 'content', 'journey.md')
  let content = ''

  try {
    content = await fs.readFile(filePath, 'utf8')
  } catch (error) {
    console.error('Error reading journey.md:', error)
    // Fallback to README.md if journey.md doesn't exist
    const readmePath = path.join(process.cwd(), 'README.md')
    content = await fs.readFile(readmePath, 'utf8')
  }

  return (
    <main className="min-h-screen w-full max-w-3xl mx-auto px-4 py-4 md:py-8 lg:py-16">
      {/* Hero Section */}
      <section className="mb-12 md:mb-16 bg-secondary rounded-lg p-6 md:p-8 shadow-md">
        <ProfessionalHeadline />
        <SocialLinks />
      </section>

      {/* About Section */}
      <section className="mb-12 md:mb-16">
        <SectionHeader
          title="About Me"
          subtitle="A bit about who I am and where I'm from"
          id="about"
        />
        <div className="prose max-w-none bg-secondary rounded-lg p-6 shadow-md">
          <p className="text-base md:text-lg">
            Hey, I'm Martin 👋 I live in Friedrichshain, former East-Berlin, just 500 meters from where my parents first moved in together—back when getting married was the only way the GDR government would allow them to share an apartment.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-12 md:mb-16" id="projects">
        <ProjectsShowcase />
      </section>

      {/* Experience Section */}
      <section className="mb-12 md:mb-16" id="experience">
        <WorkTimeline />
      </section>

      {/* Journey Section */}
      <section>
        <SectionHeader
          title="My Journey"
          subtitle="The story of my professional path"
          id="journey"
        />
        <div className="prose max-w-none bg-secondary rounded-lg p-6 shadow-md">
          <div className="relative w-full h-48 md:h-64 mb-6 rounded-md overflow-hidden">
            <Image
              src="/images/1x1-curious-group-of-people.png"
              alt="My professional journey"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          <MDXRemote
            source={content}
            options={{
              parseFrontmatter: true,
              mdxOptions: {
                development: process.env.NODE_ENV === 'development'
              }
            }}
          />
        </div>
      </section>

      <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-muted-foreground/30 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Martin Heßmann. All rights reserved.</p>
        <p className="mt-2">
          Set in <a href="https://commitmono.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Commit Mono</a> ·
          <a href="https://github.com/Martinhessmann/martinhessmann.com" target="_blank" rel="noopener noreferrer" className="hover:underline ml-1 mr-1">GitHub</a> ·
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Vercel</a>
        </p>
      </footer>
    </main>
  )
}

