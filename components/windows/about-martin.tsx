'use client'

import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

export function AboutMartin() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src="/images/profile.png"
              alt="Martin Heßmann"
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">Martin Heßmann</h1>
            <p className="text-muted-foreground mb-4">
              Digital Product Manager & Design Generalist | From UX to Product Strategy
            </p>
            <div className="flex flex-col space-y-1 text-sm">
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Friedrichshain, Berlin, Germany
              </p>
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                hello@martinhessmann.com
              </p>
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" x2="22" y1="12" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <a href="https://martinhessmann.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  martinhessmann.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">About Me</h2>
            <p className="text-muted-foreground">
              I'm a Digital Product Manager and Design Generalist with a unique journey from UX Design through Frontend Development to Product Management.
              With over a decade in the tech industry, I combine design thinking, technical understanding, and business acumen to create impactful digital experiences.
              Based in Friedrichshain, Berlin, I specialize in bridging the gap between user needs, technical possibilities, and business objectives.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'Product Strategy',
                'UX/UI Design',
                'Design Systems',
                'User Research',
                'Frontend Development',
                'React & Next.js',
                'TypeScript',
                'Performance',
                'Team Leadership'
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Connect</h2>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href="https://github.com/martinhessmann" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-8.3 7.5-4.9.7-.8 1.8-1.7 2.5-2.1z" />
                  </svg>
                  Twitter
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground border-t pt-4 mt-6">
          <p>© {new Date().getFullYear()} Martin Heßmann. All rights reserved.</p>
        </div>
      </div>
    </ScrollArea>
  )
}