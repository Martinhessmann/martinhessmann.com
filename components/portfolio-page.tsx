'use client'

import { useMemo, useState, type CSSProperties, type PointerEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ClientDetailSheet from '@/components/client-detail-sheet'
import { CLIENT_REALMS } from '@/data/clients'
import { CLIENT_LOGO_METRICS, type ClientLogoMetricId } from '@/data/generated/client-logo-metrics'
import resumeData from '@/data/resume.json'
import type { Resume } from '@/types/resume'

const resume = resumeData as Resume

const CARD_BG_COLORS: Record<
  string,
  {
    bg: string
    surface: string
    text: string
    tray: string
    panel: string
    panelText: string
    label: string
  }
> = {
  teambank: {
    bg: '#2C9AD8',
    surface: '#5BB6EA',
    text: 'white',
    tray: '#17688F',
    panel: '#17688F',
    panelText: '#FFFFFF',
    label: 'rgba(255,255,255,0.9)',
  },
  'gruen-infrasignal': {
    bg: '#5BE290',
    surface: '#8AF0B4',
    text: 'gray-900',
    tray: '#2F9C61',
    panel: '#2F9C61',
    panelText: '#FFFFFF',
    label: 'rgba(12,26,18,0.84)',
  },
  'open-wonder': {
    bg: '#F5E642',
    surface: '#FFF07A',
    text: 'gray-900',
    tray: '#D5C51F',
    panel: '#D5C51F',
    panelText: '#181823',
    label: 'rgba(44,39,3,0.86)',
  },
  'tertianum-dpf': {
    bg: '#F8F0E5',
    surface: '#FFF8F1',
    text: 'gray-900',
    tray: '#DED0BF',
    panel: '#DED0BF',
    panelText: '#181823',
    label: 'rgba(73,58,38,0.84)',
  },
  'wo-mo-fonds': {
    bg: '#1E3A5F',
    surface: '#325783',
    text: 'white',
    tray: '#213A5B',
    panel: '#213A5B',
    panelText: '#FFFFFF',
    label: 'rgba(255,255,255,0.88)',
  },
}

const CARD_LAYOUT = [
  { rotate: -7, translateY: 28 },
  { rotate: 3, translateY: 8 },
  { rotate: -5, translateY: 24 },
  { rotate: 4, translateY: 4 },
  { rotate: -4, translateY: 20 },
]

const TRUST_LOGOS: Array<{ id: ClientLogoMetricId; name: string; src: string }> = [
  { id: 'teambank', name: 'TeamBank', src: '/images/projects/figma-curated-tagged/clients/teambank.svg' },
  { id: 'easycredit', name: 'easyCredit', src: '/images/projects/figma-curated-tagged/clients/easycredit.svg' },
  { id: 'evg', name: 'EVG', src: '/images/projects/figma-curated-tagged/clients/evg.svg' },
  { id: 'gruen-berlin', name: 'Grün Berlin', src: '/images/projects/figma-curated-tagged/clients/gruen-berlin.svg' },
  { id: 'hartmann', name: 'Hartmann', src: '/images/projects/figma-curated-tagged/clients/hartmann.svg' },
  { id: 'mobile-de', name: 'mobile.de', src: '/images/projects/figma-curated-tagged/clients/mobile-de.svg' },
  { id: 'deutsche-bahn', name: 'Deutsche Bahn', src: '/images/projects/figma-curated-tagged/clients/deutsche-bahn.svg' },
  { id: 'e-on', name: 'E.ON', src: '/images/projects/figma-curated-tagged/clients/e-on.svg' },
  { id: 'volkswagen-group', name: 'Volkswagen Group', src: '/images/projects/figma-curated-tagged/clients/volkswagen-group.svg' },
  { id: 'voith', name: 'Voith', src: '/images/projects/figma-curated-tagged/clients/voith.svg' },
  { id: 'giz', name: 'GIZ', src: '/images/projects/figma-curated-tagged/clients/giz.svg' },
]

const UI_BASE = 'var(--portfolio-midnight-950)'
const UI_MIDNIGHT = 'var(--portfolio-midnight-900)'
const UI_LILAC = 'var(--portfolio-accent-lilac)'
const UI_PINK = 'var(--portfolio-accent-pink)'
const UI_BORDER = 'rgba(161, 161, 250, 0.18)'
const UI_BORDER_SOFT = 'rgba(250, 187, 249, 0.18)'
const UI_TEXT_SOFT = 'rgba(255, 255, 255, 0.72)'
const UI_TEXT_MUTED = 'rgba(255, 255, 255, 0.46)'
const UI_PANEL = 'rgba(255, 255, 255, 0.035)'

function formatPeriod(startDate?: string, endDate?: string) {
  if (!startDate) return ''
  const startYear = startDate.slice(0, 4)
  const endYear = endDate ? endDate.slice(0, 4) : 'today'
  return startYear === endYear ? startYear : `${startYear}–${endYear}`
}

function getProfileUrl(network: string) {
  return resume.basics.profiles?.find((profile) => profile.network === network)?.url ?? '#'
}

export default function PortfolioPage() {
  const [activeRealmId, setActiveRealmId] = useState<string | null>(null)
  const activeRealm = CLIENT_REALMS.find((realm) => realm.id === activeRealmId) ?? null
  const prefersReducedMotion = useReducedMotion()

  const featuredWork = useMemo(() => resume.work?.slice(0, 4) ?? [], [])
  const languages = useMemo(
    () =>
      (resume.languages ?? [])
        .map((entry) => `${entry.language} (${entry.fluency})`)
        .join(' · '),
    []
  )
  const footerMeta = useMemo(
    () => [resume.basics.location?.city, languages].filter(Boolean).join(' · '),
    [languages]
  )

  const handleLogoPanelPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--logo-glow-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--logo-glow-y', `${event.clientY - rect.top}px`)
    event.currentTarget.style.setProperty('--logo-glow-opacity', '1')
  }

  const handleLogoPanelPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--logo-glow-opacity', '0')
  }

  return (
    <main className="min-h-screen font-inter tracking-normal text-white" style={{ backgroundColor: UI_BASE }}>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur"
        style={{ backgroundColor: 'rgba(24, 24, 35, 0.9)', borderColor: UI_BORDER }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
          <a href="/" className="font-hedvig text-[18px] tracking-tight text-white">
            {resume.basics.name}
          </a>
          <a
            href={`mailto:${resume.basics.email}`}
            className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portfolio-accent-lilac)]"
            style={{
              color: UI_TEXT_SOFT,
              borderColor: UI_BORDER,
              backgroundColor: 'rgba(255, 255, 255, 0)',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.backgroundColor = UI_PANEL
              event.currentTarget.style.borderColor = 'rgba(161, 161, 250, 0.34)'
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0)'
              event.currentTarget.style.borderColor = UI_BORDER
            }}
          >
            Get in touch
          </a>
        </div>
      </header>

      <section className="px-6 pb-8 pt-24 lg:px-12 lg:pb-10 lg:pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em]" style={{ color: UI_LILAC }}>
            10+ years · Design, Engineering, AI
          </p>
          <h1 className="mt-5 max-w-5xl font-hedvig text-[clamp(40px,6vw,72px)] leading-[1.02] text-white">
            Systems Designer for design, engineering, and AI.
          </h1>
          <div className="mt-8 max-w-4xl space-y-5 text-[16px] leading-[1.7] lg:text-[17px]" style={{ color: UI_TEXT_SOFT }}>
            <p>
              I work where products stop being tidy: regulated platforms, civic infrastructure,
              multi-brand portfolios, and AI systems that need governance as much as interfaces.
            </p>
            <p>
              My role is to connect brand, product, content, engineering, and delivery so teams
              can keep shipping without losing clarity, maintainability, or operational control.
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em]" style={{ color: UI_LILAC }}>
            Selected accounts
          </p>

          <div className="mt-7 flex min-w-max items-end justify-center gap-3 overflow-x-auto px-2 pb-4 pt-4 sm:gap-4 lg:min-w-0 lg:overflow-visible lg:px-0">
            {CLIENT_REALMS.map((realm, index) => {
              const layout = CARD_LAYOUT[index] ?? { rotate: 0, translateY: 0 }
              const colors = CARD_BG_COLORS[realm.id] ?? {
                bg: '#1f2937',
                surface: '#374151',
                text: 'white',
                tray: '#7c5b38',
                panel: '#243247',
                panelText: '#ffffff',
                label: 'rgba(255,255,255,0.88)',
              }

              return (
                <motion.div
                  key={realm.id}
                  className="relative shrink-0 will-change-transform hover:z-30 focus-within:z-30"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: layout.translateY + 36, rotate: layout.rotate * 1.6, scale: 0.96 }
                  }
                  animate={{
                    opacity: 1,
                    y: prefersReducedMotion ? 0 : layout.translateY,
                    rotate: prefersReducedMotion ? 0 : layout.rotate,
                    scale: 1,
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: layout.translateY - 22, rotate: layout.rotate * 0.18, scale: 1.035 }
                  }
                  whileFocus={
                    prefersReducedMotion
                      ? undefined
                      : { y: layout.translateY - 22, rotate: layout.rotate * 0.18, scale: 1.035 }
                  }
                  transition={{
                    opacity: { duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: prefersReducedMotion ? 0 : index * 0.03 },
                    y: { type: 'spring', stiffness: 380, damping: 28, mass: 0.55, delay: prefersReducedMotion ? 0 : index * 0.03 },
                    rotate: { type: 'spring', stiffness: 360, damping: 30, mass: 0.55, delay: prefersReducedMotion ? 0 : index * 0.03 },
                    scale: { type: 'spring', stiffness: 360, damping: 28, mass: 0.55, delay: prefersReducedMotion ? 0 : index * 0.03 },
                  }}
                  style={{ zIndex: CLIENT_REALMS.length - index }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-2 bottom-[-10px] top-4 rounded-[24px] opacity-85"
                    style={{ backgroundColor: colors.tray }}
                    aria-hidden="true"
                  />
                  <article
                    className="relative flex h-[272px] w-[194px] cursor-pointer flex-col overflow-hidden rounded-[24px] border border-black/10 p-3 sm:h-[304px] sm:w-[220px] sm:p-4"
                    style={{ backgroundColor: colors.bg, boxShadow: 'var(--portfolio-shadow-object)' }}
                    onClick={() => setActiveRealmId(realm.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setActiveRealmId(realm.id)
                      }
                    }}
                    aria-label={`Open case study for ${realm.displayName}`}
                  >
                    <p
                      className="text-[12px] font-medium uppercase tracking-[0.18em]"
                      style={{ color: colors.label }}
                    >
                      {realm.displayName}
                    </p>
                    <div
                      className="mt-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[18px] border border-black/10 p-3"
                      style={{ backgroundColor: colors.surface }}
                    >
                      {realm.moodImage ? (
                        <img src={realm.moodImage} alt="" className="h-full w-full object-contain" />
                      ) : (
                        <div className="h-full w-full bg-black/10" />
                      )}
                    </div>
                    <div
                      className="mt-3 shrink-0 rounded-[16px] border px-3 py-3"
                      style={{ backgroundColor: colors.panel, borderColor: 'rgba(255,255,255,0.14)', color: colors.panelText }}
                    >
                      <p className="font-hedvig text-[15px] leading-[1.14] sm:text-[17px]">
                        {realm.hook}
                      </p>
                      <p
                        className="mt-2 text-[13px] leading-[1.45]"
                        style={{ color: colors.panelText === '#181823' ? 'rgba(24,24,35,0.76)' : 'rgba(255,255,255,0.8)' }}
                      >
                        {realm.accountLine}
                      </p>
                    </div>
                  </article>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-10 border-t pt-8" style={{ borderColor: UI_BORDER }}>
            <p className="text-[12px] font-medium uppercase tracking-[0.22em]" style={{ color: UI_PINK }}>
              Selected clients and brands
            </p>
            <div
              className="relative mt-6 overflow-hidden rounded-[28px] border p-3 sm:p-4 lg:p-5"
              style={{
                borderColor: UI_BORDER,
                background:
                  'linear-gradient(135deg, rgba(46, 43, 65, 0.98), rgba(34, 34, 51, 0.98))',
                '--logo-glow-x': '50%',
                '--logo-glow-y': '50%',
                '--logo-glow-opacity': '0',
              } as CSSProperties}
              onPointerMove={handleLogoPanelPointerMove}
              onPointerLeave={handleLogoPanelPointerLeave}
            >
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                style={{
                  opacity: 'var(--logo-glow-opacity)',
                  background:
                    'radial-gradient(280px circle at var(--logo-glow-x) var(--logo-glow-y), rgba(250, 187, 249, 0.09), rgba(161, 161, 250, 0.05) 34%, transparent 66%)',
                }}
                aria-hidden="true"
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {TRUST_LOGOS.map((logo) => (
                  <span
                    key={logo.name}
                    className="inline-flex min-h-[118px] items-center justify-center overflow-hidden rounded-[18px] border px-6 py-7 sm:min-h-[122px]"
                    style={{
                      backgroundColor: UI_MIDNIGHT,
                      borderColor: 'rgba(161, 161, 250, 0.08)',
                    }}
                    title={logo.name}
                  >
                    <span className="flex h-[68px] w-[196px] items-center justify-center">
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="shrink-0 object-contain brightness-0 invert opacity-80"
                        style={{
                          width: `${CLIENT_LOGO_METRICS[logo.id].width}px`,
                          height: `${CLIENT_LOGO_METRICS[logo.id].height}px`,
                          maxWidth: 'none',
                          maxHeight: 'none',
                          transform: `scale(${CLIENT_LOGO_METRICS[logo.id].scale})`,
                          transformOrigin: 'center center',
                        }}
                      />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <section
        className="border-y px-6 py-20 lg:px-12 lg:py-24"
        style={{
          borderColor: UI_BORDER,
          background:
            'linear-gradient(180deg, rgba(161, 161, 250, 0.045), rgba(250, 187, 249, 0.03))',
        }}
      >
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.22em]" style={{ color: UI_PINK }}>Resume</p>
            <h2 className="mt-4 font-hedvig text-[clamp(28px,4vw,44px)] leading-[1.1] text-white">
              From UX/UI design into systems design, cross-functional delivery, and AI product strategy.
            </h2>
            <div className="mt-6 space-y-5 text-[15px] leading-[1.72] lg:text-[16px]" style={{ color: UI_TEXT_SOFT }}>
              <p>{resume.basics.summary}</p>
              <p>
                Current scope spans product strategy for Open Wonder&apos;s AI platform, cross-functional
                delivery and design-system leadership at AN®, and the multi-brand UX foundation built
                across Unit U+2463 and Ape Unit.
              </p>
              <p>{footerMeta}</p>
            </div>
          </div>

          <div className="space-y-8">
            {featuredWork.map((entry) => (
              <article key={`${entry.name}-${entry.startDate}`} className="border-t pt-5 first:border-t-0 first:pt-0" style={{ borderColor: UI_BORDER }}>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-hedvig text-[24px] leading-[1.2] text-white">{entry.position}</h3>
                    <p className="mt-1 text-[14px] font-medium uppercase tracking-[0.16em]" style={{ color: UI_PINK }}>
                      {entry.name}
                    </p>
                  </div>
                  <p className="text-[14px] font-medium" style={{ color: UI_TEXT_MUTED }}>{formatPeriod(entry.startDate, entry.endDate)}</p>
                </div>
                {entry.summary && <p className="mt-4 text-[15px] leading-[1.72]" style={{ color: UI_TEXT_SOFT }}>{entry.summary}</p>}
                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-[14px] leading-[1.68]" style={{ color: UI_TEXT_SOFT }}>
                    {entry.highlights.slice(0, 2).map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: UI_PINK }} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl border-t pt-8" style={{ borderColor: UI_BORDER }}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.35fr)] lg:gap-16">
            <div className="space-y-3">
              <p className="font-hedvig text-[20px] text-white">{resume.basics.name}</p>
              <p className="max-w-md text-[15px] leading-[1.7]" style={{ color: UI_TEXT_SOFT }}>
                Systems Designer across product design, engineering, AI, and delivery.
              </p>
              <p className="text-[14px] leading-[1.7]" style={{ color: UI_TEXT_MUTED }}>
                {footerMeta}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: UI_PINK }}>
                  Contact
                </p>
                <div className="mt-3 space-y-2 text-[15px]" style={{ color: UI_TEXT_MUTED }}>
                  <a href={`mailto:${resume.basics.email}`} className="block transition-colors hover:text-white">
                    Email
                  </a>
                  <a href={getProfileUrl('LinkedIn')} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                    LinkedIn
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: UI_PINK }}>
                  Resume
                </p>
                <div className="mt-3 space-y-2 text-[15px]" style={{ color: UI_TEXT_MUTED }}>
                  <a href="/?view=resume" className="block transition-colors hover:text-white">
                    Resume
                  </a>
                  <a href="/?preview=print" target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                    PDF
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: UI_PINK }}>
                  Social
                </p>
                <div className="mt-3 space-y-2 text-[15px]" style={{ color: UI_TEXT_MUTED }}>
                  <a href={getProfileUrl('GitHub')} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                    GitHub
                  </a>
                  <a href={getProfileUrl('Instagram')} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">
                    Instagram
                  </a>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: UI_PINK }}>
                  Legal
                </p>
                <div className="mt-3 space-y-2 text-[15px]" style={{ color: UI_TEXT_MUTED }}>
                  <a href="/impressum" className="block transition-colors hover:text-white">
                    Impressum
                  </a>
                  <a href="/datenschutz" className="block transition-colors hover:text-white">
                    Datenschutz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <ClientDetailSheet realm={activeRealm} open={Boolean(activeRealm)} onClose={() => setActiveRealmId(null)} />
    </main>
  )
}
