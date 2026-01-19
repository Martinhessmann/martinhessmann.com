import { Resume } from '@/types/resume'
import { Resume as ResumeComponent } from '@/components/resume'
import { PdfDownloadButton } from '@/components/pdf-download-button'
import { PdfPreview } from '@/components/pdf-preview'
import {
  Section01About,
  Section02TeamBank,
  Section03DPF,
  Section04OpenWonder,
  Section05WoMoFonds,
  Section06GrunBerlin,
  Section09Resume,
  Section10Footer
} from '@/components/sections'

// Load resume data
import resumeData from '@/data/resume.json'

interface PageProps {
  searchParams: Promise<{ preview?: string; view?: string }> | { preview?: string; view?: string }
}

export default async function ResumePage({ searchParams }: PageProps) {
  const resume = resumeData as Resume
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams
  const isPdfPreview = resolvedSearchParams?.preview === 'print'
  const isResumeView = resolvedSearchParams?.view === 'resume'

  // Show PDF preview if ?preview=print (client component)
  if (isPdfPreview) {
    return (
      <div suppressHydrationWarning>
        <PdfPreview />
      </div>
    )
  }

  // Show legacy resume view if ?view=resume
  if (isResumeView) {
    return (
      <>
        <PdfDownloadButton />
        <main className="container mx-auto px-4 py-8 max-w-4xl print:p-0 print:max-w-none">
          <ResumeComponent resume={resume} />
        </main>
      </>
    )
  }

  // Default: New one-pager design
  return (
    <main className="min-h-screen bg-[#f4f2ee]">
      <Section01About />
      <Section02TeamBank />
      <Section03DPF />
      <Section04OpenWonder />
      <Section05WoMoFonds />
      <Section06GrunBerlin />
      <Section09Resume work={resume.work ?? []} />
      <Section10Footer />
    </main>
  )
}
