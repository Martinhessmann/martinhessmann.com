"use client"

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Download } from 'lucide-react'
import type { HiringDeckSlide } from '@/lib/hiring-deck'
import { absolutizeDeckSlides } from '@/lib/hiring-deck-assets'
import { SlidesPdf } from '@/components/slides/slides-pdf'

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
)

interface SlidesDownloadButtonProps {
  slides: HiringDeckSlide[]
  variant?: 'fixed' | 'inline'
}

function getFileName() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `martin-hessmann-slides-${year}-${month}-${day}.pdf`
}

export function SlidesDownloadButton({ slides, variant = 'fixed' }: SlidesDownloadButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const absoluteSlides = useMemo(() => {
    if (!mounted) return slides
    return absolutizeDeckSlides(slides, window.location.origin)
  }, [mounted, slides])

  const wrapperClass =
    variant === 'fixed'
      ? 'print:hidden fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6'
      : 'print:hidden'

  const buttonClass =
    variant === 'fixed'
      ? 'group inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground px-4 py-2.5 text-background shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl no-underline sm:px-5 sm:py-3'
      : 'group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/[0.14] no-underline'

  const loadingButtonClass =
    variant === 'fixed'
      ? 'group inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-foreground/10 bg-foreground px-4 py-2.5 text-background opacity-50 shadow-xl sm:px-5 sm:py-3'
      : 'group inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white/60 opacity-70 no-underline'

  if (!mounted) {
    return (
      <div className={wrapperClass}>
        <button disabled className={loadingButtonClass}>
          <Download size={18} />
          <span>{variant === 'fixed' ? 'Download Slides' : 'Download PDF'}</span>
        </button>
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      <PDFDownloadLink
        document={<SlidesPdf slides={absoluteSlides} />}
        fileName={getFileName()}
        className={buttonClass}
      >
        {({ loading }) => (
          <>
            <Download size={18} className="transition-transform duration-300 group-hover:scale-110" />
            <span>{loading ? 'Generating...' : variant === 'fixed' ? 'Download Slides' : 'Download PDF'}</span>
          </>
        )}
      </PDFDownloadLink>
    </div>
  )
}
