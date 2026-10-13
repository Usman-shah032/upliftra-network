import type {
  SelectHTMLAttributes,
  ReactNode,
} from 'react'

type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
  placeholder?: string
  startIcon?: ReactNode
}

function Select({
  label,
  error,
  hint,
  options,
  placeholder,
  startIcon,
  className = '',
  id,
  name,
  ...props
}: SelectProps) {
  const selectId = id ?? name

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-sm font-semibold text-[#172033]"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-[#8b96a7]">
            {startIcon}
          </div>
        )}

        <select
          id={selectId}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
          }
          className={[
            'w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-11',
            'text-sm text-[#172033]',
            'transition-all duration-200',
            'focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10',
            'disabled:cursor-not-allowed disabled:bg-[#f4f7fb] disabled:opacity-70',
            error
              ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/10'
              : 'border-[#dce3ec]',
            startIcon ? 'pl-11' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#8b96a7]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {error && (
        <p
          id={`${selectId}-error`}
          className="mt-2 text-sm text-[#dc2626]"
        >
          {error}
        </p>
      )}

      {!error && hint && (
        <p
          id={`${selectId}-hint`}
          className="mt-2 text-sm text-[#5e6b7d]"
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export default Select