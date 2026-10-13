import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  title?: string
  description?: string
  action?: ReactNode
  eyebrow?: string
  className?: string
  contentClassName?: string
}

function Section({
  children,
  title,
  description,
  action,
  eyebrow,
  className = '',
  contentClassName = '',
}: SectionProps) {
  return (
    <section
      className={[
        'w-full py-12 md:py-16',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {(eyebrow || title || description || action) && (
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1769e0]">
                {eyebrow}
              </p>
            )}

            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-[#172033] md:text-3xl">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#5e6b7d]">
                {description}
              </p>
            )}
          </div>

          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </div>
      )}

      <div className={contentClassName}>
        {children}
      </div>
    </section>
  )
}

export default Section