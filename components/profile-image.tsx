import Image from 'next/image'

interface ProfileImageProps {
  className?: string
}

export function ProfileImage({ className = '' }: ProfileImageProps) {
  return (
    <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary ${className}`}>
      <Image
        src="/images/profile.png"
        alt="Martin Heßmann"
        fill
        sizes="(max-width: 768px) 128px, 160px"
        priority
        className="object-cover"
      />
    </div>
  )
}