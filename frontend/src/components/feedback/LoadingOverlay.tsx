import type { ReactNode } from 'react'

type LoadingOverlayProps = {
  loading?: boolean
  message?: string
  children: ReactNode
  className?: string
}

function LoadingOverlay({
  loading = false,
  message = 'Loading...',
  children,
  className = '',
}: LoadingOverlayProps) {
  return (
    <div
      className={[
        'relative',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}

      {loading && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-white/75 backdrop-blur-[2px]"
          role="status"
          aria-live="polite"
          aria-label={message}
        >
          <div className="flex flex-col items-center gap-3">
            <span
              aria-hidden="true"
              className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#dce3ec] border-t-[#1769e0]"
            />

            <span className="text-sm font-medium text-[#5e6b7d]">
              {message}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoadingOverlay