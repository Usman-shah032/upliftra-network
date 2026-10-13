import type { ButtonHTMLAttributes, ReactNode } from 'react'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  label: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost' | 'danger'
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

const variantClasses = {
  default:
    'border border-[#dce3ec] bg-white text-[#172033] hover:border-[#1769e0] hover:text-[#1769e0]',
  ghost:
    'border border-transparent bg-transparent text-[#5e6b7d] hover:bg-[#f4f7fb] hover:text-[#172033]',
  danger:
    'border border-transparent bg-[#fef2f2] text-[#dc2626] hover:bg-[#fee2e2]',
}

function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'default',
  className = '',
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-xl',
        'transition focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {icon}
    </button>
  )
}

export default IconButton