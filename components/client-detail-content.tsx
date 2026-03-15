'use client'

import { useRef, useState, type ReactNode } from 'react'
import type { ClientRealm, Platform, StoryBlock } from '@/data/clients'
import { flattenVisuals, getSectionPlatforms, type ProjectSection, parseStoryIntoSections } from '@/lib/client-story'

interface ClientDetailContentProps {
  realm: ClientRealm
  standalone?: boolean
}

function ImageRow({
  slides,
  className = '',
  objectFit = 'contain',
}: {
  slides: { src: string; alt: string; caption: string }[]
  className?: string
  objectFit?: 'cover' | 'contain'
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragState = useRef({ startX: 0, scrollLeft: 0, moved: false })

  if (slides.length === 0) return null

  const isSingle = slides.length === 1

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSingle) return
    const el = scrollRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    dragState.current = { startX: e.clientX, scrollLeft: el.scrollLeft, moved: false }
    setIsDragging(true)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const el = scrollRef.current
    if (!el) return
    const dx = e.clientX - dragState.current.startX
    if (Math.abs(dx) > 3) dragState.current.moved = true
    el.scrollLeft = dragState.current.scrollLeft - dx
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return
    scrollRef.current?.releasePointerCapture(e.pointerId)
    setIsDragging(false)
  }

  return (
    <figure className={`${className} relative`}>
      <div
        ref={scrollRef}
        className={`relative left-1/2 w-screen max-w-none -translate-x-1/2 select-none overflow-x-auto [&::-webkit-scrollbar]:hidden ${!isSingle ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
        style={{ scrollbarWidth: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="flex gap-5 pl-6 pr-[max(1.5rem,calc(50vw-512px))] lg:pl-12 lg:pr-[max(3rem,calc(50vw-512px))]"
          style={{ minWidth: 'min-content' }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="shrink-0"
              style={{ maxWidth: isSingle ? '100%' : '78vw' }}
            >
              <div className={`overflow-hidden rounded-[var(--surface-radius-md)] ${!isSingle ? 'transition-shadow duration-200 ease-out hover:shadow-lg' : ''}`}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className={`${!isSingle ? 'transition-transform duration-200 ease-out hover:scale-[1.01]' : ''} ${
                    objectFit === 'contain'
                      ? 'max-h-[420px] w-auto max-w-full object-contain'
                      : 'h-[420px] w-auto object-cover'
                  }`}
                />
              </div>
              {slide.caption && (
                <span className="mt-2 block text-[14px] leading-[1.5] text-gray-950/45">
                  {slide.caption}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

function PlatformMeta({ platform }: { platform: Platform }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="font-semibold text-gray-950">{platform.title}</span>
      {platform.url && (
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[16px] text-gray-500 underline decoration-gray-300 underline-offset-2 hover:text-gray-700 hover:decoration-gray-500"
        >
          <span className="max-w-[220px] truncate">{platform.url.replace(/^https?:\/\//, '')}</span>
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M6 3h7v7M9 13H2V6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
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

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-12">
      <div className="grid gap-8 pb-10 lg:grid-cols-2 lg:gap-16 lg:pb-14">
        <div>
          {primaryPlatform?.claim ? (
            <>
              <h3 className="font-hedvig text-[clamp(22px,2.5vw,28px)] leading-[1.3] text-gray-950">
                {primaryPlatform.claim}
              </h3>
              <div className="mt-4">
                <PlatformMeta platform={primaryPlatform} />
              </div>
            </>
          ) : (
            <>
              <h3 className="font-hedvig text-[clamp(22px,2.5vw,28px)] leading-[1.3] text-gray-950">
                {section.title}
              </h3>
              {platforms.length > 0 && (
                <ul className="mt-4 space-y-4">
                  {platforms.map((platform, index) => (
                    <li key={index}>
                      <PlatformMeta platform={platform} />
                      <p className="mt-1 text-[16px] leading-[1.6] text-gray-600">{platform.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
        <p className="text-[16px] leading-[1.75] text-gray-600 lg:pt-1">{section.paragraph}</p>
      </div>
      {slides.length > 0 && <ImageRow slides={slides} className="mt-6" />}
    </div>
  )
}

function ToolChip({
  tool,
  variant = 'cluster',
}: {
  tool: string
  variant?: 'cluster' | 'inline'
}) {
  if (variant === 'inline') {
    return (
      <span className="inline rounded-[999px] border border-gray-300 bg-white px-2 py-0.5 align-baseline text-[0.86em] font-medium leading-none text-gray-700">
        {tool}
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[14px] leading-none text-gray-700"
      title={tool}
    >
      {tool}
    </span>
  )
}

function highlightToolsInText(text: string, tools: string[]): ReactNode {
  if (!tools?.length) return text
  const sorted = [...tools].sort((a, b) => b.length - a.length)
  const escaped = sorted.map((tool) => tool.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g')
  const segments = text.split(pattern)
  const toolSet = new Set(tools)

  return segments.map((segment, index) =>
    toolSet.has(segment) ? (
      <ToolChip key={index} tool={segment} variant="inline" />
    ) : (
      segment
    )
  )
}

const SECTION_SPACING = 'pt-20 lg:pt-28'

export function ClientDetailContent({ realm, standalone }: ClientDetailContentProps) {
  const { sidebar, deliverables } = realm
  const hasDeliverables = Boolean(deliverables?.items?.length)
  const hasTools = Boolean(sidebar?.tools?.length)
  const hasSubheading = Boolean(deliverables?.subheading?.trim())

  return (
    <div className={`font-inter tracking-normal text-gray-900 ${standalone ? 'min-h-screen bg-warm' : ''}`}>
      {standalone && (
        <div className="mx-auto max-w-5xl px-6 pt-8 lg:px-12">
          <a href="/" className="inline-flex items-center gap-2 text-[16px] text-gray-600 hover:text-gray-950">
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
            <p className="text-[16px] text-gray-950/40">{realm.displayName}</p>
          )}
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.2em] text-gray-500">
              {realm.displayName} · {realm.accountLine}
            </p>
            <h2 id={`client-${realm.id}-title`} className="font-hedvig text-[clamp(28px,3.5vw,38px)] leading-[1.3] text-gray-950">
              {realm.hook}
            </h2>
          </div>
          <div className="space-y-5 text-[16px] leading-[1.75] text-gray-600 lg:pt-2">
            <p>{realm.keyMoment}</p>
            {sidebar?.openingNarrative && <p>{sidebar.openingNarrative}</p>}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-gray-500">Role</p>
              {realm.roleTags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {realm.roleTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-[var(--portfolio-sand-0)] px-3 py-1.5 text-[14px] font-medium text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-[16px] leading-[1.75] text-gray-700">{realm.roleSummary}</p>
              )}
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
                  <PlatformMeta platform={platform} />
                  <p className="mt-1 text-[16px] leading-[1.6] text-gray-600">{platform.description}</p>
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
                  <p key={index} className="text-[16px] leading-[1.75] text-gray-600">
                    {block.content}
                  </p>
                ))}
            </div>
          )
        }

        return (
          <div className={`space-y-24 pb-16 lg:space-y-28 ${SECTION_SPACING}`}>
            {sections.map((section, index) => {
              const sectionPlatforms = getSectionPlatforms(sidebar?.platforms, section.title)
              return <ProjectSectionBlock key={index} section={section} platforms={sectionPlatforms} />
            })}
          </div>
        )
      })()}

      {realm.closing && (
        <div className={`mx-auto max-w-2xl px-6 pb-16 ${SECTION_SPACING}`}>
          <p className="text-[16px] leading-[1.75] text-gray-600">{realm.closing}</p>
        </div>
      )}

      {(hasDeliverables || hasTools) && (
        <div className={`mx-auto max-w-5xl px-6 pb-16 lg:px-12 ${SECTION_SPACING}`}>
          <div className="rounded-[var(--surface-radius-lg)] border bg-white px-6 py-12 lg:px-10 lg:py-16" style={{ borderColor: 'var(--surface-border)' }}>
            {hasDeliverables && (
              <>
                <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <h3 className="font-hedvig text-[clamp(24px,2.5vw,32px)] leading-[1.3] text-gray-950">
                    {deliverables.heading}
                  </h3>
                  <div className="lg:pt-2">
                    {hasSubheading && (
                      <p className="text-[16px] leading-[1.7] text-gray-600">
                        {highlightToolsInText(deliverables.subheading, sidebar?.tools ?? [])}
                      </p>
                    )}
                    {hasTools && (
                      <div className={`${hasSubheading ? 'mt-4' : ''} flex flex-wrap gap-2.5`}>
                        {sidebar.tools.map((tool) => (
                          <ToolChip key={tool} tool={tool} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {deliverables.items.map((item) => (
                    <div key={item.title}>
                      <h4 className="mb-2 text-[16px] font-medium leading-[1.4] text-gray-950">{item.title}</h4>
                      <p className="text-[16px] leading-[1.6] text-gray-600">
                        {highlightToolsInText(item.description, sidebar?.tools ?? [])}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {hasTools && !hasDeliverables && (
              <>
                <h3 className="mb-6 font-hedvig text-[clamp(24px,2.5vw,32px)] leading-[1.3] text-gray-950">
                  What I built it with.
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sidebar.tools.map((tool) => (
                    <ToolChip key={tool} tool={tool} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
