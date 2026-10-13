import type { HTMLAttributes, ReactNode } from 'react'

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[#f4f7fb] text-[#5e6b7d] border-[#dce3ec]',
  primary: 'bg-[#1769e0]/10 text-[#1769e0] border-[#1769e0]/20',
  success: 'bg-[#f0fdf4] text-[#16a34a] border-[#16a34a]/20',
  warning: 'bg-[#fffbeb] text-[#d97706] border-[#d97706]/20',
  danger: 'bg-[#fef2f2] text-[#dc2626] border-[#dc2626]/20',
  info: 'bg-[#eff6ff] text-[#2563eb] border-[#2563eb]/20',
}

function Badge({
  children,
  variant = 'default',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-1',
        'text-xs font-semibold leading-none',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge