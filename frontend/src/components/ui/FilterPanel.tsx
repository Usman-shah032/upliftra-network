import type { ReactNode } from 'react'

type FilterPanelProps = {
  title?: string
  children: ReactNode
  onApply?: () => void
  onReset?: () => void
  applyLabel?: string
  resetLabel?: string
  className?: string
}

function FilterPanel({
  title = 'Filters',
  children,
  onApply,
  onReset,
  applyLabel = 'Apply Filters',
  resetLabel = 'Reset',
  className = '',
}: FilterPanelProps) {
  return (
    <aside
      className={[
        'w-full rounded-2xl border border-[#dce3ec] bg-white',
        'shadow-[0_1px_3px_rgba(23,32,51,0.06)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="border-b border-[#dce3ec] px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-[#172033]">
            {title}
          </h2>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-sm font-medium text-[#1769e0] transition hover:text-[#0b1f3a]"
            >
              {resetLabel}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        {children}
      </div>

      {onApply && (
        <div className="border-t border-[#dce3ec] px-5 py-4">
          <button
            type="button"
            onClick={onApply}
            className="w-full rounded-xl bg-[#1769e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b1f3a]"
          >
            {applyLabel}
          </button>
        </div>
      )}
    </aside>
  )
}

export default FilterPanel