'use client'

import { useState } from 'react'
import { CLIENT_REALMS, type ClientRealm } from '@/data/clients'
import ClientDetailSheet from '@/components/client-detail-sheet'

function computeAllClientLogos(realms: ClientRealm[]) {
  const seen = new Set<string>()
  const logos: { name: string; src: string }[] = []
  realms.forEach((realm) => {
    if (realm.logo && !seen.has(realm.logo)) {
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
    <main className="min-h-screen bg-warm font-inter tracking-normal text-gray-900">
      {/* ━━━━━━━━━━━━ Hero ━━━━━━━━━━━━ */}
      <section className="flex min-h-[85vh] flex-col justify-center bg-warm px-6 lg:px-12">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="text-center">
            <span className="block text-[clamp(40px,7vw,72px)] font-normal leading-[1.1] text-gray-950">
              Sit with it
            </span>
            <span className="font-hedvig block text-[clamp(40px,7vw,72px)] font-normal leading-[1.1] text-gray-950/30">
              until it talks.
            </span>
          </h1>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ Client realms ━━━━━━━━━━━━ */}
      <section className="bg-warm px-6 pt-24 pb-32 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-16 text-[16px] text-gray-950/35">
            Where I dug in.
          </p>

          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-8 md:gap-y-16 md:items-start">
            {CLIENT_REALMS.map((realm) => (
              <article
                key={realm.id}
                className="group cursor-pointer"
                onClick={() => setActiveRealmId(realm.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveRealmId(realm.id)
                  }
                }}
                aria-label={`Open details for ${realm.client}`}
              >
                {/* Image — portrait, card styling on image wrapper only */}
                <div className="overflow-hidden rounded-2xl bg-gray-950/[0.04] shadow-sm transition-shadow group-hover:shadow-md">
                  <div className="aspect-[3/4]" />
                </div>

                {/* Text below — logo + name + hook, no card wrapper */}
                <div className="mt-5 space-y-1">
                  <div className="flex items-center gap-2.5">
                    {realm.logo && (
                      <img
                        src={realm.logo}
                        alt=""
                        className="h-4 w-auto object-contain opacity-40"
                      />
                    )}
                    <h2 className="text-[21px] font-normal leading-[1.3] text-gray-950">
                      {realm.client}
                    </h2>
                  </div>
                  <p className="font-hedvig text-[16px] leading-[1.5] text-gray-950/40">
                    {realm.hook}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ Footer ━━━━━━━━━━━━ */}
      <footer className="bg-gray-950 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <p className="text-[16px] text-gray-500">
            People I built with.
          </p>
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
            <div className="flex flex-wrap gap-6 text-[16px] text-gray-500">
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
