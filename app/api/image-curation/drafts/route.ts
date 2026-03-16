import { NextRequest, NextResponse } from 'next/server'
import { isLocalCurationEnabled, readImageCurationDraftStore, saveDraftSectionEntry } from '@/lib/image-curation-drafts'
import type { DraftSectionEntry } from '@/types/image-curation'

export const runtime = 'nodejs'

export async function GET() {
  const store = await readImageCurationDraftStore()
  return NextResponse.json({
    local: isLocalCurationEnabled(),
    store,
  })
}

export async function POST(request: NextRequest) {
  if (!isLocalCurationEnabled()) {
    return NextResponse.json(
      {
        error: 'Draft editing is disabled outside local development.',
      },
      { status: 403 }
    )
  }

  try {
    const entry = (await request.json()) as DraftSectionEntry
    const savedEntry = await saveDraftSectionEntry(entry)
    return NextResponse.json({ entry: savedEntry })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unable to save draft entry.',
      },
      { status: 400 }
    )
  }
}
