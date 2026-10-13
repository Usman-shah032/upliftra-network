import type { InputHTMLAttributes, ReactNode } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
}

function Input({
  label,
  error,
  hint,
  startIcon,
  endIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-semibold text-[#172033]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#8b96a7]">
            {startIcon}
          </div>
        )}

        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={[
            'w-full rounded-xl border bg-white px-4 py-3',
            'text-sm text-[#172033]',
            'placeholder:text-[#8b96a7]',
            'transition-all duration-200',
            'focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10',
            'disabled:cursor-not-allowed disabled:bg-[#f4f7fb] disabled:opacity-70',
            error
              ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/10'
              : 'border-[#dce3ec]',
            startIcon ? 'pl-11' : '',
            endIcon ? 'pr-11' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#8b96a7]">
            {endIcon}
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-2 text-sm text-[#dc2626]"
        >
          {error}
        </p>
      )}

      {!error && hint && (
        <p
          id={`${inputId}-hint`}
          className="mt-2 text-sm text-[#5e6b7d]"
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export default Input