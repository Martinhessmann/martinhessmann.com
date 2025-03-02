import { ThemeToggle } from '@/components/theme-toggle'
import { HeroAboutSection } from '@/components/hero-about-section'
import { ProjectSuccessStories } from '@/components/project-success-stories'
import { ClientPartnerships } from '@/components/client-partnerships'
import { WebProjectsRepository } from '@/components/web-projects-repository'
import { WorkJourney } from '@/components/work-journey'
import { BlogPostGrid } from '@/components/blog-post-grid'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero + About Section */}
      <HeroAboutSection />

      {/* Project Success Stories Section */}
      <ProjectSuccessStories />

      {/* Client Partnerships */}
      <ClientPartnerships />

      {/* Web Projects Repository */}
      <WebProjectsRepository />

      {/* Journey Section */}
      <WorkJourney />

      {/* Blog Posts */}
      <BlogPostGrid />

      {/* Footer */}
      <footer className="py-8 bg-secondary/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Martin Heßmann. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a
              href="https://github.com/martinhessmann"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Powered by Vercel
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

