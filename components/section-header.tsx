interface SectionHeaderProps {
  title: string
  subtitle?: string
  id?: string
}

export function SectionHeader({ title, subtitle, id }: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-10" id={id}>
      <div className="flex items-center mb-2">
        <div className="h-1 w-8 bg-accent rounded-full mr-3"></div>
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base ml-11">{subtitle}</p>
      )}
    </div>
  )
}