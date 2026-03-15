'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ClientDetailSheet from '@/components/client-detail-sheet'
import { CLIENT_REALMS, TRUST_LOGOS, DEFAULT_CARD_THEME } from '@/data/clients'
import resumeData from '@/data/resume.json'
import type { Resume } from '@/types/resume'

const resume = resumeData as Resume

const CARD_LAYOUT = [
  { rotate: -7, translateY: 28 },
  { rotate: 3, translateY: 8 },
  { rotate: -5, translateY: 24 },
  { rotate: 4, translateY: 4 },
  { rotate: -4, translateY: 20 },
]

const UI_BASE = 'var(--portfolio-midnight-950)'
const UI_MIDNIGHT = 'var(--portfolio-midnight-900)'
const UI_LILAC = 'var(--portfolio-accent-lilac)'
const UI_PINK = 'var(--portfolio-accent-pink)'
const UI_BORDER = 'rgba(161, 161, 250, 0.18)'
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

function useCompactCardLayout() {
  const [isCompact, setIsCompact] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)')
    const onChange = () => setIsCompact(window.innerWidth < 1024)
    onChange()
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return isCompact ?? true
}

export default function PortfolioPage() {
  const [activeRealmId, setActiveRealmId] = useState<string | null>(null)
  const activeRealm = CLIENT_REALMS.find((realm) => realm.id === activeRealmId) ?? null
  const prefersReducedMotion = useReducedMotion()
  const isCompactCardLayout = useCompactCardLayout()
  const useCardFanLayout = !prefersReducedMotion && !isCompactCardLayout

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
          {resume.basics.hero?.kicker && (
            <p className="text-[12px] font-medium uppercase tracking-[0.22em]" style={{ color: UI_LILAC }}>
              {resume.basics.hero.kicker}
            </p>
          )}
          <h1 className="mt-5 max-w-5xl font-hedvig text-[clamp(40px,6vw,72px)] leading-[1.02] text-white">
            {resume.basics.hero?.title ?? resume.basics.label}
          </h1>
          {resume.basics.hero?.body && (
            <div className="mt-8 max-w-4xl space-y-5 text-[16px] leading-[1.7] lg:text-[17px]" style={{ color: UI_TEXT_SOFT }}>
              {resume.basics.hero.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="work" className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em]" style={{ color: UI_LILAC }}>
            Selected accounts
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:items-end lg:justify-center lg:gap-4 lg:pb-4 lg:pt-4">
            {CLIENT_REALMS.map((realm, index) => {
              const layout = CARD_LAYOUT[index] ?? { rotate: 0, translateY: 0 }
              const colors = realm.theme ?? DEFAULT_CARD_THEME

              return (
                <motion.div
                  key={realm.id}
                  className="relative w-full min-w-0 will-change-transform hover:z-30 focus-within:z-30 lg:w-auto lg:shrink-0"
                  initial={
                    useCardFanLayout
                      ? { opacity: 0, y: layout.translateY + 36, rotate: layout.rotate * 1.6, scale: 0.96 }
                      : { opacity: 0, y: 18, rotate: 0, scale: 0.985 }
                  }
                  animate={{
                    opacity: 1,
                    y: useCardFanLayout ? layout.translateY : 0,
                    rotate: useCardFanLayout ? layout.rotate : 0,
                    scale: 1,
                  }}
                  whileHover={useCardFanLayout ? { y: layout.translateY - 22, rotate: layout.rotate * 0.18, scale: 1.035 } : undefined}
                  whileFocus={useCardFanLayout ? { y: layout.translateY - 22, rotate: layout.rotate * 0.18, scale: 1.035 } : undefined}
                  transition={{
                    opacity: { duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: prefersReducedMotion ? 0 : index * 0.03 },
                    y: { type: 'spring', stiffness: 380, damping: 28, mass: 0.55, delay: prefersReducedMotion ? 0 : index * 0.03 },
                    rotate: { type: 'spring', stiffness: 360, damping: 30, mass: 0.55, delay: prefersReducedMotion ? 0 : index * 0.03 },
                    scale: { type: 'spring', stiffness: 360, damping: 28, mass: 0.55, delay: prefersReducedMotion ? 0 : index * 0.03 },
                  }}
                  style={{ zIndex: useCardFanLayout ? CLIENT_REALMS.length - index : 'auto' }}
                >
                  <article
                    className="relative flex h-fit w-full cursor-pointer flex-col overflow-hidden rounded-[var(--surface-radius-lg)] border p-3 sm:p-4 lg:w-[220px]"
                    style={{ backgroundColor: colors.bg, borderColor: 'var(--surface-border-dark)' }}
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
                    <div className="mt-2 flex aspect-[220/180] w-full items-center justify-center overflow-hidden rounded-[var(--surface-radius-sm)]">
                      {realm.moodImage ? (
                        <img
                          src={realm.moodImage}
                          alt=""
                          className="h-full w-full rounded-[var(--surface-radius-sm)] object-contain object-center"
                        />
                      ) : (
                        <div className="h-full w-full rounded-[var(--surface-radius-sm)] bg-black/10" />
                      )}
                    </div>
                    <div className="mt-3 shrink-0 px-1 pb-1 pt-2">
                      <p
                        className="font-hedvig text-[15px] leading-[1.14] sm:text-[17px]"
                        style={{ color: colors.panelText }}
                      >
                        {realm.hook}
                      </p>
                      <p
                        className="mt-1 text-[13px] leading-[1.45]"
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
              className="mt-6 overflow-hidden rounded-[var(--surface-radius-lg)] p-3 sm:p-4 lg:p-5"
              style={{ backgroundColor: UI_MIDNIGHT }}
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {TRUST_LOGOS.map((logo) => (
                  <span
                    key={logo.name}
                    className="inline-flex min-h-[118px] items-center justify-center px-6 py-7 sm:min-h-[122px]"
                    title={logo.name}
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="max-h-[68px] max-w-[196px] w-auto object-contain brightness-0 invert opacity-80"
                    />
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
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.22em]" style={{ color: UI_PINK }}>
                {resume.basics.resume?.label ?? 'Resume'}
              </p>
              <h2 className="mt-4 font-hedvig text-[clamp(28px,4vw,44px)] leading-[1.1] text-white">
                {resume.basics.resume?.headline ?? resume.basics.label}
              </h2>
              {resume.basics.resume?.intro && (
                <div className="mt-6 space-y-5 text-[16px] leading-[1.72]" style={{ color: UI_TEXT_SOFT }}>
                  {resume.basics.resume.intro.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}

              {(resume.education?.[0] || languages) && (
                <div className="mt-8 space-y-2 text-[16px] leading-[1.6]" style={{ color: UI_TEXT_MUTED }}>
                  {resume.education?.[0] && (
                    <p>
                      {resume.education[0].studyType} — {resume.education[0].area}, {resume.education[0].location?.city} ({resume.education[0].startDate}–{resume.education[0].endDate})
                    </p>
                  )}
                  <p>{footerMeta}</p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {featuredWork.map((entry) => (
                <article key={`${entry.name}-${entry.startDate}`} className="border-t pt-5 first:border-t-0 first:pt-0" style={{ borderColor: UI_BORDER }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <h3 className="font-hedvig text-[24px] leading-[1.2] text-white">{entry.position}</h3>
                      <p className="mt-1 text-[16px] font-medium uppercase tracking-[0.08em]" style={{ color: UI_PINK }}>
                        {entry.name}
                      </p>
                    </div>
                    <p className="text-[16px] font-medium" style={{ color: UI_TEXT_MUTED }}>{formatPeriod(entry.startDate, entry.endDate)}</p>
                  </div>
                  {entry.summary && <p className="mt-4 text-[16px] leading-[1.72]" style={{ color: UI_TEXT_SOFT }}>{entry.summary}</p>}
                  {entry.highlights && entry.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 text-[16px] leading-[1.68]" style={{ color: UI_TEXT_SOFT }}>
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

          {resume.skills && resume.skills.length > 0 && (
            <div className="mt-16 border-t pt-10" style={{ borderColor: UI_BORDER }}>
              <p className="text-[12px] font-medium uppercase tracking-[0.22em]" style={{ color: UI_PINK }}>
                What I work with.
              </p>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {resume.skills.map((skill) => (
                  <div key={skill.name}>
                    <p className="text-[16px] font-medium text-white">{skill.name}</p>
                    {skill.keywords && (
                      <p className="mt-2 text-[16px] leading-[1.7]" style={{ color: UI_TEXT_MUTED }}>
                        {skill.keywords.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.awards && resume.awards.length > 0 && (
            <div className="mt-10 border-t pt-8" style={{ borderColor: UI_BORDER }}>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-[16px]" style={{ color: UI_TEXT_MUTED }}>
                {resume.awards.map((award) => (
                  <span key={award.title}>
                    {award.title} <span style={{ color: UI_TEXT_MUTED, opacity: 0.6 }}>· {award.awarder}, {award.date?.slice(0, 4)}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl border-t pt-8" style={{ borderColor: UI_BORDER }}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.35fr)] lg:gap-16">
            <div className="space-y-3">
              <p className="font-hedvig text-[20px] text-white">{resume.basics.name}</p>
              <p className="max-w-md text-[16px] leading-[1.7]" style={{ color: UI_TEXT_SOFT }}>
                {resume.basics.label}
              </p>
              <p className="text-[16px] leading-[1.7]" style={{ color: UI_TEXT_MUTED }}>
                {footerMeta}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.2em]" style={{ color: UI_PINK }}>
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
                <p className="text-[12px] font-medium uppercase tracking-[0.2em]" style={{ color: UI_PINK }}>
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
                <p className="text-[12px] font-medium uppercase tracking-[0.2em]" style={{ color: UI_PINK }}>
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
                <p className="text-[12px] font-medium uppercase tracking-[0.2em]" style={{ color: UI_PINK }}>
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
