'use client'

interface PlaceholderImageProps {
  domain: string
  width?: number
  height?: number
}

export function PlaceholderImage({ domain, width = 300, height = 169 }: PlaceholderImageProps) {
  // Create a deterministic color based on the domain name
  const getColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 50%)`;
  }

  const bgColor = getColor(domain);
  const textColor = 'white';

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
        {domain}
      </text>
    </svg>
  )
}