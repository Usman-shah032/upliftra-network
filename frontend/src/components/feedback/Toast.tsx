import type { ReactNode } from 'react'

type ToastVariant = 'info' | 'success' | 'warning' | 'danger'

type ToastProps = {
  variant?: ToastVariant
  title?: string
  message: ReactNode
  onClose?: () => void
}

const variantClasses: Record<ToastVariant, string> = {
  info: 'border-[#2563eb]/20 bg-white text-[#2563eb]',
  success: 'border-[#16a34a]/20 bg-white text-[#16a34a]',
  warning: 'border-[#d97706]/20 bg-white text-[#d97706]',
  danger: 'border-[#dc2626]/20 bg-white text-[#dc2626]',
}

const iconClasses: Record<ToastVariant, string> = {
  info: 'bg-[#eff6ff] text-[#2563eb]',
  success: 'bg-[#f0fdf4] text-[#16a34a]',
  warning: 'bg-[#fffbeb] text-[#d97706]',
  danger: 'bg-[#fef2f2] text-[#dc2626]',
}

const icons: Record<ToastVariant, string> = {
  info: 'i',
  success: '✓',
  warning: '!',
  danger: '×',
}

function Toast({
  variant = 'info',
  title,
  message,
  onClose,
}: ToastProps) {
  return (
    <div
      role="status"
      className={[
        'flex w-full max-w-sm items-start gap-3 rounded-xl border p-4',
        'shadow-[0_8px_24px_rgba(23,32,51,0.08)]',
        variantClasses[variant],
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          'text-sm font-bold',
          iconClasses[variant],
        ].join(' ')}
      >
        {icons[variant]}
      </span>

      <div className="min-w-0 flex-1">
        {title && (
          <p className="text-sm font-semibold text-[#172033]">
            {title}
          </p>
        )}

        <div className="mt-1 text-sm leading-5 text-[#5e6b7d]">
          {message}
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-lg leading-none text-[#8b96a7] transition hover:bg-[#f4f7fb] hover:text-[#172033]"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default Toast