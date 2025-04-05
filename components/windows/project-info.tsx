'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'

export function ProjectInfo() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">About This Project</h1>
          <p className="text-muted-foreground">
            This website transforms a traditional portfolio into a macOS desktop simulation
            with draggable windows, a dock, and other macOS-inspired UI elements.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Development</h2>
            <p className="text-muted-foreground mb-3">
              This project was built with modern web technologies to create an interactive and engaging user experience.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Development Environment</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    Built in Cursor IDE
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    First commit: March 2024
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    Version control with Git/GitHub
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Tech Stack</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    Next.js 14 App Router
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    React 18 and TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    Tailwind CSS for styling
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    Shadcn UI components
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Design Concept</h2>
            <p className="text-muted-foreground mb-3">
              The macOS desktop simulation was created to provide an interactive and engaging way to showcase my work and skills.
              Instead of a traditional portfolio website, visitors can explore different "applications" through a familiar desktop interface.
            </p>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Key Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>Draggable windows with focus management</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>macOS-style dock with application icons</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>Window controls (minimize, maximize, close)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span>Responsive design that works on mobile and desktop</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="https://github.com/martinhessmann/martinhessmann.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              View on GitHub
            </a>
          </Button>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 19.63h20L12 2z" />
              </svg>
              Deployed on Vercel
            </a>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground border-t pt-4 mt-6">
          <p>© {new Date().getFullYear()} Martin Heßmann. All rights reserved.</p>
        </div>
      </div>
    </ScrollArea>
  )
}