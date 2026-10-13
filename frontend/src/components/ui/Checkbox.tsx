import type { InputHTMLAttributes } from 'react'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  description?: string
  error?: string
}

function Checkbox({
  label,
  description,
  error,
  className = '',
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id ?? props.name

  return (
    <div>
      <label
        htmlFor={checkboxId}
        className="flex cursor-pointer items-start gap-3"
      >
        <input
          id={checkboxId}
          type="checkbox"
          aria-invalid={Boolean(error)}
          className={[
            'mt-0.5 h-4 w-4 shrink-0 appearance-none rounded border',
            'border-[#c8d2df] bg-white',
            'checked:border-[#1769e0] checked:bg-[#1769e0]',
            'focus:outline-none focus:ring-4 focus:ring-[#1769e0]/10',
            'transition-all duration-200',
            'checked:after:block',
            'checked:after:ml-[5px] checked:after:mt-[2px]',
            'checked:after:h-[7px] checked:after:w-[4px]',
            'checked:after:rotate-45',
            'checked:after:border-b-2 checked:after:border-r-2',
            'checked:after:border-white',
            'disabled:cursor-not-allowed disabled:opacity-60',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

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
      </label>

      {error && (
        <p className="mt-2 text-sm text-[#dc2626]">
          {error}
        </p>
      )}
    </div>
  )
}

export default Checkbox