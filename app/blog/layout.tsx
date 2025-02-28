import type { Metadata } from 'next'
import Link from 'next/link'
import { MacAppBar } from '@/components/mac-app-bar'

export const metadata: Metadata = {
  title: 'Blog | Martin Heßmann',
  description: 'Thoughts and stories from my professional journey',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

          <MacAppBar />
          <div className="bg-secondary rounded-b-lg p-6 md:p-8 shadow-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}