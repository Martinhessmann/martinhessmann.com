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
        <>
          {/* Darkened backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet with margin-top and border-radius */}
          <motion.section
            className="fixed inset-x-0 bottom-0 top-8 z-50 flex flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl lg:top-12"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`client-${realm.id}-title`}
          >
            {/* Close button — top right, solid bg */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 lg:right-8 lg:top-8"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Hero area — generous top padding, narrow column */}
              <div className="mx-auto max-w-2xl px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
                {/* Logo or client name + year */}
                <div className="mb-12 flex items-center gap-3">
                  {realm.logo ? (
                    <img
                      src={realm.logo}
                      alt={realm.client}
                      className="h-7 w-auto object-contain opacity-60"
                    />
                  ) : (
                    <p className="text-[16px] text-gray-950/50">
                      {realm.client}
                    </p>
                  )}
                  <p className="text-[16px] text-gray-950/30" id={`client-${realm.id}-title`}>
                    since {realm.since}
                  </p>
                </div>

                {/* Hook — large serif, the opening statement */}
                <h2 className="font-hedvig text-[clamp(28px,4vw,40px)] leading-[1.35] text-gray-950">
                  {realm.hook}
                </h2>

                {/* Key moment — body text */}
                <blockquote className="mt-10 border-l-2 border-gray-300 pl-5">
                  <p className="font-hedvig text-[21px] leading-[1.6] text-gray-700">
                    {realm.keyMoment}
                  </p>
                </blockquote>
              </div>

              {/* Projects — images go wide, text stays narrow */}
              {realm.projects
                .filter((project) => project.images.length > 0)
                .map((project) => (
                  <div key={project.name} className="mb-24">
                    {/* Project name — narrow column */}
                    <div className="mx-auto max-w-2xl px-6">
                      <p className="mb-8 text-[16px] text-gray-950/30">
                        {project.name}
                      </p>
                    </div>

                    {/* Images — wider than text */}
                    <div className="mx-auto max-w-4xl space-y-16 px-6">
                      {project.images.map((img) => (
                        <figure key={img.src}>
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full"
                          />
                          <figcaption className="mx-auto mt-4 max-w-2xl text-[16px] leading-[1.6] text-gray-500">
                            {img.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Footer — disciplines, narrow column */}
              {realm.disciplines.length > 0 && (
                <div className="mx-auto max-w-2xl px-6 pb-24">
                  <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-8">
                    {realm.disciplines.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-gray-300 bg-transparent px-3 py-1 text-[16px] text-gray-700"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  )
}

export default ClientDetailSheet
