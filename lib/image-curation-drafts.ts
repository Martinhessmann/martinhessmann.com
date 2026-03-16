import 'server-only'

import { access, mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { CLIENT_REALMS } from '@/data/clients'
import {
  getAllowedSectionSlugs,
  hydrateDraftSectionEntry,
  humanizeFileStem,
  sortDraftImages,
  toSectionSlug,
} from '@/lib/image-curation-shared'
import type { DraftSectionEntry, DraftSectionImage, ImageCurationDraftStore } from '@/types/image-curation'

const ROOT_DIR = process.cwd()
const DRAFTS_PATH = path.join(ROOT_DIR, 'data/portfolio-drafts/image-curation-drafts.json')
const CLIENT_IMAGE_ROOT = path.join(ROOT_DIR, 'public/images/projects/clients')

export function isLocalCurationEnabled() {
  return process.env.VERCEL !== '1'
}

function emptyDraftStore(): ImageCurationDraftStore {
  return {
    entries: [],
    updatedAt: null,
  }
}

function normalizeStore(store: ImageCurationDraftStore): ImageCurationDraftStore {
  return {
    updatedAt: store.updatedAt ?? null,
    entries: (store.entries ?? []).map((entry) => ({
      ...entry,
      images: sortDraftImages(entry.images ?? []).map((image, index) => ({
        ...image,
        sortOrder: index,
      })),
    })),
  }
}

export async function readImageCurationDraftStore() {
  try {
    const raw = await readFile(DRAFTS_PATH, 'utf8')
    return normalizeStore(JSON.parse(raw) as ImageCurationDraftStore)
  } catch {
    return emptyDraftStore()
  }
}

export async function writeImageCurationDraftStore(store: ImageCurationDraftStore) {
  const nextStore = normalizeStore({
    ...store,
    updatedAt: new Date().toISOString(),
  })
  await writeFile(DRAFTS_PATH, `${JSON.stringify(nextStore, null, 2)}\n`, 'utf8')
  return nextStore
}

function getRealm(realmId: string) {
  return CLIENT_REALMS.find((realm) => realm.id === realmId) ?? null
}

function assertValidRealmAndSection(realmId: string, sectionSlug: string) {
  const realm = getRealm(realmId)
  if (!realm) {
    throw new Error(`Unknown realm "${realmId}"`)
  }

  const normalizedSectionSlug = toSectionSlug(sectionSlug)
  if (!getAllowedSectionSlugs(realm).includes(normalizedSectionSlug)) {
    throw new Error(`Unknown section "${sectionSlug}" for realm "${realmId}"`)
  }

  return {
    realm,
    sectionSlug: normalizedSectionSlug,
  }
}

function getTargetDirectory(realmId: string, sectionSlug: string) {
  return path.join(CLIENT_IMAGE_ROOT, realmId, sectionSlug)
}

async function ensureUniquePath(targetPath: string) {
  const extension = path.extname(targetPath)
  const stem = targetPath.slice(0, -extension.length)

  let candidatePath = targetPath
  let suffix = 2

  while (true) {
    try {
      await access(candidatePath)
      candidatePath = `${stem}-${suffix}${extension}`
      suffix += 1
    } catch {
      return candidatePath
    }
  }
}

function sanitizeFileStem(value: string) {
  return (
    value
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'image'
  )
}

function normalizeExtension(fileName: string, mimeType: string) {
  const fromName = path.extname(fileName).toLowerCase()
  if (fromName === '.jpg' || fromName === '.jpeg' || fromName === '.png' || fromName === '.webp') {
    return fromName === '.jpeg' ? '.jpg' : fromName
  }

  if (mimeType === 'image/png') return '.png'
  if (mimeType === 'image/webp') return '.webp'
  return '.jpg'
}

export async function saveUploadedSectionImage(input: {
  realmId: string
  sectionSlug: string
  file: File
}) {
  const { realm, sectionSlug } = assertValidRealmAndSection(input.realmId, input.sectionSlug)
  const file = input.file

  if (!file.type.startsWith('image/')) {
    throw new Error('Only image uploads are supported')
  }

  const directory = getTargetDirectory(realm.id, sectionSlug)
  await mkdir(directory, { recursive: true })

  const extension = normalizeExtension(file.name, file.type)
  const baseName = sanitizeFileStem(file.name)
  const uniquePath = await ensureUniquePath(path.join(directory, `${baseName}${extension}`))
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(uniquePath, buffer)

  const publicSrc = uniquePath.replace(path.join(ROOT_DIR, 'public'), '').split(path.sep).join('/')
  const store = await readImageCurationDraftStore()
  const draftEntry = hydrateDraftSectionEntry(realm, sectionSlug, store)
  const nextImages: DraftSectionImage[] = [
    ...draftEntry.images,
    {
      src: publicSrc,
      alt: humanizeFileStem(file.name),
      draftCaption: '',
      sortOrder: draftEntry.images.length,
      enabled: true,
    },
  ]

  const nextEntry: DraftSectionEntry = {
    ...draftEntry,
    images: nextImages.map((image, index) => ({
      ...image,
      sortOrder: index,
    })),
    heroImageSrc: draftEntry.heroImageSrc ?? publicSrc,
    updatedAt: new Date().toISOString(),
  }

  const otherEntries = store.entries.filter(
    (entry) => !(entry.realmId === realm.id && entry.sectionSlug === sectionSlug)
  )

  const nextStore = await writeImageCurationDraftStore({
    ...store,
    entries: [...otherEntries, nextEntry],
  })

  return {
    entry: nextStore.entries.find((entry) => entry.realmId === realm.id && entry.sectionSlug === sectionSlug)!,
    src: publicSrc,
  }
}

export async function saveDraftSectionEntry(entry: DraftSectionEntry) {
  const { realm, sectionSlug } = assertValidRealmAndSection(entry.realmId, entry.sectionSlug)
  const store = await readImageCurationDraftStore()

  const nextEntry: DraftSectionEntry = {
    realmId: realm.id,
    sectionSlug,
    heroImageSrc: entry.heroImageSrc,
    updatedAt: new Date().toISOString(),
    images: sortDraftImages(entry.images ?? []).map((image, index) => ({
      src: image.src,
      alt: image.alt,
      draftCaption: image.draftCaption ?? '',
      enabled: image.enabled !== false,
      sortOrder: index,
    })),
  }

  const otherEntries = store.entries.filter(
    (item) => !(item.realmId === realm.id && item.sectionSlug === sectionSlug)
  )

  const nextStore = await writeImageCurationDraftStore({
    ...store,
    entries: [...otherEntries, nextEntry],
  })

  return nextStore.entries.find((item) => item.realmId === realm.id && item.sectionSlug === sectionSlug)!
}
