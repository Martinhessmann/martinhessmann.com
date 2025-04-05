'use client'

import { ReactNode } from 'react'
import { Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface FilterTagsProps {
  options: string[]
  selected: string
  onChange: (value: string) => void
  className?: string
  icon?: ReactNode
  allLabel?: string
}

export function FilterTags({
  options,
  selected,
  onChange,
  className,
  icon = <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />,
  allLabel = 'All'
}: FilterTagsProps) {
  return (
    <div className={cn("flex overflow-x-auto md:flex-wrap gap-2", className)}>
      <div className="flex items-center space-x-1">
        {icon}
        <div className="flex gap-1 flex-wrap">
          <Badge
            variant={selected === allLabel ? 'secondary' : 'outline'}
            className="cursor-pointer hover:bg-muted whitespace-nowrap text-xs"
            onClick={() => onChange(allLabel)}
          >
            {allLabel}
          </Badge>

          {options.map(option => (
            <Badge
              key={option}
              variant={selected === option ? 'secondary' : 'outline'}
              className="cursor-pointer hover:bg-muted whitespace-nowrap text-xs"
              onClick={() => onChange(option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}