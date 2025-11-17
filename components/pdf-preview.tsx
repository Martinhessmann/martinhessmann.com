"use client"

import { useEffect, useState } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { ResumePdf } from './resume-pdf'
import { Resume } from '@/types/resume'
import resumeData from '@/data/resume.json'

export function PdfPreview() {
  const [mounted, setMounted] = useState(false)
  const resume = resumeData as Resume

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading PDF preview...</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center p-4 z-50">
      <div className="w-full h-full max-w-4xl max-h-[90vh] shadow-2xl">
        <PDFViewer width="100%" height="100%">
          <ResumePdf resume={resume} />
        </PDFViewer>
      </div>
    </div>
  )
}

