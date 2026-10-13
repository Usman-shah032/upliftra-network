import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  loading?: boolean
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1769e0] text-white hover:bg-[#0b1f3a] focus-visible:ring-[#1769e0]',
  secondary:
    'bg-[#0b1f3a] text-white hover:bg-[#12345f] focus-visible:ring-[#0b1f3a]',
  outline:
    'border border-[#dce3ec] bg-white text-[#172033] hover:border-[#1769e0] hover:text-[#1769e0] focus-visible:ring-[#1769e0]',
  ghost:
    'bg-transparent text-[#172033] hover:bg-[#f4f7fb] hover:text-[#1769e0] focus-visible:ring-[#1769e0]',
}

function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3',
        'text-sm font-semibold',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-4',
        'disabled:pointer-events-none disabled:opacity-60',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}

      {children}
    </button>
  )
}

export default Button