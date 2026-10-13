type ProgressBarProps = {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100
  const percentage = Math.min(
    100,
    Math.max(0, (value / safeMax) * 100),
  )

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-4">
          {label && (
            <span className="text-sm font-medium text-[#172033]">
              {label}
            </span>
          )}

          {showValue && (
            <span className="text-sm font-semibold text-[#1769e0]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={[
          'w-full overflow-hidden rounded-full bg-[#dce3ec]',
          sizeClasses[size],
        ].join(' ')}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-[#1769e0] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar