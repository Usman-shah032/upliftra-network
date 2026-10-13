import type { ImgHTMLAttributes } from 'react'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type AvatarProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> & {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  online?: boolean
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
}

function getInitials(name?: string) {
  if (!name?.trim()) return '?'

  const parts = name.trim().split(/\s+/)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function Avatar({
  src,
  alt,
  name,
  size = 'md',
  online = false,
  className = '',
  ...props
}: AvatarProps) {
  const initials = getInitials(name)

  return (
    <span
      className={[
        'relative inline-flex shrink-0 items-center justify-center',
        'overflow-visible rounded-full',
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {src ? (
        <img
          {...props}
          src={src}
          alt={alt ?? name ?? 'User avatar'}
          className="h-full w-full rounded-full border border-[#dce3ec] object-cover"
        />
      ) : (
        <span
          aria-label={alt ?? name ?? 'User avatar'}
          className="flex h-full w-full items-center justify-center rounded-full bg-[#0b1f3a] font-semibold text-white"
        >
          {initials}
        </span>
      )}

      {online && (
        <span
          aria-label="Online"
          className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#16a34a]"
        />
      )}
    </span>
  )
}

export default Avatar