import { Resume } from '@/types/resume'
import { Resume as ResumeComponent } from '@/components/resume'
import { PdfDownloadButton } from '@/components/pdf-download-button'

// Load resume data
import resumeData from '@/data/resume.json'

export default function ResumePage() {
  const resume = resumeData as Resume

  return (
    <>
      <PdfDownloadButton />
      <main className="container mx-auto px-4 py-8 max-w-4xl print:p-0 print:max-w-none">
        <ResumeComponent resume={resume} />
      </main>
    </>
  )
}

