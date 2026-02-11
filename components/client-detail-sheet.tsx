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
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col rounded-t-3xl bg-white shadow-2xl ring-1 ring-gray-200/70"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`client-${realm.id}-title`}
          >
            {/* Drag handle */}
            <div className="flex shrink-0 justify-center pt-4">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            <div className="min-h-0 flex-1 space-y-8 overflow-y-auto px-6 pb-8 pt-5 md:px-10 md:pb-10">
              {/* Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {realm.logo && (
                    <img
                      src={realm.logo}
                      alt=""
                      className="h-6 w-auto object-contain opacity-70"
                    />
                  )}
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[16px] text-gray-900" id={`client-${realm.id}-title`}>
                      {realm.client}
                    </p>
                    <p className="text-[16px] text-gray-950/35">
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
                <p className="font-hedvig text-[21px] leading-[1.55] text-gray-800">{realm.hook}</p>
                <p className="text-[16px] leading-[1.6] text-gray-600">{realm.system}</p>
              </div>

              <div className="space-y-8">
                {/* Key moment */}
                <section className="space-y-3">
                  <p className="text-[16px] text-gray-950/35">Where it turned.</p>
                  <blockquote className="border-l-2 border-gray-300 pl-4">
                    <p className="font-hedvig text-[21px] leading-[1.55] text-gray-700">
                      &ldquo;{realm.keyMoment}&rdquo;
                    </p>
                  </blockquote>
                </section>

                {/* Images with captions — primary content, no bullet lists */}
                {realm.assets && realm.assets.length > 0 && (
                  <section className="space-y-4">
                    <p className="text-[16px] text-gray-950/35">From inside the work.</p>
                    <div className="space-y-6">
                      {realm.assets.map((asset) => (
                        <figure
                          key={asset.caption}
                          className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
                        >
                          {asset.src ? (
                            <img
                              src={asset.src}
                              alt={asset.alt}
                              className="aspect-[16/10] w-full max-w-[560px] object-cover"
                            />
                          ) : (
                            <div className="aspect-[16/10] w-full max-w-[560px] bg-gray-200/50" />
                          )}
                          <figcaption className="px-4 py-3 text-[16px] text-gray-600">
                            {asset.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                )}

                {realm.disciplines.length > 0 && (
                  <section className="space-y-2">
                    <p className="text-[16px] text-gray-950/35">What I brought.</p>
                    <div className="flex flex-wrap gap-2">
                      {realm.disciplines.map((discipline) => (
                        <span
                          key={discipline}
                          className="rounded-full border border-gray-300 bg-transparent px-3 py-1 text-[16px] text-gray-700"
                        >
                          {discipline}
                        </span>
                      ))}
                    </div>
                  </section>
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

