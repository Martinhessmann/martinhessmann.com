'use client'

import type { ReactNode } from 'react'
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
              <div className="rounded-[28px] border border-[#d8c5b3] bg-[#ead9ca] p-4 shadow-[0_18px_40px_rgba(109,77,49,0.14)]">
                <div className="flex min-h-[260px] items-center justify-center rounded-[22px] bg-white p-4 sm:min-h-[340px] lg:min-h-[420px]">
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
                  <span className="mt-3 block text-[14px] leading-[1.5] text-gray-950/45">
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

function PlatformLink({ platform }: { platform: Platform }) {
  return (
    <div className="space-y-1.5">
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
      {platform.claim && (
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-gray-500">
          {platform.claim}
        </p>
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
          {primaryPlatform?.claim && (
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.18em] text-gray-500">
              {primaryPlatform.claim}
            </p>
          )}
          <h3 className="font-hedvig text-[clamp(22px,2.5vw,28px)] leading-[1.3] text-gray-950">
            {section.title}
          </h3>
          {platforms.length > 0 && (
            <ul className="mt-4 space-y-4">
              {platforms.map((platform, index) => (
                <li key={index}>
                  <PlatformLink platform={platform} />
                  <p className="mt-1 text-[16px] leading-[1.6] text-gray-600">{platform.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-[16px] leading-[1.75] text-gray-600 lg:pt-1">{section.paragraph}</p>
      </div>
      {slides.length > 0 && <ImageRow slides={slides} className="mt-6" />}
    </div>
  )
}

const TOOL_LOGOS: Record<string, string> = {
  WordPress: 'wordpress.png',
  Azure: 'azure.png',
  Algolia: 'algolia.png',
  Sentry: 'sentry.png',
  TYPO3: 'typo3.png',
  Mapbox: 'mapbox.png',
  Vercel: 'vercel.png',
  Mailchimp: 'mailchimp.png',
  GitLab: 'gitlab.png',
  Sanity: 'sanity.png',
  Cloudflare: 'cloudflare.png',
}
const TOOLS_BASE = '/images/projects/figma-curated-tagged/tools'

function getToolLogo(name: string): string | null {
  return TOOL_LOGOS[name] ? `${TOOLS_BASE}/${TOOL_LOGOS[name]}` : null
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
      <span key={index} className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[16px] text-gray-700">
        {segment}
      </span>
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
              <p className="mt-3 text-[16px] leading-[1.75] text-gray-700">{realm.roleSummary}</p>
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
              const sectionPlatforms = sidebar?.platforms?.filter((platform) => platform.sectionTitle === section.title) ?? []
              return <ProjectSectionBlock key={index} section={section} platforms={sectionPlatforms} />
            })}
          </div>
        )
      })()}

      {(hasDeliverables || hasTools) && (
        <div className={`mx-auto max-w-5xl px-6 pb-16 lg:px-12 ${SECTION_SPACING}`}>
          <div className="rounded-[28px] border border-[#dfd3c8] bg-white px-6 py-12 lg:px-10 lg:py-16">
            {hasDeliverables && (
              <>
                <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <h3 className="font-hedvig text-[clamp(24px,2.5vw,32px)] leading-[1.3] text-gray-950">
                    {deliverables.heading}
                  </h3>
                  <div className="lg:pt-2">
                    <p className="text-[16px] leading-[1.7] text-gray-600">
                      {highlightToolsInText(deliverables.subheading, sidebar?.tools ?? [])}
                    </p>
                    {hasTools && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {sidebar.tools.map((tool) => {
                          const logo = getToolLogo(tool)
                          return (
                            <span key={tool} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-[16px] text-gray-700">
                              {logo ? (
                                <img src={logo} alt="" className="h-4 w-4 object-contain opacity-70" aria-hidden />
                              ) : (
                                <span className="h-4 w-4 rounded-full bg-gray-300" aria-hidden />
                              )}
                              {tool}
                            </span>
                          )
                        })}
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
                  {sidebar.tools.map((tool) => {
                    const logo = getToolLogo(tool)
                    return (
                      <span key={tool} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-[16px] text-gray-700">
                        {logo ? (
                          <img src={logo} alt="" className="h-4 w-4 object-contain opacity-70" aria-hidden />
                        ) : (
                          <span className="h-4 w-4 rounded-full bg-gray-300" aria-hidden />
                        )}
                        {tool}
                      </span>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {realm.closing && (
        <div className={`mx-auto max-w-2xl px-6 pb-24 ${SECTION_SPACING}`}>
          <p className="text-[16px] leading-[1.75] text-gray-600">{realm.closing}</p>
        </div>
      )}
    </div>
  )
}
