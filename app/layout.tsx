import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Martin Heßmann – Digital Design Manager & Product Generalist',
  description: 'Martin Heßmann – Digital Design Manager & Product Generalist. Digital product leader blending design systems, UX, and engineering to launch high-performing marketing sites and applications. Experienced guiding startups and enterprises from discovery through delivery, pairing qualitative insights with measurable business impact.',
  metadataBase: new URL('https://martinhessmann.com'),
  alternates: {
    canonical: '/',
  },
  manifest: '/favicons/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    shortcut: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Martin Heßmann – Digital Design Manager & Product Generalist',
    description: 'Martin Heßmann – Digital Design Manager & Product Generalist. Digital product leader blending design systems, UX, and engineering to launch high-performing marketing sites and applications. Experienced guiding startups and enterprises from discovery through delivery, pairing qualitative insights with measurable business impact.',
    url: 'https://martinhessmann.com',
    siteName: 'Martin Heßmann',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Martin Heßmann – Digital Design Manager & Product Generalist'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martin Heßmann – Digital Design Manager & Product Generalist',
    description: 'Martin Heßmann – Digital Design Manager & Product Generalist. Digital product leader blending design systems, UX, and engineering to launch high-performing marketing sites and applications. Experienced guiding startups and enterprises from discovery through delivery, pairing qualitative insights with measurable business impact.',
    images: ['/images/og.png'],
  },
  appleWebApp: {
    title: 'Martin Heßmann',
    statusBarStyle: 'default',
    capable: true,
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}