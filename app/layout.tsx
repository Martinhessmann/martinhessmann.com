import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'

const title = 'Martin Heßmann – Systems Designer'
const description = 'Martin Heßmann is a Berlin-based systems designer working across design, engineering, and AI. He structures regulated platforms, civic infrastructure, multi-brand ecosystems, and AI products so teams can ship with clarity, maintainability, and operational control.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://martinhessmann.com'),
  alternates: {
    canonical: '/',
  },
  manifest: '/favicons/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
  openGraph: {
    title,
    description,
    url: 'https://martinhessmann.com',
    siteName: 'Martin Heßmann',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Martin Heßmann – Systems Designer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
