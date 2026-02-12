'use client'

import type { ReactNode } from "react"
import type { ClientRealm, Platform, StoryBlock } from "@/data/clients"

interface ClientDetailContentProps {
  realm: ClientRealm
  /** When true, render as standalone page (back link, more spacing). When false, inside overlay. */
  standalone?: boolean
}

/* ── Project section: title left, paragraph right, visuals in slider ─ */

type ProjectSection = {
  title: string
  paragraph: string
  visuals: Array<
    | { type: "image"; src: string; alt: string; caption: string }
    | { type: "gallery"; images: { src: string; alt: string; caption: string }[] }
  >
}

function parseStoryIntoSections(story: StoryBlock[]): ProjectSection[] {
  const sections: ProjectSection[] = []
  let pendingLabel: string | null = null
  let pendingParagraph = ""
  let sectionParagraph = ""
  const pendingVisuals: ProjectSection["visuals"] = []

  for (const block of story) {
    if (block.type === "label") {
      if (pendingLabel) {
        sections.push({
          title: pendingLabel,
          paragraph: sectionParagraph,
          visuals: [...pendingVisuals],
        })
      }
      pendingLabel = block.content
      sectionParagraph = pendingParagraph
      pendingParagraph = ""
      pendingVisuals.length = 0
    } else if (block.type === "text") {
      pendingParagraph = block.content
    } else if (block.type === "image") {
      pendingVisuals.push({
        type: "image",
        src: block.src,
        alt: block.alt,
        caption: block.caption,
      })
    } else if (block.type === "gallery") {
      pendingVisuals.push({
        type: "gallery",
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

/* ── Flatten visuals to slides for carousel ─ */
function flattenVisuals(visuals: ProjectSection["visuals"]): { src: string; alt: string; caption: string }[] {
  const out: { src: string; alt: string; caption: string }[] = []
  for (const v of visuals) {
    if (v.type === "image") {
      out.push({ src: v.src, alt: v.alt, caption: v.caption })
    } else {
      out.push(...v.images)
    }
  }
  return out
}

function ImageRow({
  slides,
  className = "",
}: {
  slides: { src: string; alt: string; caption: string }[]
  className?: string
}) {
  if (slides.length === 0) return null
  return (
    <figure className={className}>
      <div className="-mx-6 overflow-x-auto px-6 lg:-mx-12 lg:px-12">
        <div className="flex gap-4" style={{ minWidth: "min-content" }}>
          {slides.map((s, i) => (
            <div key={i} className="shrink-0">
              <img
                src={s.src}
                alt={s.alt}
                className="h-[480px] w-auto rounded-lg object-cover"
              />
              {s.caption && (
                <span className="mt-2 block text-[16px] leading-[1.4] text-gray-950/35">
                  {s.caption}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

function PlatformLink({ p }: { p: Platform }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="font-semibold text-gray-950">{p.title}</span>
      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[16px] text-gray-500 underline decoration-gray-300 underline-offset-2 hover:text-gray-700 hover:decoration-gray-500"
        >
          <span className="max-w-[200px] truncate">{p.url.replace(/^https?:\/\//, "")}</span>
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
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-12">
      {/* Text left-right: title | paragraph */}
      <div className="grid gap-8 pb-10 lg:grid-cols-2 lg:gap-16 lg:pb-14">
        <div>
          <h3 className="font-hedvig text-[clamp(22px,2.5vw,28px)] leading-[1.3] text-gray-950">
            {section.title}
          </h3>
          {/* Platforms for this section (title, url, description) under headline */}
          {platforms.length > 0 && (
            <ul className="mt-4 space-y-3">
              {platforms.map((p, i) => (
                <li key={i}>
                  <PlatformLink p={p} />
                  <p className="mt-1 text-[16px] leading-[1.6] text-gray-600">{p.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-[16px] leading-[1.7] text-gray-600 lg:pt-1">
          {section.paragraph}
        </p>
      </div>
      {/* Visuals: horizontal row, scroll right */}
      {slides.length > 0 && <ImageRow slides={slides} className="mt-6" />}
    </div>
  )
}

/* ── Tool name → logo path ──────────── */
const TOOL_LOGOS: Record<string, string> = {
  WordPress: "wordpress.png",
  Azure: "azure.png",
  Algolia: "algolia.png",
  Sentry: "sentry.png",
  TYPO3: "typo3.png",
  Mapbox: "mapbox.png",
  Vercel: "vercel.png",
  Mailchimp: "mailchimp.png",
  GitLab: "gitlab.png",
  Sanity: "sanity.png",
  Cloudflare: "cloudflare.png",
}
const TOOLS_BASE = "/images/projects/figma-curated-tagged/tools"

function getToolLogo(name: string): string | null {
  return TOOL_LOGOS[name] ? `${TOOLS_BASE}/${TOOL_LOGOS[name]}` : null
}

/** Wrap tool names in paragraph text with the same pill style as the tag row. */
function highlightToolsInText(text: string, tools: string[]): ReactNode {
  if (!tools?.length) return text
  const sorted = [...tools].sort((a, b) => b.length - a.length)
  const escaped = sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  const pattern = new RegExp(`(${escaped.join("|")})`, "g")
  const segments = text.split(pattern)
  const toolSet = new Set(tools)
  return segments.map((seg, i) =>
    toolSet.has(seg) ? (
      <span
        key={i}
        className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[16px] text-gray-700"
      >
        {seg}
      </span>
    ) : (
      seg
    )
  )
}

const SECTION_SPACING = "pt-20 lg:pt-28"

export function ClientDetailContent({ realm, standalone }: ClientDetailContentProps) {
  const { sidebar, deliverables } = realm
  const hasDeliverables = deliverables?.items?.length > 0
  const hasTools = sidebar?.tools?.length > 0

  return (
    <div
      className={`font-inter tracking-normal text-gray-900 ${
        standalone ? "min-h-screen bg-warm" : ""
      }`}
    >
      {/* Back link when standalone */}
      {standalone && (
        <div className="mx-auto max-w-5xl px-6 pt-8 lg:px-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[16px] text-gray-600 hover:text-gray-950"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8H4M4 8l4 4M4 8l4-4" />
            </svg>
            Portfolio
          </a>
        </div>
      )}

      {/* Header */}
      <div className={`mx-auto max-w-5xl px-6 pb-16 lg:px-12 ${standalone ? "pt-12" : "pt-20 lg:pt-28"} lg:pb-20`}>
        <div className="mb-10 lg:mb-14">
          {realm.logo ? (
            <img src={realm.logo} alt={realm.client} className="h-6 w-auto object-contain opacity-50" />
          ) : (
            <p className="text-[16px] text-gray-950/40">{realm.client}</p>
          )}
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <h2
            id={`client-${realm.id}-title`}
            className="font-hedvig text-[clamp(28px,3.5vw,38px)] leading-[1.3] text-gray-950"
          >
            {realm.hook}
          </h2>
          <div className="space-y-4 text-[16px] leading-[1.7] text-gray-600 lg:pt-2">
            <p>{realm.keyMoment}</p>
            {sidebar?.openingNarrative && <p>{sidebar.openingNarrative}</p>}
          </div>
        </div>
      </div>

      {/* Hero image in slider (single image) */}
      {realm.moodImage && (
        <div className={`mx-auto max-w-5xl px-6 pb-20 lg:px-12 ${SECTION_SPACING}`}>
          <ImageRow
            slides={[{ src: realm.moodImage, alt: realm.client, caption: "" }]}
          />
        </div>
      )}

      {/* Platforms without section (fallback for clients with no section labels) */}
      {(() => {
        const unassigned = sidebar?.platforms?.filter((p) => !p.sectionTitle) ?? []
        if (unassigned.length === 0) return null
        return (
          <div className={`mx-auto max-w-5xl px-6 pb-16 lg:px-12 ${SECTION_SPACING}`}>
            <ul className="space-y-6">
              {unassigned.map((p, i) => (
                <li key={i}>
                  <PlatformLink p={p} />
                  <p className="mt-1 text-[16px] leading-[1.6] text-gray-600">{p.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )
      })()}

      {/* Project sections */}
      {(() => {
        const sections = parseStoryIntoSections(realm.story)
        if (sections.length === 0) {
          return (
            <div className={`mx-auto max-w-2xl space-y-6 px-6 pb-16 ${SECTION_SPACING}`}>
              {realm.story
                .filter((b): b is Extract<StoryBlock, { type: "text" }> => b.type === "text")
                .map((block, i) => (
                  <p key={i} className="text-[16px] leading-[1.75] text-gray-600">
                    {block.content}
                  </p>
                ))}
            </div>
          )
        }
        return (
          <div className={`space-y-24 pb-16 lg:space-y-28 ${SECTION_SPACING}`}>
            {sections.map((section, i) => {
              const sectionPlatforms =
                sidebar?.platforms?.filter((p) => p.sectionTitle === section.title) ?? []
              return (
                <ProjectSectionBlock
                  key={i}
                  section={section}
                  platforms={sectionPlatforms}
                />
              )
            })}
          </div>
        )
      })()}

      {/* Outcomes: deliverables + tools merged (one block, light) */}
      {(hasDeliverables || hasTools) && (
        <div className={`mx-auto max-w-5xl px-6 pb-16 lg:px-12 ${SECTION_SPACING}`}>
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
            {hasDeliverables && (
              <>
                <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <h3 className="font-hedvig text-[clamp(24px,2.5vw,32px)] leading-[1.3] text-gray-950">
                    {deliverables.heading}
                  </h3>
                  <div className="lg:pt-2">
                    <p className="text-[16px] leading-[1.7] text-gray-600">
                      {highlightToolsInText(
                        deliverables.subheading,
                        sidebar?.tools ?? []
                      )}
                    </p>
                    {hasTools && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {sidebar.tools.map((tool) => {
                          const logo = getToolLogo(tool)
                          return (
                            <span
                              key={tool}
                              className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-[16px] text-gray-700"
                            >
                              {logo && (
                                <img
                                  src={logo}
                                  alt=""
                                  className="h-4 w-4 object-contain opacity-70"
                                  aria-hidden
                                />
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
                      <h4 className="mb-2 text-[16px] font-medium leading-[1.4] text-gray-950">
                        {item.title}
                      </h4>
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
                      <span
                        key={tool}
                        className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-[16px] text-gray-700"
                      >
                        {logo && (
                          <img
                            src={logo}
                            alt=""
                            className="h-4 w-4 object-contain opacity-70"
                            aria-hidden
                          />
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

      {/* Closing */}
      {realm.closing && (
        <div className={`mx-auto max-w-2xl px-6 pb-24 ${SECTION_SPACING}`}>
          <p className="text-[16px] leading-[1.75] text-gray-600">{realm.closing}</p>
        </div>
      )}
    </div>
  )
}
