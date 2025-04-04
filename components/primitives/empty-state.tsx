'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  message: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
  className?: string
  height?: string
}

export function EmptyState({
  message,
  actionLabel,
  onAction,
  icon,
  className,
  height = 'h-[120px]'
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-txt-subtle",
        height,
        className
      )}
    >
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-sm">{message}</p>

      {actionLabel && onAction && (
        <button
          className="mt-2 text-xs underline hover:text-txt-default transition-colors"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}