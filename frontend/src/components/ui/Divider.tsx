import type { HTMLAttributes, ReactNode } from 'react'

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode
  orientation?: 'horizontal' | 'vertical'
}

function Divider({
  label,
  orientation = 'horizontal',
  className = '',
  ...props
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={[
          'h-full w-px bg-[#dce3ec]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    )
  }

  if (!label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={[
          'h-px w-full bg-[#dce3ec]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    )
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={[
        'flex w-full items-center gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="h-px flex-1 bg-[#dce3ec]" />

      <span className="shrink-0 text-xs font-medium text-[#8b96a7]">
        {label}
      </span>

      <span className="h-px flex-1 bg-[#dce3ec]" />
    </div>
  )
}

export default Divider