'use client'

import { useState, type ReactNode } from 'react'
import type {
  CapabilityCard,
  CaseDetailSlide,
  CaseIntroSlide,
  ContactSlide,
  CoverSlide,
  HiringDeckSlide,
  ProfileSlide,
  SlideImage,
  SlideMetaItem,
  UspSlide,
  WorkExperienceSlide,
} from '@/lib/hiring-deck'
import { SlidesDownloadButton } from '@/components/slides/slides-download-button'
import { SlideCurationPanel } from '@/components/slides/slide-curation-panel'
import type { DraftSectionEntry, DraftSectionImage } from '@/types/image-curation'

const SHELL_BORDER = 'var(--portfolio-sand-2)'
const SHELL_BG = 'var(--portfolio-sand-0)'
const SHELL_TEXT = 'var(--portfolio-ink-0)'
const SHELL_TEXT_SOFT = 'var(--portfolio-ink-1)'
const MIDNIGHT = 'var(--portfolio-midnight-950)'

interface EditableSectionState {
  realmId: string
  sectionSlug: string
  images: DraftSectionImage[]
  heroImageSrc?: string
  status?: string
}

type EditableCaseSlide = (CaseIntroSlide | CaseDetailSlide) & {
  editableSection: NonNullable<CaseIntroSlide['editableSection']>
}

function isEditableCaseSlide(slide: HiringDeckSlide): slide is EditableCaseSlide {
  return (slide.kind === 'caseIntro' || slide.kind === 'caseDetail') && Boolean(slide.editableSection)
}

function getSlideSectionKey(slide: HiringDeckSlide) {
  if (!isEditableCaseSlide(slide)) return null

  return `${slide.editableSection.realmId}::${slide.editableSection.sectionSlug}`
}

function toDraftImages(images: SlideImage[]): DraftSectionImage[] {
  return images.map((image, index) => ({
    src: image.src,
    alt: image.alt,
    draftCaption: image.caption ?? '',
    enabled: true,
    sortOrder: index,
  }))
}

function buildInitialEditableSections(slides: HiringDeckSlide[]) {
  const entries: Record<string, EditableSectionState> = {}

  for (const slide of slides) {
    if (!isEditableCaseSlide(slide)) continue

    const key = getSlideSectionKey(slide)
    if (!key || entries[key]) continue

    entries[key] = {
      realmId: slide.editableSection.realmId,
      sectionSlug: slide.editableSection.sectionSlug,
      heroImageSrc: slide.editableSection.heroImageSrc ?? slide.editableSection.availableImages[0]?.src,
      images: toDraftImages(slide.editableSection.availableImages),
    }
  }

  return entries
}

function findHeroImage(entry: EditableSectionState | undefined, fallback: SlideImage[]) {
  if (!entry) return fallback[0]

  const visibleImages = entry.images
    .filter((image) => image.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder)
  const hero =
    visibleImages.find((image) => image.src === entry.heroImageSrc) ??
    visibleImages[0]

  if (!hero) return fallback[0]

  return {
    src: hero.src,
    alt: hero.alt,
    caption: hero.draftCaption,
  }
}

function applyDraftStateToSlides(
  slides: HiringDeckSlide[],
  editableSections: Record<string, EditableSectionState>
) {
  return slides.map((slide) => {
    if (!isEditableCaseSlide(slide)) return slide

    const key = getSlideSectionKey(slide)
    if (!key) return slide

    const entry = editableSections[key]
    if (!entry) return slide

    const heroImage = findHeroImage(entry, slide.images)
    const availableImages = entry.images
      .filter((image) => image.enabled)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((image) => ({
        src: image.src,
        alt: image.alt,
        caption: image.draftCaption,
      }))

    return {
      ...slide,
      images: heroImage ? [heroImage] : slide.images,
      editableSection: slide.editableSection
        ? {
            ...slide.editableSection,
            availableImages,
            heroImageSrc: entry.heroImageSrc,
          }
        : slide.editableSection,
    }
  })
}

function SlideLabel({ label }: { label: string; accent?: string }) {
  return (
    <span
      className="inline-flex w-fit items-center rounded-full text-[11px] font-medium uppercase tracking-[0.22em] sm:text-[12px]"
      style={{ color: 'var(--accent-foreground)' }}
    >
      {label}
    </span>
  )
}

function BubbleCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[28px] border bg-white/90 p-5 ${className}`}
      style={{ borderColor: 'rgba(35, 33, 30, 0.08)' }}
    >
      {children}
    </div>
  )
}

function ImageCard({
  image,
  className = '',
  objectFit = 'cover',
}: {
  image: SlideImage
  className?: string
  objectFit?: 'cover' | 'contain'
}) {
  return (
    <figure className={`overflow-hidden rounded-[28px] border bg-white/85 ${className}`} style={{ borderColor: 'rgba(35, 33, 30, 0.08)' }}>
      <div className="relative bg-[rgba(255,255,255,0.75)]">
        <img
          src={image.src}
          alt={image.alt}
          className={`h-full w-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      </div>
      {image.caption && (
        <figcaption className="border-t px-4 py-3 text-[12px] leading-[1.5] sm:text-[13px]" style={{ borderColor: 'rgba(35, 33, 30, 0.08)', color: SHELL_TEXT_SOFT }}>
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

function MetaGrid({ items }: { items: SlideMetaItem[] }) {
  if (items.length === 0) return null

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <BubbleCard key={item.label} className="min-h-[150px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
            {item.label}
          </p>
          <div className="mt-3 space-y-2 text-[15px] leading-[1.45] sm:text-[16px]" style={{ color: SHELL_TEXT }}>
            {item.values.map((value, index) => {
              const href = item.hrefs?.[index]
              return href ? (
                <a key={`${item.label}-${value}`} href={href} target="_blank" rel="noopener noreferrer" className="block underline decoration-[rgba(35,33,30,0.18)] underline-offset-4">
                  {value}
                </a>
              ) : (
                <p key={`${item.label}-${value}`}>{value}</p>
              )
            })}
          </div>
        </BubbleCard>
      ))}
    </div>
  )
}

function ImageGrid({ images }: { images: SlideImage[] }) {
  if (images.length === 0) return null

  if (images.length === 1) {
    return <ImageCard image={images[0]} className="h-full min-h-[320px]" objectFit="contain" />
  }

  if (images.length === 2) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {images.map((image) => (
          <ImageCard key={`${image.src}-${image.caption ?? image.alt}`} image={image} className="min-h-[280px]" objectFit="contain" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ImageCard image={images[0]} className="min-h-[300px] lg:min-h-[420px]" objectFit="contain" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {images.slice(1, 3).map((image) => (
          <ImageCard key={`${image.src}-${image.caption ?? image.alt}`} image={image} className="min-h-[220px]" objectFit="contain" />
        ))}
      </div>
      {images.length > 3 && (
        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {images.slice(3).map((image) => (
              <ImageCard key={`${image.src}-${image.caption ?? image.alt}`} image={image} className="min-h-[220px]" objectFit="contain" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CapabilityGrid({ capabilities }: { capabilities: CapabilityCard[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {capabilities.map((capability) => (
        <BubbleCard key={capability.title}>
          <h3 className="font-hedvig text-[22px] leading-[1.1]" style={{ color: SHELL_TEXT }}>
            {capability.title}
          </h3>
          <p className="mt-3 text-[14px] leading-[1.6] sm:text-[15px]" style={{ color: SHELL_TEXT_SOFT }}>
            {capability.description}
          </p>
        </BubbleCard>
      ))}
    </div>
  )
}

function LogoStrip({ logos }: { logos: ProfileSlide['logos'] }) {
  if (logos.length === 0) return null

  return (
    <BubbleCard>
      <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
        Selected organisations
      </p>
      <div className="mt-5 grid grid-cols-3 gap-4 sm:grid-cols-4">
        {logos.map((logo) => (
          <div key={logo.id} className="flex min-h-[80px] items-center justify-center rounded-[22px] bg-white/70 px-3 py-4">
            <img src={logo.src} alt={logo.name} className="max-h-10 w-auto object-contain opacity-80" />
          </div>
        ))}
      </div>
    </BubbleCard>
  )
}

function SlideShell({
  accent,
  label,
  children,
  footer,
}: {
  accent: string
  label: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <section className="snap-start px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1480px]">
        <div
          className="relative overflow-hidden rounded-[36px] border p-5 shadow-[0_28px_120px_rgba(24,24,35,0.25)] sm:p-8 lg:aspect-[16/9] lg:p-10 xl:p-12"
          style={{ backgroundColor: SHELL_BG, borderColor: SHELL_BORDER, color: SHELL_TEXT }}
        >
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full opacity-20" style={{ backgroundColor: accent }} />
          <div className="pointer-events-none absolute -right-12 top-0 h-2 w-52 rounded-b-full opacity-90" style={{ backgroundColor: accent }} />
          <div className="relative z-10 flex h-full flex-col">
            <SlideLabel label={label} accent={MIDNIGHT} />
            <div className="mt-5 flex-1">{children}</div>
          </div>
        </div>
        {footer ? <div className="mt-4">{footer}</div> : null}
      </div>
    </section>
  )
}

function renderCover(slide: CoverSlide) {
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="flex min-w-0 flex-col gap-4">
        <BubbleCard className="max-w-3xl">
          <h1 className="font-hedvig text-[clamp(40px,4.6vw,86px)] leading-[0.95]" style={{ color: SHELL_TEXT }}>
            {slide.title}
          </h1>
        </BubbleCard>
        <div className="grid gap-3 sm:grid-cols-3">
          {slide.factCards.map((fact) => (
            <BubbleCard key={fact.label}>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
                {fact.label}
              </p>
              <p className="mt-3 text-[18px] leading-[1.25] sm:text-[20px]" style={{ color: SHELL_TEXT }}>
                {fact.value}
              </p>
            </BubbleCard>
          ))}
        </div>
        <BubbleCard className="max-w-4xl">
          <p className="text-[17px] leading-[1.7] sm:text-[19px]" style={{ color: SHELL_TEXT }}>
            {slide.paragraph}
          </p>
        </BubbleCard>
      </div>
      <div className="min-h-[320px]">
        <ImageCard image={slide.images[0]} className="h-full min-h-[320px]" />
      </div>
    </div>
  )
}

function formatPeriod(startDate?: string, endDate?: string) {
  if (!startDate) return ''
  const startYear = startDate.slice(0, 4)
  const endYear = endDate ? endDate.slice(0, 4) : 'today'
  return startYear === endYear ? startYear : `${startYear}–${endYear}`
}

function renderUsp(slide: UspSlide) {
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <BubbleCard>
          <h2 className="font-hedvig text-[clamp(32px,3.6vw,64px)] leading-[1.02]" style={{ color: SHELL_TEXT }}>
            {slide.title}
          </h2>
        </BubbleCard>
        <BubbleCard>
          <p className="text-[16px] leading-[1.7] sm:text-[18px]" style={{ color: SHELL_TEXT }}>
            {slide.paragraph}
          </p>
        </BubbleCard>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {slide.pillars.map((pillar, index) => (
          <BubbleCard key={pillar.title} className={index === 1 ? 'lg:translate-y-6' : ''}>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
              Theme {index + 1}
            </p>
            <h3 className="mt-3 font-hedvig text-[28px] leading-[1.05]" style={{ color: SHELL_TEXT }}>
              {pillar.title}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.6] sm:text-[16px]" style={{ color: SHELL_TEXT_SOFT }}>
              {pillar.description}
            </p>
          </BubbleCard>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {slide.images.map((image) => (
          <ImageCard key={image.src} image={image} className="min-h-[210px]" />
        ))}
      </div>
    </div>
  )
}

function renderWorkExperience(slide: WorkExperienceSlide) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto">
      <div className="grid gap-4 sm:grid-cols-2">
        {slide.entries.map((entry) => (
          <BubbleCard key={`${entry.name}-${entry.startDate}`} className="flex flex-col">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-hedvig text-[22px] leading-[1.15] sm:text-[24px]" style={{ color: SHELL_TEXT }}>
                {entry.position}
              </h3>
              <p className="text-[12px] font-medium tracking-[0.08em]" style={{ color: SHELL_TEXT_SOFT }}>
                {formatPeriod(entry.startDate, entry.endDate)}
              </p>
            </div>
            <p className="mt-1 text-[14px] font-medium" style={{ color: SHELL_TEXT_SOFT }}>
              {entry.name}
            </p>
            <p className="mt-3 text-[14px] leading-[1.6] sm:text-[15px]" style={{ color: SHELL_TEXT }}>
              {entry.summary}
            </p>
            {entry.highlights.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {entry.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[13px] leading-[1.55] sm:text-[14px]" style={{ color: SHELL_TEXT_SOFT }}>
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: SHELL_TEXT_SOFT }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </BubbleCard>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {slide.images.map((image) => (
          <ImageCard key={image.src} image={image} className="min-h-[160px]" />
        ))}
      </div>
    </div>
  )
}

function renderCaseIntro(slide: CaseIntroSlide) {
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="flex min-w-0 flex-col gap-4">
        <BubbleCard className="max-w-3xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: slide.theme.label }}>
                {slide.accountLine}
              </p>
              <h2 className="mt-3 font-hedvig text-[clamp(32px,3.7vw,62px)] leading-[1.03]" style={{ color: SHELL_TEXT }}>
                {slide.title}
              </h2>
            </div>
            {slide.logo ? <img src={slide.logo} alt={slide.realmName} className="h-10 w-auto object-contain opacity-65" /> : null}
          </div>
        </BubbleCard>
        <BubbleCard>
          <p className="text-[16px] leading-[1.7] sm:text-[18px]" style={{ color: SHELL_TEXT }}>
            {slide.paragraph}
          </p>
        </BubbleCard>
        <BubbleCard>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
            Role summary
          </p>
          <p className="mt-3 text-[15px] leading-[1.65] sm:text-[16px]" style={{ color: SHELL_TEXT }}>
            {slide.roleSummary}
          </p>
        </BubbleCard>
        <MetaGrid items={slide.meta} />
      </div>
      <div className="min-h-[320px]">
        <ImageCard image={slide.images[0]} className="h-full min-h-[320px]" objectFit="contain" />
      </div>
    </div>
  )
}

function renderCaseDetail(slide: CaseDetailSlide) {
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <BubbleCard>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: slide.theme.label }}>
            {slide.eyebrow}
          </p>
          <h2 className="mt-3 font-hedvig text-[clamp(28px,3.2vw,52px)] leading-[1.04]" style={{ color: SHELL_TEXT }}>
            {slide.title}
          </h2>
        </BubbleCard>
        <BubbleCard>
          <p className="text-[16px] leading-[1.7] sm:text-[18px]" style={{ color: SHELL_TEXT }}>
            {slide.paragraph}
          </p>
        </BubbleCard>
      </div>
      {slide.meta.length > 0 && <MetaGrid items={slide.meta} />}
      <div className="flex-1">
        <ImageGrid images={slide.images} />
      </div>
    </div>
  )
}

function renderProfile(slide: ProfileSlide) {
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <BubbleCard>
          <h2 className="font-hedvig text-[clamp(30px,3.4vw,56px)] leading-[1.02]" style={{ color: SHELL_TEXT }}>
            {slide.title}
          </h2>
        </BubbleCard>
        <BubbleCard>
          <p className="text-[16px] leading-[1.7] sm:text-[18px]" style={{ color: SHELL_TEXT }}>
            {slide.paragraph}
          </p>
        </BubbleCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="space-y-4">
          <CapabilityGrid capabilities={slide.capabilities} />
          <LogoStrip logos={slide.logos} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {slide.images.map((image) => (
            <ImageCard key={image.src} image={image} className="min-h-[200px]" />
          ))}
        </div>
      </div>
    </div>
  )
}

function renderContact(slide: ContactSlide) {
  return (
    <div className="grid h-full gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <div className="flex min-w-0 flex-col gap-4">
        <BubbleCard>
          <h2 className="font-hedvig text-[clamp(32px,3.6vw,60px)] leading-[1.03]" style={{ color: SHELL_TEXT }}>
            {slide.title}
          </h2>
        </BubbleCard>
        <BubbleCard>
          <p className="text-[16px] leading-[1.7] sm:text-[18px]" style={{ color: SHELL_TEXT }}>
            {slide.paragraph}
          </p>
        </BubbleCard>
        <MetaGrid items={slide.links} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2">
        {slide.images.map((image, index) => (
          <ImageCard key={image.src} image={image} className={index === 0 ? 'sm:col-span-3 lg:col-span-2 min-h-[240px]' : 'min-h-[220px]'} />
        ))}
      </div>
    </div>
  )
}

function renderSlide(slide: HiringDeckSlide) {
  switch (slide.kind) {
    case 'cover':
      return renderCover(slide)
    case 'usp':
      return renderUsp(slide)
    case 'workExperience':
      return renderWorkExperience(slide)
    case 'caseIntro':
      return renderCaseIntro(slide)
    case 'caseDetail':
      return renderCaseDetail(slide)
    case 'profile':
      return renderProfile(slide)
    case 'contact':
      return renderContact(slide)
  }
}

function getAccent(slide: HiringDeckSlide) {
  switch (slide.kind) {
    case 'caseIntro':
    case 'caseDetail':
      return slide.theme.accent
    case 'cover':
      return '#A1A1FA'
    case 'usp':
    case 'workExperience':
      return '#FABBF9'
    case 'profile':
      return '#A1A1FA'
    case 'contact':
      return '#FABBF9'
  }
}

export default function SlidesPage({
  slides,
  editMode = false,
  localCurationEnabled = false,
}: {
  slides: HiringDeckSlide[]
  editMode?: boolean
  localCurationEnabled?: boolean
}) {
  const [editableSections, setEditableSections] = useState<Record<string, EditableSectionState>>(
    () => buildInitialEditableSections(slides)
  )
  const displaySlides = applyDraftStateToSlides(slides, editableSections)
  const previewHref = editMode ? '/?preview=slides&draft=1' : '/?preview=slides'

  function updateSectionState(key: string, updater: (entry: EditableSectionState) => EditableSectionState) {
    let nextEntry: EditableSectionState | null = null

    setEditableSections((current) => {
      const existing = current[key]
      if (!existing) return current
      nextEntry = updater(existing)
      return {
        ...current,
        [key]: nextEntry,
      }
    })

    return nextEntry
  }

  async function persistEntry(key: string, entry: EditableSectionState) {
    setEditableSections((current) => ({
      ...current,
      [key]: {
        ...current[key],
        status: 'Saving draft…',
      },
    }))

    try {
      const payload: DraftSectionEntry = {
        realmId: entry.realmId,
        sectionSlug: entry.sectionSlug,
        heroImageSrc: entry.heroImageSrc,
        images: entry.images.map((image, index) => ({
          ...image,
          sortOrder: index,
        })),
      }

      const response = await fetch('/api/image-curation/drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as { entry?: DraftSectionEntry; error?: string }
      if (!response.ok || !result.entry) {
        throw new Error(result.error ?? 'Unable to save draft.')
      }

      setEditableSections((current) => ({
        ...current,
        [key]: {
          realmId: result.entry!.realmId,
          sectionSlug: result.entry!.sectionSlug,
          heroImageSrc: result.entry!.heroImageSrc,
          images: result.entry!.images,
          status: 'Saved to local draft.',
        },
      }))
    } catch (error) {
      setEditableSections((current) => ({
        ...current,
        [key]: {
          ...current[key],
          status: error instanceof Error ? `Error: ${error.message}` : 'Error: Unable to save draft.',
        },
      }))
    }
  }

  async function uploadToSection(key: string, files: File[]) {
    const entry = editableSections[key]
    if (!entry || files.length === 0) return

    setEditableSections((current) => ({
      ...current,
      [key]: {
        ...current[key],
        status: 'Uploading…',
      },
    }))

    try {
      const formData = new FormData()
      formData.set('realmId', entry.realmId)
      formData.set('sectionSlug', entry.sectionSlug)

      for (const file of files) {
        formData.append('files', file)
      }

      const response = await fetch('/api/image-curation/upload', {
        method: 'POST',
        body: formData,
      })

      const result = (await response.json()) as { entry?: DraftSectionEntry; error?: string }
      if (!response.ok || !result.entry) {
        throw new Error(result.error ?? 'Unable to upload image.')
      }

      setEditableSections((current) => ({
        ...current,
        [key]: {
          realmId: result.entry!.realmId,
          sectionSlug: result.entry!.sectionSlug,
          heroImageSrc: result.entry!.heroImageSrc,
          images: result.entry!.images,
          status: 'Uploaded to local draft.',
        },
      }))
    } catch (error) {
      setEditableSections((current) => ({
        ...current,
        [key]: {
          ...current[key],
          status: error instanceof Error ? `Error: ${error.message}` : 'Error: Unable to upload image.',
        },
      }))
    }
  }

  function moveImage(key: string, src: string, direction: 'left' | 'right') {
    const nextEntry = updateSectionState(key, (entry) => {
      const index = entry.images.findIndex((image) => image.src === src)
      if (index === -1) return entry

      const targetIndex = direction === 'left' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= entry.images.length) return entry

      const nextImages = [...entry.images]
      const [moved] = nextImages.splice(index, 1)
      nextImages.splice(targetIndex, 0, moved)

      return {
        ...entry,
        images: nextImages.map((image, imageIndex) => ({
          ...image,
          sortOrder: imageIndex,
        })),
      }
    })

    if (nextEntry) {
      void persistEntry(key, nextEntry)
    }
  }

  function toggleImage(key: string, src: string) {
    const nextEntry = updateSectionState(key, (entry) => {
      const nextImages = entry.images.map((image) =>
        image.src === src ? { ...image, enabled: !image.enabled } : image
      )
      const nextHero = nextImages.some((image) => image.src === entry.heroImageSrc && image.enabled)
        ? entry.heroImageSrc
        : nextImages.find((image) => image.enabled)?.src

      return {
        ...entry,
        images: nextImages,
        heroImageSrc: nextHero,
      }
    })

    if (nextEntry) {
      void persistEntry(key, nextEntry)
    }
  }

  function setHeroImage(key: string, src: string) {
    const nextEntry = updateSectionState(key, (entry) => ({
      ...entry,
      heroImageSrc: src,
    }))

    if (nextEntry) {
      void persistEntry(key, nextEntry)
    }
  }

  function changeCaption(key: string, src: string, value: string) {
    updateSectionState(key, (entry) => ({
      ...entry,
      images: entry.images.map((image) =>
        image.src === src ? { ...image, draftCaption: value } : image
      ),
    }))
  }

  function commitCaption(key: string) {
    const entry = editableSections[key]
    if (entry) {
      void persistEntry(key, entry)
    }
  }

  return (
    <main className="min-h-screen snap-y snap-mandatory overflow-y-auto font-inter" style={{ backgroundColor: MIDNIGHT }}>
      <header className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur" style={{ backgroundColor: 'rgba(24, 24, 35, 0.92)', borderColor: 'rgba(228, 213, 194, 0.12)' }}>
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
          <div className="min-w-0">
            <a href="/" className="font-hedvig text-[18px] text-white">
              Martin Heßmann
            </a>
            <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-white/55">
              {displaySlides.length} slides · generated from portfolio data
            </p>
            {editMode && (
              <p className="mt-2 text-[12px] text-white/55">
                Slide edit mode is draft-only. Nothing writes back to canonical content until we promote it together.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-white/75">
            <a href={previewHref} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2 transition-colors hover:bg-white/[0.08] hover:text-white">
              Preview PDF
            </a>
            <SlidesDownloadButton slides={displaySlides} variant="inline" />
          </div>
        </div>
      </header>

      {displaySlides.map((slide) => {
        const key = getSlideSectionKey(slide)
        const entry = key ? editableSections[key] : null

        return (
          <SlideShell
            key={slide.id}
            label={slide.label}
            accent={getAccent(slide)}
            footer={
              editMode && key && entry ? (
                <SlideCurationPanel
                  realmName={slide.kind === 'caseIntro' || slide.kind === 'caseDetail' ? slide.realmName : 'Project'}
                  sectionTitle={slide.kind === 'caseIntro' ? 'Cover' : slide.kind === 'caseDetail' ? slide.eyebrow : 'Section'}
                  localEnabled={localCurationEnabled}
                  images={entry.images}
                  heroImageSrc={entry.heroImageSrc}
                  status={entry.status}
                  onUpload={(files) => uploadToSection(key, files)}
                  onMove={(src, direction) => moveImage(key, src, direction)}
                  onToggleEnabled={(src) => toggleImage(key, src)}
                  onSetHero={(src) => setHeroImage(key, src)}
                  onCaptionChange={(src, value) => changeCaption(key, src, value)}
                  onCaptionCommit={() => commitCaption(key)}
                />
              ) : null
            }
          >
            {renderSlide(slide)}
          </SlideShell>
        )
      })}
    </main>
  )
}
