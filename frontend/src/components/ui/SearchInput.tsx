import {
  useEffect,
  useState,
  type InputHTMLAttributes,
} from 'react'

type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  debounceMs?: number
  className?: string
}

function SearchInput({
  value = '',
  onChange,
  onSearch,
  debounceMs = 300,
  placeholder = 'Search...',
  className = '',
  ...props
}: SearchInputProps) {
  const [query, setQuery] = useState(value)

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    if (!onSearch) return

    const timer = window.setTimeout(() => {
      onSearch(query.trim())
    }, debounceMs)

    return () => {
      window.clearTimeout(timer)
    }
  }, [query, debounceMs, onSearch])

  const handleChange = (nextValue: string) => {
    setQuery(nextValue)
    onChange?.(nextValue)
  }

  const handleClear = () => {
    handleChange('')
  }

  return (
    <div className="relative w-full">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#8b96a7]"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      </span>

      <input
        {...props}
        type="search"
        value={query}
        placeholder={placeholder}
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSearch?.(query.trim())
          }

          props.onKeyDown?.(event)
        }}
        className={[
          'w-full rounded-xl border border-[#dce3ec] bg-white',
          'py-3 pl-11 pr-11 text-sm text-[#172033]',
          'placeholder:text-[#8b96a7]',
          'transition-all duration-200',
          'focus:border-[#1769e0] focus:ring-4 focus:ring-[#1769e0]/10',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#8b96a7] transition hover:text-[#172033]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchInput