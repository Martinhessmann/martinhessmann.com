'use client'

import type { ClientRealm, Platform, StoryBlock } from '@/data/clients'

interface ClientDetailContentProps {
  realm: ClientRealm
  standalone?: boolean
}

type ProjectSection = {
  title: string
  paragraph: string
  visuals: Array<
    | { type: 'image'; src: string; alt: string; caption: string }
    | { type: 'gallery'; images: { src: string; alt: string; caption: string }[] }
  >
}

function parseStoryIntoSections(story: StoryBlock[]): ProjectSection[] {
  const sections: ProjectSection[] = []
  let pendingLabel: string | null = null
  let pendingParagraph = ''
  let sectionParagraph = ''
  const pendingVisuals: ProjectSection['visuals'] = []

  for (const block of story) {
    if (block.type === 'label') {
      if (pendingLabel) {
        sections.push({
          title: pendingLabel,
          paragraph: sectionParagraph,
          visuals: [...pendingVisuals],
        })
      }
      pendingLabel = block.content
      sectionParagraph = pendingParagraph
      pendingParagraph = ''
      pendingVisuals.length = 0
    } else if (block.type === 'text') {
      pendingParagraph = block.content
    } else if (block.type === 'image') {
      pendingVisuals.push({
        type: 'image',
        src: block.src,
        alt: block.alt,
        caption: block.caption,
      })
    } else if (block.type === 'gallery') {
      pendingVisuals.push({
        type: 'gallery',
        images: block.images,
      })
    }
  }

  if (pendingLabel) {
    sections.push({
      title: pendingLabel,
      paragraph: sectionParagraph,
      visuals: [...pendingVisuals],
    })
  }

  return sections
}

function flattenVisuals(visuals: ProjectSection['visuals']): { src: string; alt: string; caption: string }[] {
  const output: { src: string; alt: string; caption: string }[] = []
  for (const visual of visuals) {
    if (visual.type === 'image') {
      output.push({ src: visual.src, alt: visual.alt, caption: visual.caption })
    } else {
      output.push(...visual.images)
    }
  }
  return output
}

const EYEBROW_CLASS = 'text-[12px] font-medium uppercase tracking-[0.18em]'
const META_CLASS = 'text-[14px] leading-[1.55]'
const BODY_CLASS = 'text-[16px] leading-[1.72]'
const INK_STRONG = 'var(--portfolio-ink-0)'
const INK_MUTED = 'var(--portfolio-ink-1)'
const SAND_FRAME = 'var(--portfolio-sand-1)'
const SAND_BORDER = 'var(--portfolio-sand-3)'
const PAPER_SURFACE = '#ffffff'

function ImageRow({
  slides,
  className = '',
  objectFit = 'contain',
}: {
  slides: { src: string; alt: string; caption: string }[]
  className?: string
  objectFit?: 'cover' | 'contain'
}) {
  if (slides.length === 0) return null

  return (
    <figure className={className}>
      <div className="-mx-6 overflow-x-auto px-6 lg:-mx-12 lg:px-12">
        <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
          {slides.map((slide, index) => (
            <div key={index} className="w-[78vw] max-w-[760px] shrink-0">
              <div
                className="rounded-[28px] border p-4"
                style={{ borderColor: SAND_BORDER, backgroundColor: SAND_FRAME }}
              >
                <div
                  className="flex min-h-[260px] items-center justify-center rounded-[22px] border p-4 sm:min-h-[340px] lg:min-h-[420px]"
                  style={{ backgroundColor: PAPER_SURFACE, borderColor: 'rgba(212, 193, 169, 0.34)' }}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={
                      objectFit === 'contain'
                        ? 'max-h-[420px] max-w-full rounded-xl object-contain'
                        : 'h-[420px] w-full rounded-xl object-cover'
                    }
                  />
                </div>
                {slide.caption && (
                  <span className={`mt-3 block ${META_CLASS}`} style={{ color: INK_MUTED }}>
                    {slide.caption}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

function PlatformLink({ platform, showTitle = true }: { platform: Platform; showTitle?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {showTitle && <span className="font-semibold" style={{ color: INK_STRONG }}>{platform.title}</span>}
        {platform.url && (
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 ${META_CLASS} underline decoration-[#d4c1a9] underline-offset-2 hover:decoration-[#8f877b]`}
            style={{ color: INK_MUTED }}
          >
            <span className="max-w-[220px] truncate">{platform.url.replace(/^https?:\/\//, '')}</span>
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M6 3h7v7M9 13H2V6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

function ProjectSectionBlock({
  section,
  platforms = [],
}: {
  section: ProjectSection
  platforms?: Platform[]
}) {
  const slides = flattenVisuals(section.visuals)
  const primaryPlatform = platforms[0]
  const additionalPlatforms = platforms.slice(1)
  const primaryMetaTitle = primaryPlatform && primaryPlatform.title !== section.title ? primaryPlatform.title : null

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-12">
      <div className="grid gap-8 pb-10 lg:grid-cols-2 lg:gap-16 lg:pb-14">
        <div className="space-y-4">
          {primaryPlatform?.claim && (
            <p className={EYEBROW_CLASS} style={{ color: INK_MUTED }}>
              {primaryPlatform.claim}
            </p>
          )}
          <h3 className="font-hedvig text-[clamp(24px,2.7vw,30px)] leading-[1.22]" style={{ color: INK_STRONG }}>
            {section.title}
          </h3>
          {(primaryMetaTitle || primaryPlatform?.url) && (
            <div className="space-y-1">
              {primaryMetaTitle && (
                <p className="font-medium" style={{ color: INK_STRONG }}>
                  {primaryMetaTitle}
                </p>
              )}
              {primaryPlatform?.url && <PlatformLink platform={primaryPlatform} showTitle={false} />}
            </div>
          )}
        </div>
        <div className="space-y-4 lg:pt-1">
          <p className={BODY_CLASS} style={{ color: INK_MUTED }}>{section.paragraph}</p>
          {additionalPlatforms.length > 0 && (
            <ul className="space-y-3">
              {additionalPlatforms.map((platform, index) => (
                <li key={index}>
                  <PlatformLink platform={platform} />
                  <p className={META_CLASS} style={{ color: INK_MUTED }}>
                    {platform.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {slides.length > 0 && <ImageRow slides={slides} className="mt-6" />}
    </div>
  )
}

const SECTION_SPACING = 'pt-20 lg:pt-28'

export function ClientDetailContent({ realm, standalone }: ClientDetailContentProps) {
  const { sidebar, deliverables } = realm
  const hasDeliverables = Boolean(deliverables?.items?.length)
  const hasTools = Boolean(sidebar?.tools?.length)

  return (
    <div className={`font-inter tracking-normal ${standalone ? 'min-h-screen bg-warm' : ''}`} style={{ color: INK_STRONG }}>
      {standalone && (
        <div className="mx-auto max-w-5xl px-6 pt-8 lg:px-12">
          <a href="/" className={`inline-flex items-center gap-2 ${META_CLASS} hover:text-[#23211e]`} style={{ color: INK_MUTED }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8H4M4 8l4 4M4 8l4-4" />
            </svg>
            Portfolio
          </a>
        </div>
      )}

      <div className={`mx-auto max-w-5xl px-6 pb-16 lg:px-12 ${standalone ? 'pt-12' : 'pt-20 lg:pt-28'} lg:pb-20`}>
        <div className="mb-10 lg:mb-14">
          {realm.logo ? (
            <img src={realm.logo} alt={realm.displayName} className="h-6 w-auto object-contain opacity-50" />
          ) : (
            <p className={META_CLASS} style={{ color: INK_MUTED }}>{realm.displayName}</p>
          )}
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={`mb-4 ${EYEBROW_CLASS}`} style={{ color: INK_MUTED }}>
              {realm.displayName} · {realm.accountLine}
            </p>
            <h2 id={`client-${realm.id}-title`} className="font-hedvig text-[clamp(30px,3.8vw,40px)] leading-[1.16]" style={{ color: INK_STRONG }}>
              {realm.hook}
            </h2>
          </div>
          <div className={`space-y-5 ${BODY_CLASS} lg:pt-2`} style={{ color: INK_MUTED }}>
            <p>{realm.keyMoment}</p>
            {sidebar?.openingNarrative && <p>{sidebar.openingNarrative}</p>}
            <div className="border-t pt-4" style={{ borderColor: 'rgba(212, 193, 169, 0.55)' }}>
              <p className={EYEBROW_CLASS} style={{ color: INK_MUTED }}>Role</p>
              <p className={`mt-3 ${BODY_CLASS}`} style={{ color: INK_STRONG }}>{realm.roleSummary}</p>
            </div>
          </div>
        </div>
      </div>

      {realm.moodImage && (
        <div className={`mx-auto max-w-5xl px-6 pb-20 lg:px-12 ${SECTION_SPACING}`}>
          <ImageRow slides={[{ src: realm.moodImage, alt: realm.displayName, caption: '' }]} objectFit="contain" />
        </div>
      )}

      {(() => {
        const unassigned = sidebar?.platforms?.filter((platform) => !platform.sectionTitle) ?? []
        if (unassigned.length === 0) return null

        return (
          <div className={`mx-auto max-w-5xl px-6 pb-16 lg:px-12 ${SECTION_SPACING}`}>
            <ul className="space-y-6">
              {unassigned.map((platform, index) => (
                <li key={index}>
                  <PlatformLink platform={platform} />
                  <p className={`mt-1 ${BODY_CLASS}`} style={{ color: INK_MUTED }}>{platform.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      })()}

      {(() => {
        const sections = parseStoryIntoSections(realm.story)
        if (sections.length === 0) {
          return (
            <div className={`mx-auto max-w-2xl space-y-6 px-6 pb-16 ${SECTION_SPACING}`}>
              {realm.story
                .filter((block): block is Extract<StoryBlock, { type: 'text' }> => block.type === 'text')
                .map((block, index) => (
                  <p key={index} className={BODY_CLASS} style={{ color: INK_MUTED }}>
                    {block.content}
                  </p>
                ))}
            </div>
          )
        }

        return (
          <div className={`space-y-24 pb-16 lg:space-y-28 ${SECTION_SPACING}`}>
            {sections.map((section, index) => {
              const sectionPlatforms = sidebar?.platforms?.filter((platform) => platform.sectionTitle === section.title) ?? []
              return <ProjectSectionBlock key={index} section={section} platforms={sectionPlatforms} />
            })}
          </div>
        )
      })()}

      {(hasDeliverables || hasTools) && (
        <div className={`mx-auto max-w-5xl px-6 pb-16 lg:px-12 ${SECTION_SPACING}`}>
          <div
            className="rounded-[28px] border px-6 py-12 lg:px-10 lg:py-16"
            style={{ borderColor: SAND_BORDER, backgroundColor: PAPER_SURFACE }}
          >
            {hasDeliverables && (
              <>
                <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <h3 className="font-hedvig text-[clamp(28px,3vw,36px)] leading-[1.16]" style={{ color: INK_STRONG }}>
                    {deliverables.heading}
                  </h3>
                  <div className="lg:pt-2">
                    <p className={BODY_CLASS} style={{ color: INK_MUTED }}>
                      {deliverables.subheading}
                    </p>
                    {hasTools && (
                      <p className={`mt-4 ${META_CLASS}`} style={{ color: INK_MUTED }}>
                        Tooling: {sidebar.tools.join(' · ')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {deliverables.items.map((item) => (
                    <div key={item.title}>
                      <h4 className="mb-2 text-[16px] font-medium leading-[1.45]" style={{ color: INK_STRONG }}>{item.title}</h4>
                      <p className={BODY_CLASS} style={{ color: INK_MUTED }}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {hasTools && !hasDeliverables && (
              <>
                <h3 className="mb-6 font-hedvig text-[clamp(28px,3vw,36px)] leading-[1.16]" style={{ color: INK_STRONG }}>
                  What I built it with.
                </h3>
                <p className={BODY_CLASS} style={{ color: INK_MUTED }}>{sidebar.tools.join(' · ')}</p>
              </>
            )}
          </div>
        </div>
      )}

      {realm.closing && (
        <div className={`mx-auto max-w-2xl px-6 pb-24 ${SECTION_SPACING}`}>
          <p className={BODY_CLASS} style={{ color: INK_MUTED }}>{realm.closing}</p>
        </div>
      )}
    </div>
  )
}
