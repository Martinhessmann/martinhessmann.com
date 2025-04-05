import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Martin Heßmann - Digital Product Manager & Design Generalist',
  description: 'Personal website of Martin Heßmann, a Digital Product Manager and Design Generalist who bridges UX, development, and business needs, based in Berlin.',
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
    title: 'Martin Heßmann - Digital Product Manager & Design Generalist',
    description: 'Digital Product Manager and Design Generalist who bridges UX, development, and business needs.',
    url: 'https://martinhessmann.com',
    siteName: 'Martin Heßmann',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Martin Heßmann - Digital Product Manager & Design Generalist'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martin Heßmann - Digital Product Manager & Design Generalist',
    description: 'Digital Product Manager and Design Generalist who bridges UX, development, and business needs.',
    images: ['/images/og.png'],
  },
  appleWebApp: {
    title: 'Martin Heßmann',
    statusBarStyle: 'default',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans h-screen overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative h-screen">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}