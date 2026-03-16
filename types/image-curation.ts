export interface DraftSectionImage {
  src: string
  alt: string
  draftCaption?: string
  sortOrder: number
  enabled: boolean
}

export interface DraftSectionEntry {
  realmId: string
  sectionSlug: string
  images: DraftSectionImage[]
  heroImageSrc?: string
  updatedAt?: string
}

export interface ImageCurationDraftStore {
  entries: DraftSectionEntry[]
  updatedAt?: string | null
}
