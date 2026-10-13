import type { ReactNode } from 'react'

type FormSectionProps = {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

function FormSection({
  title,
  description,
  children,
  className = '',
}: FormSectionProps) {
  return (
    <section
      className={[
        'rounded-2xl border border-[#dce3ec] bg-white p-6',
        'md:p-8',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[#172033]">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm leading-6 text-[#5e6b7d]">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {children}
      </div>
    </section>
  )
}

export default FormSection