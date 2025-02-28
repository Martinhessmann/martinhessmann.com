'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-muted-foreground/20 py-3 px-4 md:px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-lg hover:text-primary transition-colors">
          Martin Heßmann
        </Link>
        <ul className="flex space-x-4 md:space-x-6">
          <li>
            <Link
              href="#about"
              className="text-sm md:text-base hover:text-primary transition-colors"
              scroll={false}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#projects"
              className="text-sm md:text-base hover:text-primary transition-colors"
              scroll={false}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="#experience"
              className="text-sm md:text-base hover:text-primary transition-colors"
              scroll={false}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              href="#journey"
              className="text-sm md:text-base hover:text-primary transition-colors"
              scroll={false}
            >
              Journey
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}