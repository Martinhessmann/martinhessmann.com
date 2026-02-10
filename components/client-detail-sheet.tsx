'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ClientRealm } from '@/data/clients'

interface ClientDetailSheetProps {
  realm: ClientRealm | null
  open: boolean
  onClose: () => void
}

export function ClientDetailSheet({ realm, open, onClose }: ClientDetailSheetProps) {
  return (
    <AnimatePresence>
      {open && realm && (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Clickable backdrop */}
          <button
            type="button"
            aria-label="Close client details"
            className="absolute inset-0 h-full w-full cursor-pointer"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.section
            className="relative z-10 w-full max-w-4xl rounded-t-3xl bg-white shadow-2xl ring-1 ring-gray-200/70"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`client-${realm.id}-title`}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-4">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            <div className="space-y-8 px-6 pb-8 pt-5 md:px-10 md:pb-10">
              {/* Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={realm.logo}
                    alt={realm.client}
                    className="h-6 w-auto object-contain opacity-70"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[14px] text-gray-900" id={`client-${realm.id}-title`}>
                      {realm.client}
                    </p>
                    <p className="text-[13px] text-gray-500">
                      since {realm.since} · {realm.realm}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50"
                >
                  <span className="text-[16px]">&times;</span>
                </button>
              </div>

              {/* System + key moment */}
              <div className="space-y-3">
                <p className="font-hedvig text-[19px] leading-[1.55] text-gray-800">{realm.hook}</p>
                <p className="text-[16px] leading-[1.6] text-gray-600">{realm.system}</p>
              </div>

              <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
                {/* Narrative + lists */}
                <div className="space-y-7">
                  <section className="space-y-3">
                    <p className="text-[11px] uppercase text-gray-400">Key moment</p>
                    <blockquote className="border-l-2 border-gray-300 pl-4">
                      <p className="font-hedvig text-[17px] leading-[1.55] text-gray-700">
                        &ldquo;{realm.keyMoment}&rdquo;
                      </p>
                    </blockquote>
                  </section>

                  <section className="space-y-3">
                    <p className="text-[11px] uppercase text-gray-400">What I owned end-to-end</p>
                    <ul className="space-y-2">
                      {realm.ownedEndToEnd.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[15px] leading-[1.5] text-gray-700"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <p className="text-[11px] uppercase text-gray-400">Deliverables that keep working</p>
                    <ul className="space-y-2">
                      {realm.lastingDeliverables.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[15px] leading-[1.5] text-gray-700"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Assets column */}
                <div className="space-y-5">
                  {realm.assets && realm.assets.length > 0 && (
                    <section className="space-y-3">
                      <p className="text-[11px] uppercase text-gray-400">Selected moments</p>
                      <div className="space-y-3">
                        {realm.assets.map((asset) =>
                          asset.src ? (
                            <figure
                              key={asset.caption}
                              className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
                            >
                              <img
                                src={asset.src}
                                alt={asset.alt}
                                className="h-auto w-full object-cover"
                              />
                              <figcaption className="px-4 py-3 text-[13px] text-gray-600">
                                {asset.caption}
                              </figcaption>
                            </figure>
                          ) : (
                            <p
                              key={asset.caption}
                              className="rounded-xl bg-gray-50 px-4 py-3 text-[14px] leading-[1.5] text-gray-700"
                            >
                              {asset.caption}
                            </p>
                          ),
                        )}
                      </div>
                    </section>
                  )}

                  {realm.disciplines.length > 0 && (
                    <section className="space-y-2">
                      <p className="text-[11px] uppercase text-gray-400">Disciplines</p>
                      <div className="flex flex-wrap gap-2">
                        {realm.disciplines.map((discipline) => (
                          <span
                            key={discipline}
                            className="rounded-full border border-gray-300 bg-transparent px-3 py-1 text-[13px] text-gray-700"
                          >
                            {discipline}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5">
                {realm.retrospectivePath ? (
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-transparent px-5 py-2.5 text-[14px] text-gray-950 transition-colors hover:border-gray-950"
                  >
                    Read full retrospective
                    <span className="text-[12px]">&rarr;</span>
                  </a>
                ) : (
                  <span className="text-[13px] text-gray-400">
                    Detailed retrospective available on request.
                  </span>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ClientDetailSheet

