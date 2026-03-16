import { NextRequest, NextResponse } from 'next/server'
import { isLocalCurationEnabled, saveUploadedSectionImage } from '@/lib/image-curation-drafts'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (!isLocalCurationEnabled()) {
    return NextResponse.json(
      {
        error: 'Image uploads are disabled outside local development.',
      },
      { status: 403 }
    )
  }

  try {
    const formData = await request.formData()
    const realmId = String(formData.get('realmId') ?? '')
    const sectionSlug = String(formData.get('sectionSlug') ?? '')
    const files = formData.getAll('files').filter((item): item is File => item instanceof File)

    if (!realmId || !sectionSlug || files.length === 0) {
      return NextResponse.json(
        {
          error: 'Missing realm, section, or files.',
        },
        { status: 400 }
      )
    }

    let lastEntry = null
    const uploaded: { src: string }[] = []

    for (const file of files) {
      const result = await saveUploadedSectionImage({
        realmId,
        sectionSlug,
        file,
      })

      lastEntry = result.entry
      uploaded.push({ src: result.src })
    }

    return NextResponse.json({
      uploaded,
      entry: lastEntry,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to upload files.',
      },
      { status: 400 }
    )
  }
}
