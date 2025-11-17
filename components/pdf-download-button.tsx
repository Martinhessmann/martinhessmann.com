"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Download } from 'lucide-react'
import { ResumePdf } from './resume-pdf'
import { Resume } from '@/types/resume'
import resumeData from '@/data/resume.json'

// Dynamically import PDFDownloadLink to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
)

export function PdfDownloadButton() {
  const [mounted, setMounted] = useState(false)
  const resume = resumeData as Resume

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate filename with current date
  const getFileName = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `martin-hessmann-resume-${year}-${month}-${day}.pdf`
  }

  if (!mounted) {
    return (
      <div className="print:hidden fixed top-4 right-4 z-50 pdf-download-button">
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg opacity-50 cursor-not-allowed shadow-lg"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>
    )
  }

  return (
    <div className="print:hidden fixed top-4 right-4 z-50 pdf-download-button">
      <PDFDownloadLink
        document={<ResumePdf resume={resume} />}
        fileName={getFileName()}
        className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors shadow-lg no-underline"
      >
        {({ loading }) => (
          <>
            <Download size={16} />
            {loading ? 'Generating...' : 'Download PDF'}
          </>
        )}
      </PDFDownloadLink>
    </div>
  )
}

