import type { ClientRealm } from '@/data/clients'
import { flattenVisuals, parseStoryIntoSections, type ProjectSection } from '@/lib/client-story'
import type { DraftSectionEntry, DraftSectionImage, ImageCurationDraftStore } from '@/types/image-curation'

export interface CurationImage {
  src: string
  alt: string
  caption?: string
}

function normalizeWhitespace(value: string) {
  return value.trim().toLowerCase()
}

export function toSectionSlug(value: string) {
  return normalizeWhitespace(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function buildSectionKey(realmId: string, sectionSlug: string) {
  return `${realmId}::${sectionSlug}`
}

export function getDraftSectionEntry(
  store: ImageCurationDraftStore | null | undefined,
  realmId: string,
  sectionSlug: string
) {
  return store?.entries.find((entry) => entry.realmId === realmId && entry.sectionSlug === sectionSlug)
}

export function sortDraftImages(images: DraftSectionImage[]) {
  return [...images].sort((a, b) => a.sortOrder - b.sortOrder)
}

export function toDraftSectionImages(images: CurationImage[]): DraftSectionImage[] {
  return images.map((image, index) => ({
    src: image.src,
    alt: image.alt,
    draftCaption: image.caption,
    sortOrder: index,
    enabled: true,
  }))
}

export function draftImagesToCurationImages(images: DraftSectionImage[]): CurationImage[] {
  return sortDraftImages(images)
    .filter((image) => image.enabled)
    .map((image) => ({
      src: image.src,
      alt: image.alt,
      caption: image.draftCaption,
    }))
}

export function getCanonicalSectionImages(realm: ClientRealm, sectionSlug: string): CurationImage[] {
  if (sectionSlug === 'cover') {
    return realm.moodImage
      ? [
          {
            src: realm.moodImage,
            alt: realm.displayName,
            caption: realm.sidebar.openingNarrative,
          },
        ]
      : []
  }

  const section = parseStoryIntoSections(realm.story).find((entry) => toSectionSlug(entry.title) === sectionSlug)
  if (!section) return []

  return flattenVisuals(section.visuals).map((image) => ({
    src: image.src,
    alt: image.alt,
    caption: image.caption,
  }))
}

export function getAllowedSectionSlugs(realm: ClientRealm) {
  return ['cover', ...parseStoryIntoSections(realm.story).map((section) => toSectionSlug(section.title))]
}

export function hydrateDraftSectionEntry(
  realm: ClientRealm,
  sectionSlug: string,
  store?: ImageCurationDraftStore | null
): DraftSectionEntry {
  const existing = getDraftSectionEntry(store, realm.id, sectionSlug)
  if (existing) {
    return {
      ...existing,
      images: sortDraftImages(existing.images).map((image, index) => ({
        ...image,
        sortOrder: index,
      })),
    }
  }

  const canonicalImages = toDraftSectionImages(getCanonicalSectionImages(realm, sectionSlug))

  return {
    realmId: realm.id,
    sectionSlug,
    images: canonicalImages,
    heroImageSrc: canonicalImages[0]?.src,
  }
}

export function resolveSectionImagePool(
  realm: ClientRealm,
  sectionSlug: string,
  store?: ImageCurationDraftStore | null
) {
  const draftEntry = getDraftSectionEntry(store, realm.id, sectionSlug)
  const availableImages = draftEntry
    ? draftImagesToCurationImages(draftEntry.images)
    : getCanonicalSectionImages(realm, sectionSlug)

  const heroImage =
    availableImages.find((image) => image.src === draftEntry?.heroImageSrc) ??
    availableImages[0]

  return {
    availableImages,
    heroImage,
    draftEntry,
  }
}

export function buildDraftAwareSections(
  realm: ClientRealm,
  store?: ImageCurationDraftStore | null
): ProjectSection[] {
  return parseStoryIntoSections(realm.story).map((section) => {
    const sectionSlug = toSectionSlug(section.title)
    const { draftEntry, availableImages } = resolveSectionImagePool(realm, sectionSlug, store)

    if (!draftEntry) {
      return section
    }

    return {
      ...section,
      visuals:
        availableImages.length > 0
          ? [
              {
                type: 'gallery' as const,
                images: availableImages.map((image) => ({
                  src: image.src,
                  alt: image.alt,
                  caption: image.caption ?? '',
                })),
              },
            ]
          : [],
    }
  })
}

export function getDraftAwareMoodImage(realm: ClientRealm, store?: ImageCurationDraftStore | null) {
  return resolveSectionImagePool(realm, 'cover', store).heroImage?.src ?? realm.moodImage
}

export function humanizeFileStem(value: string) {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
