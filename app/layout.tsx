import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Martin Heßmann",
  description: "Personal website of Martin Heßmann",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}



import './globals.css'