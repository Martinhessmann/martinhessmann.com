'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  iconClassName?: string
}

export function SearchInput({
  className,
  iconClassName,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className={cn("h-4 w-4 text-muted-foreground", iconClassName)} />
      </div>
      <input
        type="text"
        className={cn(
          "w-full pl-10 pr-4 py-2 bg-muted/50 border border-input rounded-md",
          "focus:outline-none focus:ring-1 focus:ring-border text-sm",
          className
        )}
        {...props}
      />
    </div>
  )
}