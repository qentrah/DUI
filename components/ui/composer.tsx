import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const composerVariants = cva(
  "relative flex flex-col gap-2 p-3 rounded-xl border bg-background transition-all",
  {
    variants: {
      variant: {
        default: "border-border",
        focused: "border-primary ring-2 ring-primary/20",
        error: "border-destructive",
        success: "border-green-500",
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "w-full",
      },
    },
    defaultVariants: { variant: "default", size: "full" },
  }
)

const composerInputVariants = cva(
  "w-full resize-none bg-transparent text-foreground placeholder:text-muted-foreground outline-none font-inherit text-base",
  {
    variants: {
      size: {
        sm: "min-h-16 text-sm",
        md: "min-h-20",
        lg: "min-h-24 text-lg",
        xl: "min-h-32 text-lg",
        full: "min-h-20",
      },
    },
    defaultVariants: { size: "md" },
  }
)

export interface ComposerProps extends VariantProps<typeof composerVariants> {
  /** Current value of the composer */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Submit handler */
  onSubmit?: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether input is disabled */
  disabled?: boolean
  /** Whether to show character count */
  showCharCount?: boolean
  /** Maximum character length */
  maxLength?: number
  /** Whether to show action buttons */
  showActions?: boolean
  /** Custom header content */
  header?: React.ReactNode
  /** Custom footer content */
  footer?: React.ReactNode
  /** Whether to auto-expand */
  autoExpand?: boolean
  /** Custom className */
  className?: string
  /** Ref to the textarea */
  textAreaRef?: React.RefObject<HTMLTextAreaElement>
}

export interface ComposerActionProps {
  /** Icon for the action button */
  icon?: React.ReactNode
  /** Label for the action button */
  label?: string
  /** Click handler */
  onClick?: () => void
  /** Whether action is active */
  active?: boolean
  /** Whether action is disabled */
  disabled?: boolean
  /** Custom className */
  className?: string
}

function Composer({
  value,
  onChange,
  onSubmit,
  placeholder = "Type a message...",
  variant,
  size,
  disabled,
  showCharCount = false,
  maxLength = 2000,
  showActions = true,
  header,
  footer,
  autoExpand = true,
  className,
  textAreaRef,
}: ComposerProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const internalRef = React.useRef<HTMLTextAreaElement>(null)
  const ref = textAreaRef || internalRef

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onSubmit?.(value)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (maxLength && newValue.length <= maxLength) {
      onChange(newValue)
    } else if (!maxLength) {
      onChange(newValue)
    }
  }

  const charCount = value.length
  const remainingChars = maxLength - charCount

  // Auto-expand textarea
  React.useEffect(() => {
    if (autoExpand && ref.current) {
      ref.current.style.height = "auto"
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 200)}px`
    }
  }, [value, autoExpand, ref])

  return (
    <div className={cn(composerVariants({ variant, size, className }))}>
      {header && (
        <div className="pb-2 border-b border-border mb-2">
          {header}
        </div>
      )}

      <div className="flex items-end gap-2">
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            composerInputVariants({ size }),
            "flex-1"
          )}
          rows={1}
        />

        <button
          onClick={() => onSubmit?.(value)}
          disabled={disabled || !value.trim()}
          className={cn(
            "flex-shrink-0 p-2 rounded-lg bg-primary text-primary-foreground",
            "hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          )}
          aria-label="Send message"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9-7-9-7-9 7 9 7zm0 0v-8" />
          </svg>
        </button>
      </div>

      {showCharCount && (
        <div className="flex justify-end mt-1">
          <span className={cn(
            "text-xs",
            remainingChars < 100 ? "text-destructive" : "text-muted-foreground"
          )}>
            {charCount} / {maxLength}
          </span>
        </div>
      )}

      {footer && (
        <div className="pt-2 border-t border-border mt-2">
          {footer}
        </div>
      )}
    </div>
  )
}

Composer.displayName = "Composer"

function ComposerAction({
  icon,
  label,
  onClick,
  active,
  disabled,
  className,
}: ComposerActionProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-md transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon}
      {label}
    </button>
  )
}

ComposerAction.displayName = "ComposerAction"

// ComposerHeader component for adding header content
function ComposerHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  )
}

ComposerHeader.displayName = "ComposerHeader"

// ComposerFooter component for adding footer content
function ComposerFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {children}
    </div>
  )
}

ComposerFooter.displayName = "ComposerFooter"

export {
  Composer,
  ComposerAction,
  ComposerHeader,
  ComposerFooter,
  composerVariants,
}