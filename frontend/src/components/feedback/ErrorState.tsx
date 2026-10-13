import type { ReactNode } from 'react'

type ErrorStateProps = {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this content. Please try again.',
  icon,
  action,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-[#dc2626]/15 bg-white px-6 py-12 text-center">
      {icon ? (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef2f2] text-[#dc2626]">
          {icon}
        </div>
      ) : (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef2f2] text-xl font-bold text-[#dc2626]">
          !
        </div>
      )}

      <h3 className="text-lg font-semibold text-[#172033]">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#5e6b7d]">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export default ErrorState