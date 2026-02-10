'use client'

import { useState } from 'react'
import { CLIENT_REALMS, type ClientRealm } from '@/data/clients'
import ClientDetailSheet from '@/components/client-detail-sheet'

function computeAllClientLogos(realms: ClientRealm[]) {
  const seen = new Set<string>()
  const logos: { name: string; src: string }[] = []
  realms.forEach((realm) => {
    if (!seen.has(realm.logo)) {
      seen.add(realm.logo)
      logos.push({ name: realm.client, src: realm.logo })
    }
  })
  return logos
}

const ALL_CLIENT_LOGOS = computeAllClientLogos(CLIENT_REALMS)

export default function PortfolioPage() {
  const [activeRealmId, setActiveRealmId] = useState<string | null>(null)
  const activeRealm = CLIENT_REALMS.find((realm) => realm.id === activeRealmId) ?? null

  return (
    <main className="min-h-screen bg-[#f4f2ee] font-inter tracking-normal text-gray-900">
      {/* ━━━━━━━━━━━━ Hero ━━━━━━━━━━━━ */}
      <section className="flex min-h-[85vh] flex-col justify-center bg-[#f4f2ee] px-6 lg:px-12">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="text-center">
            <span className="block text-[clamp(40px,7vw,72px)] font-normal leading-[1.1] text-gray-950">
              Sit with it
            </span>
            <span className="font-hedvig block text-[clamp(40px,7vw,72px)] font-normal leading-[1.1] text-gray-950/40">
              until it talks.
            </span>
          </h1>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ Client realms: one mood image per client ━━━━━━━━━━━━ */}
      <section className="bg-[#f4f2ee] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div>
            <p className="text-[13px] uppercase text-gray-400">Work</p>
          </div>

          <div className="space-y-14">
            {CLIENT_REALMS.map((realm) => (
              <article
                key={realm.id}
                className="group cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <button
                  type="button"
                  className="flex w-full flex-col overflow-hidden text-left"
                  onClick={() => setActiveRealmId(realm.id)}
                  aria-label={`Open details for ${realm.client}`}
                >
                  {/* Mood image with logo overlay */}
                  <div className="relative">
                    <img
                      src={realm.moodImage}
                      alt={realm.client}
                      className="h-[260px] w-full object-cover sm:h-[320px]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center gap-3">
                        <img
                          src={realm.logo}
                          alt={realm.client}
                          className="h-5 w-auto object-contain brightness-0 invert opacity-80"
                        />
                        <span className="text-[13px] text-white/70">since {realm.since}</span>
                      </div>
                      <h2 className="mt-3 text-[30px] font-normal leading-[1.2] text-white">
                        {realm.client}
                      </h2>
                      <p className="font-hedvig mt-2 max-w-xl text-[18px] leading-[1.5] text-white/80">
                        {realm.hook}
                      </p>
                    </div>
                  </div>

                  {/* Short structural line below the image */}
                  <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-8">
                    <p className="max-w-xl text-[14px] leading-[1.5] text-gray-600">
                      {realm.system}
                    </p>
                    <div className="hidden items-center gap-2 md:flex">
                      <span className="text-[12px] uppercase text-gray-400">View details</span>
                      <span className="text-[18px] text-gray-500 group-hover:text-gray-900">
                        ↗
                      </span>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ Footer: all client logos on dark ━━━━━━━━━━━━ */}
      <footer className="bg-gray-950 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <p className="text-[13px] uppercase text-gray-500">Clients</p>
          <div className="flex flex-wrap items-center gap-8">
            {ALL_CLIENT_LOGOS.map((logo) => (
              <span key={logo.src} className="inline-flex items-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-6 w-auto object-contain brightness-0 invert opacity-40 transition-opacity hover:opacity-75"
                />
              </span>
            ))}
          </div>

          <div className="space-y-4 border-t border-gray-800 pt-8">
            <p className="text-[16px] text-gray-400">Martin Hessmann — Berlin</p>
            <div className="flex flex-wrap gap-6 text-[14px] text-gray-500">
              <a
                href="mailto:hello@martinhessmann.com"
                className="underline decoration-gray-700 underline-offset-4 transition-colors hover:text-gray-300 hover:decoration-gray-400"
              >
                Email
              </a>
              <a
                href="#"
                className="underline decoration-gray-700 underline-offset-4 transition-colors hover:text-gray-300 hover:decoration-gray-400"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Detail sheet overlay */}
      <ClientDetailSheet
        realm={activeRealm}
        open={Boolean(activeRealm)}
        onClose={() => setActiveRealmId(null)}
      />
    </main>
  )
}

