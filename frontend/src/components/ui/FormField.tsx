import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
  className?: string
}

function FormField({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div
      className={[
        'space-y-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold text-[#172033]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[#dc2626]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {error ? (
        <p className="text-sm text-[#dc2626]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-[#5e6b7d]">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export default FormField