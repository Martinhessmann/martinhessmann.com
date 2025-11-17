"use client"

import { useState } from 'react'
import { Download } from 'lucide-react'

export function PdfDownloadButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/pdf')

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to generate PDF' }))
        throw new Error(errorData.error || 'Failed to generate PDF')
      }

      // Get the PDF blob
      const blob = await response.blob()

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'resume.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download PDF')
      console.error('PDF download error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="print:hidden fixed top-4 right-4 z-50 pdf-download-button">
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        aria-label="Download PDF"
      >
        <Download size={16} />
        {isLoading ? 'Generating...' : 'Download PDF'}
      </button>
      {error && (
        <div className="mt-2 text-sm text-destructive bg-destructive/10 p-2 rounded shadow-lg">
          {error}
        </div>
      )}
    </div>
  )
}

