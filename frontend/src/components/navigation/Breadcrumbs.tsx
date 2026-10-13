import type { ReactNode } from 'react'

type BreadcrumbItem = {
  label: string
  href?: string
  icon?: ReactNode
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

function Breadcrumbs({
  items,
  className = '',
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={['w-full', className].filter(Boolean).join(' ')}
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {index > 0 && (
                <svg
                  aria-hidden="true"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#8b96a7]"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}

              {isLast || !item.href ? (
                <span
                  className={[
                    'flex items-center gap-1.5',
                    isLast
                      ? 'font-medium text-[#172033]'
                      : 'text-[#5e6b7d]',
                  ].join(' ')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 text-[#5e6b7d] transition-colors hover:text-[#1769e0]"
                >
                  {item.icon}
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs