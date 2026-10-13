type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
}

function Spinner({ size = 'md', label = 'Loading' }: SpinnerProps) {
  return (
    <div
      className="inline-flex items-center justify-center gap-3"
      role="status"
      aria-label={label}
    >
      <span
        aria-hidden="true"
        className={[
          'animate-spin rounded-full border-[#dce3ec] border-t-[#1769e0]',
          sizeClasses[size],
        ].join(' ')}
      />

      <span className="sr-only">{label}</span>
    </div>
  )
}

export default Spinner