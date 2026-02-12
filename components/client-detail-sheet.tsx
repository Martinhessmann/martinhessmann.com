'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ClientRealm } from '@/data/clients'
import { ClientDetailContent } from '@/components/client-detail-content'

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
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
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
            {/* Close + full page link */}
            <div className="absolute right-5 top-5 z-50 flex items-center gap-2 lg:right-8 lg:top-8">
              <a
                href={`/portfolio/${realm.id}`}
                className="text-[16px] text-gray-500 hover:text-gray-900"
              >
                Full page
              </a>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
              >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <ClientDetailContent realm={realm} />
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  )
}

export default ClientDetailSheet
