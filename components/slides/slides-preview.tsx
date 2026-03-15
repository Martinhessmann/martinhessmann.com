"use client"

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import type { HiringDeckSlide } from '@/lib/hiring-deck'
import { absolutizeDeckSlides } from '@/lib/hiring-deck-assets'
import { SlidesPdf } from '@/components/slides/slides-pdf'

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => ({ default: mod.PDFViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading PDF preview...</div>
      </div>
    ),
  }
)

export function SlidesPreview({ slides }: { slides: HiringDeckSlide[] }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const absoluteSlides = useMemo(() => {
    if (!mounted) return slides
    return absolutizeDeckSlides(slides, window.location.origin)
  }, [mounted, slides])

  if (!mounted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading PDF preview...</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 p-4">
      <div className="h-full max-h-[90vh] w-full max-w-6xl shadow-2xl">
        <PDFViewer width="100%" height="100%">
          <SlidesPdf slides={absoluteSlides} />
        </PDFViewer>
      </div>
    </div>
  )
}
