type TablePaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: TablePaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <div
      className={[
        'flex flex-wrap items-center justify-between gap-4',
        'border-t border-[#dce3ec] bg-white px-5 py-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="text-sm text-[#5e6b7d]">
        Page{' '}
        <span className="font-semibold text-[#172033]">
          {currentPage}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-[#172033]">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className="rounded-lg border border-[#dce3ec] bg-white px-3 py-2 text-sm font-medium text-[#172033] transition hover:border-[#1769e0] hover:text-[#1769e0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="rounded-lg border border-[#dce3ec] bg-white px-3 py-2 text-sm font-medium text-[#172033] transition hover:border-[#1769e0] hover:text-[#1769e0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TablePagination