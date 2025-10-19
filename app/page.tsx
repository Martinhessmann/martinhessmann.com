import { Resume } from '@/types/resume'
import { Resume as ResumeComponent } from '@/components/resume'

// Load resume data
import resumeData from '@/data/resume.json'

export default function ResumePage() {
  const resume = resumeData as Resume

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <ResumeComponent resume={resume} />
    </main>
  )
}

