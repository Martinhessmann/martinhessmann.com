import { Resume } from '@/types/resume'
import { Resume as ResumeComponent } from '@/components/resume'
import { PdfDownloadButton } from '@/components/pdf-download-button'
import { PdfPreview } from '@/components/pdf-preview'

// Load resume data
import resumeData from '@/data/resume.json'

interface PageProps {
  searchParams: Promise<{ preview?: string }> | { preview?: string }
}

export default async function ResumePage({ searchParams }: PageProps) {
  const resume = resumeData as Resume
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams
  const isPdfPreview = resolvedSearchParams?.preview === 'print'

  // Show PDF preview if ?preview=print (client component)
  if (isPdfPreview) {
    return (
      <div suppressHydrationWarning>
        <PdfPreview />
      </div>
    )
  }

  return (
    <>
      <PdfDownloadButton />
      <main className="container mx-auto px-4 py-8 max-w-4xl print:p-0 print:max-w-none">
        <ResumeComponent resume={resume} />
      </main>
    </>
  )
}

