import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Martin Heßmann - Digital Product Manager & UX Designer',
  description: 'Personal website of Martin Heßmann, a Digital Product Manager and UX Designer based in Berlin, Germany.',
  manifest: '/favicons/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    shortcut: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
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
    <html lang="en" className="scroll-smooth">
      <body className="font-sans h-screen overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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