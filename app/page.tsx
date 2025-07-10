'use client'

import { Desktop } from '../components/desktop'
import { MobileDesktop } from '../components/mobile-desktop'
import { useIsMobile } from '../hooks/use-mobile'

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <main className="w-full h-screen relative overflow-hidden">
      {isMobile ? <MobileDesktop /> : <Desktop />}
    </main>
  )
}

