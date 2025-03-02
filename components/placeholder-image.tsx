'use client'

interface PlaceholderImageProps {
  siteName?: string
  width?: number
  height?: number
}

export function PlaceholderImage({ siteName, width = 300, height = 169 }: PlaceholderImageProps) {
  // Create a deterministic color based on the site name
  const getColor = (str?: string) => {
    // Handle undefined or empty strings
    if (!str || str.length === 0) {
      return 'hsl(210, 70%, 50%)' // Default blue color
    }

    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    const hue = Math.abs(hash % 360)
    return `hsl(${hue}, 70%, 50%)`
  }

  const displayName = siteName || 'Website'
  const bgColor = getColor(siteName)
  const textColor = 'white'

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill={bgColor} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor}
        fontFamily="system-ui, sans-serif"
        fontSize="18"
        fontWeight="bold"
      >
        {displayName}
      </text>
    </svg>
  )
}