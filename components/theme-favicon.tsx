'use client'

import Image from 'next/image'
import { useThemeStore } from '@/lib/store/theme-store'

interface ThemeFaviconProps {
  className?: string
  size?: number
}

export function ThemeFavicon({ className = '', size = 14 }: ThemeFaviconProps) {
  const { resolvedTheme } = useThemeStore()

  // Choose favicon based on theme
  const faviconSrc = resolvedTheme === 'light'
    ? '/favicons/favicon.svg'
    : '/favicons/favicon-white.svg'

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src={faviconSrc}
        alt="MH Logo"
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority
      />
    </div>
  )
}