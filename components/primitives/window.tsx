import { cn } from '@/lib/utils'
import { theme } from '@/lib/theme'
import { Card } from '@/components/ui/card'

interface WindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  isActive?: boolean
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
}

export function Window({
  title,
  isActive = false,
  onClose,
  onMinimize,
  onMaximize,
  className,
  children,
  ...props
}: WindowProps) {
  return (
    <Card
      className={cn(
        'flex flex-col',
        'min-w-[320px] min-h-[200px]',
        'border border-border',
        'bg-card text-card-foreground',
        'shadow-sm',
        'transition-shadow duration-200',
        isActive && 'shadow-lg',
        className
      )}
      {...props}
    >
      {/* Window Header */}
      <div
        className={cn(
          'flex items-center gap-2',
          'px-3 py-2',
          'border-b border-border',
          'bg-secondary'
        )}
      >
        {/* Window Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onClose}
            className={cn(
              'w-3 h-3 rounded-full',
              'bg-destructive/90 hover:bg-destructive',
              'transition-colors duration-200'
            )}
          />
          <button
            onClick={onMinimize}
            className={cn(
              'w-3 h-3 rounded-full',
              'bg-yellow-500/90 hover:bg-yellow-500',
              'transition-colors duration-200'
            )}
          />
          <button
            onClick={onMaximize}
            className={cn(
              'w-3 h-3 rounded-full',
              'bg-green-500/90 hover:bg-green-500',
              'transition-colors duration-200'
            )}
          />
        </div>

        {/* Window Title */}
        <h2 className={cn(
          'flex-1 text-center text-sm font-medium',
          'text-muted-foreground'
        )}>
          {title}
        </h2>

        {/* Spacer to center title */}
        <div className="w-[52px]" />
      </div>

      {/* Window Content */}
      <div className="flex-1 p-4 overflow-auto">
        {children}
      </div>
    </Card>
  )
}