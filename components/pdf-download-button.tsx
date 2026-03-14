"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Download } from 'lucide-react'
import { ResumePdf } from './resume-pdf'
import { Resume } from '@/types/resume'
import resumeData from '@/data/resume.json'

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
)

interface PdfDownloadButtonProps {
  variant?: 'fixed' | 'inline'
}

export function PdfDownloadButton({ variant = 'fixed' }: PdfDownloadButtonProps) {
  const [mounted, setMounted] = useState(false)
  const resume = resumeData as Resume

  useEffect(() => {
    setMounted(true)
  }, [])

  const getFileName = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `martin-hessmann-resume-${year}-${month}-${day}.pdf`
  }

  const wrapperClass =
    variant === 'fixed'
      ? 'print:hidden fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pdf-download-button'
      : 'print:hidden'

  const buttonClass =
    variant === 'fixed'
      ? 'group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-foreground text-background rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 no-underline backdrop-blur-sm border border-foreground/10'
      : 'group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/[0.14] no-underline'

  const loadingButtonClass =
    variant === 'fixed'
      ? 'group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-foreground text-background rounded-full shadow-xl transition-all duration-300 opacity-50 cursor-not-allowed backdrop-blur-sm border border-foreground/10'
      : 'group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white/60 opacity-70 cursor-not-allowed no-underline'

  if (!mounted) {
    return (
      <div className={wrapperClass}>
        <button disabled className={loadingButtonClass}>
          <Download size={18} className="transition-transform duration-300" />
          <span>{variant === 'fixed' ? 'Download Resume' : 'Download PDF'}</span>
        </button>
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      <PDFDownloadLink
        document={<ResumePdf resume={resume} />}
        fileName={getFileName()}
        className={buttonClass}
      >
        {({ loading }) => (
          <>
            <Download size={18} className="group-hover:scale-110 transition-transform duration-300" />
            <span>{loading ? 'Generating...' : variant === 'fixed' ? 'Download Resume' : 'Download PDF'}</span>
          </>
        )}
      </PDFDownloadLink>
    </div>
  )
}
