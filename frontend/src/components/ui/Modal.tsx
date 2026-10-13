import { useEffect, type ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  closeOnOverlayClick?: boolean
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      <div
        className="absolute inset-0 bg-[#0b1f3a]/50 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        className={[
          'relative z-10 w-full rounded-2xl border border-[#dce3ec]',
          'bg-white shadow-[0_16px_40px_rgba(23,32,51,0.12)]',
          'max-h-[90vh] overflow-y-auto',
          sizeClasses[size],
        ].join(' ')}
      >
        {(title || description) && (
          <div className="border-b border-[#dce3ec] px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                {title && (
                  <h2
                    id="modal-title"
                    className="text-lg font-semibold text-[#172033]"
                  >
                    {title}
                  </h2>
                )}

                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-sm leading-6 text-[#5e6b7d]"
                  >
                    {description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl leading-none text-[#5e6b7d] transition hover:bg-[#f4f7fb] hover:text-[#172033]"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal