import { useState, type ReactElement } from 'react'

type TooltipProps = {
  content: string
  children: ReactElement<{ 'aria-describedby'?: string }>
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const positionClasses = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'left-1/2 top-full mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
}

function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className={[
        'relative inline-flex',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span
          role="tooltip"
          className={[
            'pointer-events-none absolute z-50 whitespace-nowrap',
            'rounded-lg bg-[#0b1f3a] px-3 py-2',
            'text-xs font-medium text-white',
            'shadow-[0_8px_24px_rgba(23,32,51,0.18)]',
            positionClasses[position],
          ].join(' ')}
        >
          {content}
        </span>
      )}
    </span>
  )
}

export default Tooltip