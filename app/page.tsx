import { MacAppBar } from '@/components/mac-app-bar'
import { ProfessionalHeadline } from '@/components/professional-headline'
import { SocialLinks } from '@/components/social-links'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { ProjectSlider } from '@/components/project-slider'
import { WorkTimeline } from '@/components/work-timeline'
import { BlogPostGrid } from '@/components/blog-post-grid'
import { ThemeToggle } from '@/components/theme-toggle'
import { ClientProjectsShowcase } from '@/components/client-projects-showcase'
import { ProjectMilestones } from '@/components/project-milestones'
import { SafariSuggestions } from '@/components/safari-suggestions'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-8 pb-16 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <MacAppBar />
            <div className="bg-secondary rounded-b-lg p-6 md:p-8 shadow-md">
              <ProfessionalHeadline />
              <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                <SocialLinks />
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectSlider />

      {/* Client Projects Showcase */}
      <ClientProjectsShowcase />

      {/* Client Websites Safari Style */}
      <SafariSuggestions />

      {/* Project Milestones */}
      <ProjectMilestones />

      {/* Experience Section */}
      <WorkTimeline />

      {/* Journey Section */}
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

