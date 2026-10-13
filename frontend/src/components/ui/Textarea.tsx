import type {
  TextareaHTMLAttributes,
} from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
  hint?: string
}

function Textarea({
  label,
  error,
  hint,
  className = '',
  id,
  name,
  ...props
}: TextareaProps) {
  const textareaId = id ?? name

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-2 block text-sm font-semibold text-[#172033]"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${textareaId}-error`
            : hint
              ? `${textareaId}-hint`
              : undefined
        }
        className={[
          'min-h-32 w-full resize-y rounded-xl border bg-white px-4 py-3',
          'text-sm leading-6 text-[#172033]',
          'placeholder:text-[#8b96a7]',
          'transition-all duration-200',
          'focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10',
          'disabled:cursor-not-allowed disabled:bg-[#f4f7fb] disabled:opacity-70',
          error
            ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/10'
            : 'border-[#dce3ec]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />

      {error && (
        <p
          id={`${textareaId}-error`}
          className="mt-2 text-sm text-[#dc2626]"
        >
          {error}
        </p>
      )}

      {!error && hint && (
        <p
          id={`${textareaId}-hint`}
          className="mt-2 text-sm text-[#5e6b7d]"
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export default Textarea