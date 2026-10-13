
type RadioOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

type RadioGroupProps = {
  name: string
  value?: string
  onChange?: (value: string) => void
  options: RadioOption[]
  label?: string
  error?: string
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

function RadioGroup({
  name,
  value,
  onChange,
  options,
  label,
  error,
  orientation = 'vertical',
  className = '',
}: RadioGroupProps) {
  return (
    <fieldset className={['w-full', className].filter(Boolean).join(' ')}>
      {label && (
        <legend className="mb-3 text-sm font-semibold text-[#172033]">
          {label}
        </legend>
      )}

      <div
        className={[
          'flex gap-4',
          orientation === 'vertical'
            ? 'flex-col'
            : 'flex-row flex-wrap',
        ].join(' ')}
      >
        {options.map((option) => {
          const checked = value === option.value

          return (
            <label
              key={option.value}
              className={[
                'flex items-start gap-3 rounded-xl border p-4',
                'cursor-pointer transition-all duration-200',
                checked
                  ? 'border-[#1769e0] bg-[#1769e0]/5'
                  : 'border-[#dce3ec] bg-white hover:border-[#c8d2df]',
                option.disabled
                  ? 'cursor-not-allowed opacity-60'
                  : '',
              ].join(' ')}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                disabled={option.disabled}
                onChange={(event) => onChange?.(event.target.value)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#1769e0]"
              />

              <span className="min-w-0">
                <span className="block text-sm font-medium text-[#172033]">
                  {option.label}
                </span>

                {option.description && (
                  <span className="mt-1 block text-sm leading-5 text-[#5e6b7d]">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          )
        })}
      </div>

      {error && (
        <p className="mt-2 text-sm text-[#dc2626]">
          {error}
        </p>
      )}
    </fieldset>
  )
}

export default RadioGroup