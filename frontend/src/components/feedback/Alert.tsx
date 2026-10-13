import type { HTMLAttributes, ReactNode } from 'react'

type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant
  title?: string
  children: ReactNode
}

const variantClasses: Record<AlertVariant, string> = {
  info: 'border-[#2563eb]/20 bg-[#eff6ff] text-[#2563eb]',
  success: 'border-[#16a34a]/20 bg-[#f0fdf4] text-[#16a34a]',
  warning: 'border-[#d97706]/20 bg-[#fffbeb] text-[#d97706]',
  danger: 'border-[#dc2626]/20 bg-[#fef2f2] text-[#dc2626]',
}

const icons: Record<AlertVariant, string> = {
  info: 'i',
  success: '✓',
  warning: '!',
  danger: '×',
}

function Alert({
  variant = 'info',
  title,
  children,
  className = '',
  ...props
}: AlertProps) {
  return (
    <div
      role={variant === 'danger' ? 'alert' : 'status'}
      className={[
        'flex gap-3 rounded-xl border p-4',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span
        aria-hidden="true"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-current/10 text-sm font-bold"
      >
        {icons[variant]}
      </span>

      <div className="min-w-0">
        {title && (
          <p className="font-semibold">
            {title}
          </p>
        )}

        <div className={title ? 'mt-1 text-sm leading-6 opacity-90' : 'text-sm leading-6'}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Alert