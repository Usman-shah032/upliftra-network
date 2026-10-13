import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type DropdownItem = {
  label: string
  onClick: () => void
  disabled?: boolean
  danger?: boolean
}

type DropdownProps = {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

function Dropdown({
  trigger,
  items,
  align = 'right',
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className={[
        'relative inline-flex',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex"
      >
        {trigger}
      </button>

      {open && (
        <div
          role="menu"
          className={[
            'absolute top-full z-50 mt-2 min-w-48 overflow-hidden',
            'rounded-xl border border-[#dce3ec] bg-white p-1',
            'shadow-[0_8px_24px_rgba(23,32,51,0.12)]',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return
                item.onClick()
                setOpen(false)
              }}
              className={[
                'flex w-full items-center rounded-lg px-3 py-2.5',
                'text-left text-sm font-medium',
                'transition-colors duration-150',
                item.danger
                  ? 'text-[#dc2626] hover:bg-[#fef2f2]'
                  : 'text-[#172033] hover:bg-[#f4f7fb]',
                item.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : '',
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown