import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

function Card({
  children,
  hover = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-[#dce3ec] bg-white shadow-[0_1px_3px_rgba(23,32,51,0.06)]',
        paddingClasses[padding],
        hover
          ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8d2df] hover:shadow-[0_8px_24px_rgba(23,32,51,0.08)]'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card