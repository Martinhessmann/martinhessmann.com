import { Resume } from '@/types/resume'
import { Resume as ResumeComponent } from '@/components/resume'
import { PdfDownloadButton } from '@/components/pdf-download-button'
import { PdfPreview } from '@/components/pdf-preview'
import PortfolioPage from '@/components/portfolio-page'
import SlidesPage from '@/components/slides/slides-page'
import { SlidesPreview } from '@/components/slides/slides-preview'
import { buildHiringDeck } from '@/lib/hiring-deck'

// Load resume data
import resumeData from '@/data/resume.json'

interface PageProps {
  searchParams: Promise<{ preview?: string; view?: string }> | { preview?: string; view?: string }
}

export default async function ResumePage({ searchParams }: PageProps) {
  const resume = resumeData as Resume
  const slides = buildHiringDeck(resume)
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams
  const isPdfPreview = resolvedSearchParams?.preview === 'print'
  const isSlidesPreview = resolvedSearchParams?.preview === 'slides'
  const isResumeView = resolvedSearchParams?.view === 'resume'
  const isSlidesView = resolvedSearchParams?.view === 'slides'

  // Show PDF preview if ?preview=print (client component)
  if (isPdfPreview) {
    return (
      <div suppressHydrationWarning>
        <PdfPreview />
      </div>
    )
  }

  if (isSlidesPreview) {
    return (
      <div suppressHydrationWarning>
        <SlidesPreview slides={slides} />
      </div>
    )
  }

  // Show legacy resume view if ?view=resume
  if (isResumeView) {
    return (
      <>
        <PdfDownloadButton />
        <main className="container mx-auto max-w-4xl px-4 py-8 print:max-w-none print:p-0">
          <ResumeComponent resume={resume} />
        </main>
      </>
    )
  }

  if (isSlidesView) {
    return <SlidesPage slides={slides} />
  }

  // Default: Portfolio one-pager
  return <PortfolioPage />
}
