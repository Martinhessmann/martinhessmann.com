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
      <div className="print:hidden fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pdf-download-button">
        <button
          disabled
          className="group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-foreground text-background rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 opacity-50 cursor-not-allowed backdrop-blur-sm border border-foreground/10"
        >
          <Download size={18} className="group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium text-sm sm:text-base">Download Resume</span>
        </button>
      </div>
    )
  }

  return (
    <div className="print:hidden fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pdf-download-button">
      <PDFDownloadLink
        document={<ResumePdf resume={resume} />}
        fileName={getFileName()}
        className="group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-foreground text-background rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 no-underline backdrop-blur-sm border border-foreground/10"
      >
        {({ loading }) => (
          <>
            <Download size={18} className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-medium text-sm sm:text-base">
              {loading ? 'Generating...' : 'Download Resume'}
            </span>
          </>
        )}
      </PDFDownloadLink>
    </div>
  )
}

