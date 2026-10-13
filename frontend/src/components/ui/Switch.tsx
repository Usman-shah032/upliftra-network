import type { InputHTMLAttributes } from 'react'

type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label?: string
  description?: string
}

function Switch({
  label,
  description,
  className = '',
  id,
  disabled,
  ...props
}: SwitchProps) {
  const switchId = id ?? props.name

  return (
    <label
      htmlFor={switchId}
      className={[
        'flex items-center justify-between gap-4',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="min-w-0">
        {label && (
          <span className="block text-sm font-medium text-[#172033]">
            {label}
          </span>
        )}

        {description && (
          <span className="mt-1 block text-sm leading-5 text-[#5e6b7d]">
            {description}
          </span>
        )}
      </span>

      <span className="relative shrink-0">
        <input
          {...props}
          id={switchId}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="peer sr-only"
        />

        <span
          aria-hidden="true"
          className={[
            'block h-6 w-11 rounded-full',
            'bg-[#c8d2df]',
            'transition-colors duration-200',
            'peer-checked:bg-[#1769e0]',
            'peer-focus-visible:ring-4 peer-focus-visible:ring-[#1769e0]/20',
            'peer-disabled:cursor-not-allowed',
            'after:absolute after:left-1 after:top-1',
            'after:h-4 after:w-4 after:rounded-full after:bg-white',
            'after:shadow-sm after:transition-transform after:duration-200',
            'peer-checked:after:translate-x-5',
          ].join(' ')}
        />
      </span>
    </label>
  )
}

export default Switch