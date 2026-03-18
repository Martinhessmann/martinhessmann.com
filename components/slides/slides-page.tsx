'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { TRUST_LOGOS } from '@/data/clients'
import type {
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

/** Scale factor for logo wall: on mobile (4 cols) scale down to fit; on sm+ use natural size. */
function useLogoScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setScale(mq.matches ? 0.5 : 1)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return scale
}

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

function SlideLabel({ label }: { label: string }) {
  return (
    <span
      className="inline-flex w-fit items-center rounded-full text-[0.6875em] font-medium uppercase tracking-[0.22em] sm:text-[0.75em]"
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
      className={`rounded-[1.75em] border bg-white/90 p-[1.25em] ${className}`}
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
    <figure className={`flex min-h-0 flex-col overflow-hidden rounded-[1.75em] border bg-white/85 ${className}`} style={{ borderColor: 'rgba(35, 33, 30, 0.08)' }}>
      <div className="relative min-h-0 flex-1 bg-[rgba(255,255,255,0.75)]">
        <img
          src={image.src}
          alt={image.alt}
          className={`h-full w-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      </div>
      {image.caption && (
        <figcaption className="border-t px-[1em] py-[0.75em] text-[0.75em] leading-[1.5] sm:text-[0.8125em]" style={{ borderColor: 'rgba(35, 33, 30, 0.08)', color: SHELL_TEXT_SOFT }}>
          {image.caption}
        </figcaption>
      )}
    </figure>
  )
}

function MetaList({ items }: { items: SlideMetaItem[] }) {
  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-y-[1em]">
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-[0.6875em] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
            {item.label}
          </p>
          <div className="mt-[0.375em] space-y-[0.125em] text-[0.9375em] leading-[1.45]" style={{ color: SHELL_TEXT }}>
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
        </div>
      ))}
    </div>
  )
}

function ImageGrid({ images }: { images: SlideImage[] }) {
  if (images.length === 0) return null

  if (images.length === 1) {
    return <ImageCard image={images[0]} className="h-full min-h-0" objectFit="contain" />
  }

  if (images.length === 2) {
    return (
      <div className="grid h-full min-h-0 grid-rows-[1fr] gap-[1em] lg:grid-cols-2">
        {images.map((image) => (
          <ImageCard key={`${image.src}-${image.caption ?? image.alt}`} image={image} className="h-full min-h-0" objectFit="contain" />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`grid h-full min-h-0 gap-[1em] lg:grid-cols-2 ${images.length > 3 ? 'grid-rows-[1fr_1fr]' : 'grid-rows-[1fr]'}`}
    >
      <ImageCard image={images[0]} className="h-full min-h-0" objectFit="contain" />
      <div className="grid min-h-0 grid-rows-[1fr_1fr] gap-[1em] sm:grid-cols-2 lg:grid-cols-1">
        {images.slice(1, 3).map((image) => (
          <ImageCard key={`${image.src}-${image.caption ?? image.alt}`} image={image} className="h-full min-h-0" objectFit="contain" />
        ))}
      </div>
      {images.length > 3 && (
        <div className="grid min-h-0 grid-rows-[1fr] gap-[1em] sm:grid-cols-2 lg:col-span-2">
          {images.slice(3).map((image) => (
            <ImageCard key={`${image.src}-${image.caption ?? image.alt}`} image={image} className="h-full min-h-0" objectFit="contain" />
          ))}
        </div>
      )}
    </div>
  )
}

function LogoGrid() {
  const logoScale = useLogoScale()
  return (
    <BubbleCard>
      <p className="text-[0.6875em] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
        Selected organisations
      </p>
      <div className="mt-[1.25em] grid grid-cols-3 gap-[0.375em] sm:gap-[0.75em]">
        {TRUST_LOGOS.map((logo) => (
          <span
            key={logo.id}
            className="inline-flex min-h-[3.5em] items-center justify-center px-[0.5em] py-[0.75em] sm:min-h-[7.625em] sm:px-[1.5em] sm:py-[1.75em]"
            title={logo.name}
          >
            <span
              className="inline-flex items-center justify-center overflow-hidden"
              style={{
                width: logo.width * logoScale,
                height: logo.height * logoScale,
                minWidth: logo.width * logoScale,
                minHeight: logo.height * logoScale,
              }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-full w-full object-contain opacity-80"
                width={logo.width}
                height={logo.height}
              />
            </span>
          </span>
        ))}
      </div>
    </BubbleCard>
  )
}

function SlideShell({
  label,
  children,
  footer,
}: {
  label: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <section className="snap-start px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto w-full max-w-[1480px]">
        <div
          className="relative aspect-video overflow-hidden rounded-none border p-[1.5em] shadow-[0_1.75em_7.5em_rgba(24,24,35,0.25)] sm:p-[2em] lg:p-[2.5em]"
          style={{
            backgroundColor: SHELL_BG,
            borderColor: SHELL_BORDER,
            color: SHELL_TEXT,
            containerType: 'inline-size',
            fontSize: 'clamp(8px, 0.83cqi, 16px)',
          }}
        >
          <div className="relative z-10 flex h-full min-h-0 flex-col">
            <SlideLabel label={label} />
            <div className="mt-[1.25em] min-h-0 flex-1 overflow-hidden">{children}</div>
          </div>
        </div>
        {footer ? <div className="mt-4">{footer}</div> : null}
      </div>
    </section>
  )
}

function renderCover(slide: CoverSlide) {
  return (
    <div className="grid h-full min-h-0 grid-rows-[1fr] gap-[3em] lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)]">
      <div className="flex min-h-0 min-w-0 flex-col justify-center gap-[1.5em] overflow-y-auto">
        {slide.name && (
          <p className="text-[0.6875em] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
            {slide.name}
          </p>
        )}
        <h1 className="max-w-[60em] font-hedvig text-[clamp(2.25em,4cqi,4.5em)] leading-[0.96]" style={{ color: SHELL_TEXT }}>
          {slide.title}
        </h1>
        <div className="flex flex-wrap gap-x-[2.5em] gap-y-[1em]">
          {slide.factCards.map((fact) => (
            <div key={fact.label}>
              <p className="text-[0.6875em] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
                {fact.label}
              </p>
              <p className="mt-[0.375em] text-[1.0625em] leading-[1.25] sm:text-[1.125em]" style={{ color: SHELL_TEXT }}>
                {fact.value}
              </p>
            </div>
          ))}
        </div>
        <p className="max-w-[40em] text-[0.9375em] leading-[1.7] sm:text-[1em]" style={{ color: SHELL_TEXT }}>
          {slide.paragraph}
        </p>
      </div>
      <div className="min-h-0 overflow-hidden">
        <ImageCard image={slide.images[0]} className="h-full w-full" />
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
    <div className="flex h-full min-h-0 flex-col gap-[2em] overflow-y-auto">
      <div className="grid min-h-0 grid-rows-[1fr] gap-[2.5em] lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1.55fr)]">
        <div className="flex min-h-0 flex-col justify-center gap-[1em] overflow-y-auto">
          <h2 className="font-hedvig text-[clamp(1.875em,3.2cqi,3.5em)] leading-[1.04]" style={{ color: SHELL_TEXT }}>
            {slide.title}
          </h2>
          <p className="text-[0.9375em] leading-[1.7] sm:text-[1em]" style={{ color: SHELL_TEXT }}>
            {slide.paragraph}
          </p>
        </div>
        <div className="grid min-h-0 grid-rows-[1fr] gap-[1em] md:grid-cols-3">
          {slide.images.map((image) => (
            <ImageCard key={image.src} image={image} className="h-full min-h-0" />
          ))}
        </div>
      </div>
      <div className="grid gap-[2em] lg:grid-cols-3">
        {slide.pillars.map((pillar) => (
          <div key={pillar.title}>
            <h3 className="font-hedvig text-[1.5em] leading-[1.08]" style={{ color: SHELL_TEXT }}>
              {pillar.title}
            </h3>
            <p className="mt-[0.75em] text-[0.875em] leading-[1.65] sm:text-[0.9375em]" style={{ color: SHELL_TEXT_SOFT }}>
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderWorkExperience(slide: WorkExperienceSlide) {
  return (
    <div className="grid h-full min-h-0 grid-rows-[1fr] gap-[2.5em] lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)]">
      <div className="flex min-h-0 flex-col justify-center overflow-y-auto">
        <p className="text-[0.6875em] font-medium uppercase tracking-[0.22em]" style={{ color: SHELL_TEXT_SOFT }}>
          {slide.sectionLabel}
        </p>
        <h2 className="mt-[0.5em] font-hedvig text-[clamp(1.5em,2.5cqi,2.25em)] leading-[1.08]" style={{ color: SHELL_TEXT }}>
          {slide.headline}
        </h2>
        {slide.intro.length > 0 && (
          <div className="mt-[0.75em] space-y-[0.5em]">
            {slide.intro.map((paragraph, i) => (
              <p key={i} className="text-[0.875em] leading-[1.65] sm:text-[0.9375em]" style={{ color: SHELL_TEXT_SOFT }}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="grid min-h-0 grid-cols-2 grid-rows-2 gap-[1em]">
        {slide.entries.map((entry) => (
          <BubbleCard key={`${entry.name}-${entry.startDate}`} className="flex flex-col">
            <div className="flex flex-wrap items-baseline justify-between gap-[0.5em]">
              <h3 className="font-hedvig text-[1.375em] leading-[1.15] sm:text-[1.5em]" style={{ color: SHELL_TEXT }}>
                {entry.position}
              </h3>
              <p className="text-[0.75em] font-medium tracking-[0.08em]" style={{ color: SHELL_TEXT_SOFT }}>
                {formatPeriod(entry.startDate, entry.endDate)}
              </p>
            </div>
            <p className="mt-[0.25em] text-[0.875em] font-medium" style={{ color: SHELL_TEXT_SOFT }}>
              {entry.name}
            </p>
            <p className="mt-[0.75em] text-[0.875em] leading-[1.6] sm:text-[0.9375em]" style={{ color: SHELL_TEXT }}>
              {entry.summary}
            </p>
            {entry.highlights.length > 0 && (
              <ul className="mt-[0.75em] space-y-[0.375em]">
                {entry.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-[0.5em] text-[0.8125em] leading-[1.55] sm:text-[0.875em]" style={{ color: SHELL_TEXT_SOFT }}>
                    <span className="mt-[0.375em] h-[0.25em] w-[0.25em] shrink-0 rounded-full" style={{ backgroundColor: SHELL_TEXT_SOFT }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </BubbleCard>
        ))}
      </div>
    </div>
  )
}

function renderCaseIntro(slide: CaseIntroSlide) {
  return (
    <div className="grid h-full min-h-0 grid-rows-[1fr] gap-[3em] lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
      <div className="flex min-h-0 min-w-0 flex-col justify-center gap-[1.5em] overflow-y-auto">
        <div>
          <h2 className="font-hedvig text-[clamp(1.75em,3.2cqi,3.25em)] leading-[1.05]" style={{ color: SHELL_TEXT }}>
            {slide.title}
          </h2>
        </div>
        <p className="text-[0.9375em] leading-[1.7] sm:text-[1em]" style={{ color: SHELL_TEXT }}>
          {slide.paragraph}
        </p>
        <div>
          <p className="text-[0.9375em] leading-[1.65] sm:text-[1em]" style={{ color: SHELL_TEXT_SOFT }}>
            {slide.roleSummary}
          </p>
        </div>
        <MetaList items={slide.meta} />
      </div>
      <div className="min-h-0 overflow-hidden">
        <ImageCard image={slide.images[0]} className="h-full w-full" objectFit="contain" />
      </div>
    </div>
  )
}

function renderCaseDetail(slide: CaseDetailSlide) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-[1.5em] overflow-y-auto">
      <div className="grid min-h-0 grid-rows-[1fr] gap-[2.5em] lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)]">
        <div className="flex min-h-0 flex-col justify-center gap-[1em] overflow-y-auto">
          <div>
            <p className="text-[0.6875em] font-medium uppercase tracking-[0.22em]" style={{ color: slide.theme.label }}>
              {slide.eyebrow}
            </p>
            <h2 className="mt-[0.75em] font-hedvig text-[clamp(1.625em,2.8cqi,2.75em)] leading-[1.06]" style={{ color: SHELL_TEXT }}>
              {slide.title}
            </h2>
          </div>
          <p className="text-[0.9375em] leading-[1.7] sm:text-[1em]" style={{ color: SHELL_TEXT }}>
            {slide.paragraph}
          </p>
          {slide.meta.length > 0 && <MetaList items={slide.meta} />}
        </div>
        <div className="min-h-0 overflow-hidden">
          {slide.images.length === 1 ? (
            <ImageCard image={slide.images[0]} className="h-full w-full" objectFit="contain" />
          ) : (
            <ImageGrid images={slide.images} />
          )}
        </div>
      </div>
    </div>
  )
}

function renderProfile(slide: ProfileSlide) {
  return (
    <div className="grid h-full min-h-0 grid-rows-[1fr] gap-[2.5em] lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1.55fr)]">
      <div className="flex min-h-0 flex-col justify-center gap-[1em] overflow-y-auto">
        <h2 className="font-hedvig text-[clamp(1.75em,3cqi,3em)] leading-[1.04]" style={{ color: SHELL_TEXT }}>
          {slide.title}
        </h2>
        <p className="text-[0.9375em] leading-[1.7] sm:text-[1em]" style={{ color: SHELL_TEXT }}>
          {slide.paragraph}
        </p>
        <div className="flex flex-col gap-[1em]">
          {slide.capabilities.map((capability) => (
            <div key={capability.title}>
              <h3 className="font-hedvig text-[1.25em] leading-[1.1]" style={{ color: SHELL_TEXT }}>
                {capability.title}
              </h3>
              <p className="mt-[0.5em] text-[0.875em] leading-[1.6]" style={{ color: SHELL_TEXT_SOFT }}>
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-col justify-center overflow-y-auto">
        <LogoGrid />
      </div>
    </div>
  )
}

function renderContact(slide: ContactSlide) {
  return (
    <div className="grid h-full min-h-0 grid-rows-[1fr] gap-[3em] lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)]">
      <div className="flex min-h-0 min-w-0 flex-col justify-center gap-[1.5em] overflow-y-auto">
        <h2 className="font-hedvig text-[clamp(1.875em,3.2cqi,3.25em)] leading-[1.05]" style={{ color: SHELL_TEXT }}>
          {slide.title}
        </h2>
        <p className="text-[0.9375em] leading-[1.7] sm:text-[1em]" style={{ color: SHELL_TEXT }}>
          {slide.paragraph}
        </p>
        <MetaList items={slide.links} />
      </div>
      <div className="grid min-h-0 grid-rows-[1fr] gap-[1em] sm:grid-cols-3 lg:grid-cols-2">
        {slide.images.map((image, index) => (
          <ImageCard key={image.src} image={image} className={index === 0 ? 'h-full min-h-0 sm:col-span-3 lg:col-span-2' : 'h-full min-h-0'} />
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
