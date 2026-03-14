'use client'

import { useMemo, useState } from 'react'
import ClientDetailSheet from '@/components/client-detail-sheet'
import { CLIENT_REALMS, type ClientRealm } from '@/data/clients'
import resumeData from '@/data/resume.json'
import type { Resume } from '@/types/resume'

const resume = resumeData as Resume

const CARD_BG_COLORS: Record<string, { bg: string; surface: string; text: string; tray: string }> = {
  teambank: { bg: '#2C9AD8', surface: '#5BB6EA', text: 'white', tray: '#8C6644' },
  'gruen-infrasignal': { bg: '#5BE290', surface: '#8AF0B4', text: 'gray-900', tray: '#B78B5A' },
  'open-wonder': { bg: '#F5E642', surface: '#FFF07A', text: 'gray-900', tray: '#9C7648' },
  'tertianum-dpf': { bg: '#F8F0E5', surface: '#FFF8F1', text: 'gray-900', tray: '#B88A5C' },
  'wo-mo-fonds': { bg: '#1E3A5F', surface: '#325783', text: 'white', tray: '#77583D' },
}

const CARD_LAYOUT = [
  { rotate: -6, translateY: 28 },
  { rotate: 3, translateY: 6 },
  { rotate: -4, translateY: 24 },
  { rotate: 4, translateY: 0 },
  { rotate: -3, translateY: 18 },
]

const TRUST_LOGOS = [
  { name: 'TeamBank', src: '/images/projects/figma-curated-tagged/clients/teambank.svg' },
  { name: 'easyCredit', src: '/images/projects/figma-curated-tagged/clients/easycredit.svg' },
  { name: 'EVG', src: '/images/projects/figma-curated-tagged/clients/evg.svg' },
  { name: 'Grün Berlin', src: '/images/projects/figma-curated-tagged/clients/gruen-berlin.svg' },
  { name: 'Hartmann', src: '/images/projects/figma-curated-tagged/clients/hartmann.svg' },
  { name: 'mobile.de', src: '/images/projects/figma-curated-tagged/clients/mobile-de.svg' },
  { name: 'Deutsche Bahn', src: '/images/projects/figma-curated-tagged/clients/deutsche-bahn.svg' },
  { name: 'E.ON', src: '/images/projects/figma-curated-tagged/clients/e-on.svg' },
  { name: 'Volkswagen Group', src: '/images/projects/figma-curated-tagged/clients/volkswagen-group.svg' },
  { name: 'Voith', src: '/images/projects/figma-curated-tagged/clients/voith.svg' },
  { name: 'GIZ', src: '/images/projects/figma-curated-tagged/clients/giz.svg' },
]

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

  const featuredWork = useMemo(() => resume.work?.slice(0, 4) ?? [], [])
  const awards = useMemo(() => resume.awards?.slice(0, 2) ?? [], [])
  const languages = useMemo(
    () =>
      (resume.languages ?? [])
        .map((entry) => `${entry.language} (${entry.fluency})`)
        .join(' · '),
    []
  )

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-gray-950 font-inter tracking-normal text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gray-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-12">
          <a href="/" className="font-hedvig text-[18px] tracking-tight text-white">
            {resume.basics.name}
          </a>
          <div className="flex items-center gap-5 text-sm text-white/72">
            <a href="/?view=resume" className="transition-colors hover:text-white">
              CV
            </a>
            <button type="button" onClick={scrollToWork} className="transition-colors hover:text-white">
              Selected cases
            </button>
          </div>
        </div>
      </header>

      <section className="px-6 pb-18 pt-28 lg:px-12 lg:pb-24 lg:pt-36">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:gap-20">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/42">
              Berlin · 10+ years · {languages}
            </p>
            <h1 className="mt-5 max-w-4xl font-hedvig text-[clamp(40px,6vw,72px)] leading-[1.02] text-white">
              Systems Designer for design, engineering, and AI.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-[18px] leading-[1.75] text-white/72 lg:text-[20px]">
              <p>
                I work where products stop being tidy: regulated platforms, civic infrastructure,
                multi-brand portfolios, and AI systems that need governance as much as interfaces.
              </p>
              <p>
                My role is to connect brand, product, content, engineering, and delivery so teams
                can keep shipping without losing clarity, maintainability, or operational control.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToWork}
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-gray-950 transition-colors hover:bg-white/90"
              >
                Open selected cases
              </button>
              <a
                href="/?view=resume"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
              >
                Open CV
              </a>
              <a
                href="/?preview=print"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
              >
                Preview PDF
              </a>
            </div>
          </div>

          <div className="border border-white/10 bg-white/[0.04] p-6 lg:p-8">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/42">
              What I do
            </p>
            <div className="mt-5 space-y-5 text-[16px] leading-[1.8] text-white/70">
              <p>
                I clarify systems before teams overbuild them: actors, constraints, governance,
                delivery paths, and the points where product and operations actually collide.
              </p>
              <p>
                Then I reduce structural friction: duplicated portals, brittle content operations,
                unclear responsibilities, unstable release setups, inaccessible flows, or AI outputs
                that can&apos;t be trusted.
              </p>
              <p>
                The strongest recent account work on this site spans TeamBank, EVG, DPF Group,
                Grün Berlin, and Open Wonder.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="px-6 pb-20 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/42">
              Selected accounts
            </p>
            <h2 className="mt-4 font-hedvig text-[clamp(28px,4vw,46px)] leading-[1.08] text-white">
              Five account stories where design, delivery, and technical change had to hold together.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.8] text-white/68 lg:text-[18px]">
              The cards stay visual, but the reading is now direct: one account name, one case hook,
              and one clear entry point into the underlying projects, responsibilities, and system work.
            </p>
          </div>

          <div className="mt-14 flex min-w-max items-end justify-center overflow-x-auto px-2 pb-6 pt-6 lg:min-w-0 lg:overflow-visible lg:px-0">
            {CLIENT_REALMS.map((realm, index) => {
              const layout = CARD_LAYOUT[index] ?? { rotate: 0, translateY: 0 }
              const colors = CARD_BG_COLORS[realm.id] ?? {
                bg: '#1f2937',
                surface: '#374151',
                text: 'white',
                tray: '#7c5b38',
              }
              const textClass = colors.text === 'white' ? 'text-white' : 'text-gray-950'
              const mutedTextClass = colors.text === 'white' ? 'text-white/72' : 'text-gray-900/68'

              return (
                <div
                  key={realm.id}
                  className="relative shrink-0 transition-transform duration-200 hover:-translate-y-2"
                  style={{
                    zIndex: CLIENT_REALMS.length - index,
                    transform: `translateY(${layout.translateY}px) rotate(${layout.rotate}deg)`,
                    marginLeft: index === 0 ? 0 : '-18px',
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-2 bottom-[-10px] top-4 rounded-[24px] opacity-85"
                    style={{ backgroundColor: colors.tray }}
                    aria-hidden="true"
                  />
                  <article
                    className="relative flex h-[255px] w-[182px] cursor-pointer flex-col overflow-hidden rounded-[24px] border border-black/10 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:h-[282px] sm:w-[210px] sm:p-4"
                    style={{ backgroundColor: colors.bg }}
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
                    <div className={`flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.18em] ${mutedTextClass}`}>
                      <span>Case study</span>
                      <span>{realm.displayName}</span>
                    </div>
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
                    <div className="mt-4 shrink-0">
                      <p className={`font-hedvig text-[15px] leading-[1.15] sm:text-[17px] ${textClass}`}>
                        {realm.hook}
                      </p>
                      <p className={`mt-2 text-[11px] leading-[1.45] sm:text-[12px] ${mutedTextClass}`}>
                        {realm.accountLine}
                      </p>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>

          <div className="mt-20 border-t border-white/10 pt-8">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/42">
              Selected clients and brands
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
              {TRUST_LOGOS.map((logo) => (
                <span key={logo.name} className="inline-flex items-center" title={logo.name}>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-6 w-auto object-contain brightness-0 invert opacity-45 transition-opacity hover:opacity-78"
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-x-14 gap-y-10 border-t border-white/10 pt-10 lg:grid-cols-2">
            {CLIENT_REALMS.map((realm) => (
              <article key={realm.id} className="space-y-3">
                <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/42">
                  {realm.displayName}
                </p>
                <h3 className="font-hedvig text-[24px] leading-[1.2] text-white">{realm.hook}</h3>
                <p className="text-[16px] leading-[1.75] text-white/65">{realm.roleSummary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/42">CV</p>
            <h2 className="mt-4 font-hedvig text-[clamp(28px,4vw,44px)] leading-[1.1] text-white">
              From visual design into systems design, delivery leadership, and AI product strategy.
            </h2>
            <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-white/68 lg:text-[18px]">
              <p>
                My background runs from UX/UI design and multi-device product work into design-system
                governance, cross-functional delivery, and product strategy for AI platforms.
              </p>
              <p>
                Languages: {languages}. Recent recognition includes {awards.map((award) => award.title).filter(Boolean).join(' and ')}.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/?view=resume"
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-gray-950 transition-colors hover:bg-white/90"
              >
                Open full CV
              </a>
              <a
                href="/?preview=print"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
              >
                Preview PDF
              </a>
            </div>
          </div>

          <div className="space-y-8">
            {featuredWork.map((entry) => (
              <article key={`${entry.name}-${entry.startDate}`} className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-hedvig text-[24px] leading-[1.2] text-white">{entry.position}</h3>
                    <p className="mt-1 text-[14px] font-medium uppercase tracking-[0.16em] text-white/42">
                      {entry.name}
                    </p>
                  </div>
                  <p className="text-[14px] font-medium text-white/42">{formatPeriod(entry.startDate, entry.endDate)}</p>
                </div>
                {entry.summary && <p className="mt-4 text-[16px] leading-[1.75] text-white/68">{entry.summary}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="font-hedvig text-[20px] text-white">{resume.basics.name}</p>
            <p className="text-[15px] leading-[1.7] text-white/55">
              {resume.basics.label} · {resume.basics.location?.city}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[15px] text-white/60">
            <a href={`mailto:${resume.basics.email}`} className="transition-colors hover:text-white">
              Email
            </a>
            <a href="/?view=resume" className="transition-colors hover:text-white">
              CV
            </a>
            <a href="/?preview=print" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              PDF
            </a>
            <a href={getProfileUrl('LinkedIn')} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              LinkedIn
            </a>
            <a href={getProfileUrl('GitHub')} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              GitHub
            </a>
            <a href={getProfileUrl('Instagram')} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              Instagram
            </a>
            <a href="/impressum" className="transition-colors hover:text-white">
              Impressum
            </a>
            <a href="/datenschutz" className="transition-colors hover:text-white">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>

      <ClientDetailSheet realm={activeRealm} open={Boolean(activeRealm)} onClose={() => setActiveRealmId(null)} />
    </main>
  )
}
