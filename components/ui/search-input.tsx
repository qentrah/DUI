import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const searchInputVariants = cva(
  "flex items-center gap-2 rounded-lg border bg-background px-3 py-2 transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-border focus-within:ring-primary",
        subtle: "border-transparent bg-muted/50 focus-within:ring-primary",
        ghost: "border-transparent bg-transparent focus-within:ring-primary",
      },
      size: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)

const searchIconVariants = cva("text-muted-foreground shrink-0", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    },
  },
  defaultVariants: { size: "md" },
})

export interface SearchInputProps extends VariantProps<typeof searchInputVariants> {
  /** Input value */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether input is disabled */
  disabled?: boolean
  /** Whether to show loading state */
  loading?: boolean
  /** Custom className */
  className?: string
  /** Input ref */
  inputRef?: React.RefObject<HTMLInputElement>
  /** Auto-focus on mount */
  autoFocus?: boolean
  /** Clear handler when X button is clicked */
  onClear?: () => void
  /** Submit handler on Enter key */
  onSubmit?: (value: string) => void
}

function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  variant,
  size,
  disabled,
  loading,
  className,
  inputRef,
  autoFocus,
  onClear,
  onSubmit,
}: SearchInputProps) {
  const internalRef = React.useRef<HTMLInputElement>(null)
  const ref = inputRef || internalRef

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit?.(value)
    }
    if (e.key === "Escape" && onClear) {
      onClear()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={cn(searchInputVariants({ variant, size, className }))}>
      {loading ? (
        <svg className={cn(searchIconVariants({ size }), "animate-spin")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle className="opacity-25" cx="12" cy="12" r="10" />
          <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <svg className={searchIconVariants({ size })} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )}

      <input
        ref={ref}
        type="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />

      {value && onClear && (
        <button
          onClick={onClear}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
          tabIndex={-1}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

SearchInput.displayName = "SearchInput"

// SearchInputWithResults - search input with results dropdown
type SearchResult = {
  id: string
  title: string
  description?: string
  href?: string
  category?: string
}

interface SearchInputWithResultsProps extends SearchInputProps {
  /** Search results */
  results?: SearchResult[]
  /** Whether results are loading */
  resultsLoading?: boolean
  /** Empty state message */
  emptyMessage?: string
  /** Result click handler */
  onResultClick?: (result: SearchResult) => void
  /** Show results dropdown */
  showResults?: boolean
}

function SearchInputWithResults({
  value,
  onChange,
  placeholder,
  variant,
  size,
  disabled,
  loading,
  className,
  results = [],
  resultsLoading,
  emptyMessage = "No results found",
  onResultClick,
  showResults = true,
}: SearchInputWithResultsProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleClear = () => {
    onChange("")
    setIsOpen(false)
  }

  React.useEffect(() => {
    if (value) {
      setIsOpen(true)
    }
  }, [value])

  return (
    <div className="relative">
      <SearchInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        className={className}
        onClear={handleClear}
      />

      {isOpen && showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 max-h-80 overflow-auto rounded-lg border border-border bg-popover shadow-lg z-50">
          {resultsLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            <ul className="py-1">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    onClick={() => {
                      onResultClick?.(result)
                      setIsOpen(false)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-accent transition-colors"
                  >
                    <div className="font-medium text-sm">{result.title}</div>
                    {result.description && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {result.description}
                      </div>
                    )}
                    {result.category && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.category}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

SearchInputWithResults.displayName = "SearchInputWithResults"

export { SearchInput, SearchInputWithResults, searchInputVariants }
export type { SearchResult }