import { NextRequest, NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import React from 'react'
import { ResumePdf } from '@/components/resume-pdf'
import resumeData from '@/data/resume.json'
import { Resume } from '@/types/resume'

export async function GET(request: NextRequest) {
  try {
    const resume = resumeData as Resume

    // Render PDF to stream
    const stream = await renderToStream(React.createElement(ResumePdf, { resume }))

    // Convert stream to buffer
    const chunks: Uint8Array[] = []
    for await (const chunk of stream) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    // Return PDF with proper headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    })
  } catch (error) {
    console.error('[PDF API] PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

