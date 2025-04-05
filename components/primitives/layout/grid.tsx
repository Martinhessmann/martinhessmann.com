import { cn } from '@/lib/utils'
import { theme } from '@/lib/theme'

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: keyof typeof theme.grid.gap
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function Grid({
  gap = 'DEFAULT',
  columns = theme.grid.columns,
  className,
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        {
          'gap-2': gap === 'sm',
          'gap-4': gap === 'DEFAULT',
          'gap-6': gap === 'lg',
        },
        {
          'grid-cols-1': true,
          [`sm:grid-cols-${columns.sm || 1}`]: columns.sm,
          [`md:grid-cols-${columns.md || columns.sm || 2}`]: columns.md,
          [`lg:grid-cols-${columns.lg || columns.md || 3}`]: columns.lg,
          [`xl:grid-cols-${columns.xl || columns.lg || 4}`]: columns.xl,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}