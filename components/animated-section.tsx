"use client"

import { useEffect, useRef, useState } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  immediate?: boolean // For first section to avoid layout shift
}

export function AnimatedSection({ children, delay = 0, className = '', immediate = false }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(immediate) // Start visible if immediate
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    
    // If immediate, skip animation
    if (immediate) {
      setIsVisible(true)
      return
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Unobserve after animation to improve performance
            if (ref.current) {
              observer.unobserve(ref.current)
            }
          }
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px -30px 0px',
        }
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [immediate])

  // On mobile, reduce animation distance and make it faster
  const isMobile = mounted && typeof window !== 'undefined' && window.innerWidth < 768
  const translateY = isMobile ? 'translate-y-2' : 'translate-y-6'
  const duration = isMobile ? 'duration-500' : 'duration-700'

  return (
    <div
      ref={ref}
      className={`print:!opacity-100 print:!translate-y-0 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : `opacity-0 ${translateY}`
      } transition-all ${duration} ease-out will-change-[opacity,transform] ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}
