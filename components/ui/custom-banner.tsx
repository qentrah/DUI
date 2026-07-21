import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const customBannerVariants = cva(
  "relative overflow-hidden rounded-xl p-5 transition-all duration-300",
  {
    variants: {
      variant: {
        gradient: "bg-gradient-to-r from-primary to-secondary text-white",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        muted: "bg-muted text-muted-foreground",
        glass: "backdrop-blur-lg bg-white/10 border border-white/20 text-foreground",
      },
      size: {
        sm: "p-4 text-sm",
        md: "p-5 text-base",
        lg: "p-6 text-lg",
      },
      hasGlow: {
        true: "shadow-lg shadow-primary/25",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
)

const bannerPatternVariants = cva(
  "absolute inset-0 opacity-10",
  {
    variants: {
      pattern: {
        dots: "bg-[radial-gradient(circle,_currentColor_1px,_transparent_1px)] bg-[size:20px_20px]",
        lines: "bg-[linear-gradient(currentColor_1px,_transparent_1px)] bg-[size:100%_20px]",
        grid: "bg-[linear-gradient(currentColor_1px,_transparent_1px),linear-gradient(90deg,currentColor_1px,_transparent_1px)] bg-[size:20px_20px,size:20px_20px]",
        none: "",
      },
    },
    defaultVariants: { pattern: "dots" },
  }
)

export interface CustomBannerProps extends VariantProps<typeof customBannerVariants> {
  /** Banner title */
  title: string
  /** Banner description/content */
  description?: string
  /** Leading icon or image */
  icon?: React.ReactNode
  /** Action button or link */
  action?: React.ReactNode
  /** Background pattern type */
  pattern?: "dots" | "lines" | "grid" | "none"
  /** Custom background color */
  backgroundColor?: string
  /** Custom text color */
  textColor?: string
  /** Whether banner is dismissible */
  dismissible?: boolean
  /** Dismiss handler */
  onDismiss?: () => void
  /** Custom className */
  className?: string
  /** Additional content */
  children?: React.ReactNode
}

function CustomBanner({
  title,
  description,
  icon,
  action,
  variant,
  size,
  hasGlow,
  pattern = "dots",
  backgroundColor,
  textColor,
  dismissible,
  onDismiss,
  className,
  children,
}: CustomBannerProps) {
  const style: React.CSSProperties = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
  }

  return (
    <div
      className={cn(customBannerVariants({ variant, size, hasGlow, className }))}
      style={style}
    >
      {pattern !== "none" && (
        <div className={cn(bannerPatternVariants({ pattern }))} />
      )}

      <div className="relative flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 mt-1">
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-bold tracking-tight mb-1">{title}</h3>
          {description && (
            <p className="opacity-90 text-sm leading-relaxed">
              {description}
            </p>
          )}
          {children && <div className="mt-3">{children}</div>}
        </div>

        {action && (
          <div className="flex-shrink-0 mt-1">
            {action}
          </div>
        )}

        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 mt-1 text-current hover:opacity-70 transition-opacity"
            aria-label="Dismiss banner"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// Predefined banner patterns
const BannerPatterns = {
  dots: "bg-[radial-gradient(circle,_currentColor_1px,_transparent_1px)] bg-[size:20px_20px]",
  lines: "bg-[linear-gradient(currentColor_1px,_transparent_1px)] bg-[size:100%_20px]",
  grid: "bg-[linear-gradient(currentColor_1px,_transparent_1px),linear-gradient(90deg,currentColor_1px,_transparent_1px)] bg-[size:20px_20px,size:20px_20px]",
}

// Theme-based banner presets
const BannerPresets = {
  announcement: {
    variant: "gradient" as const,
    pattern: "dots" as const,
    hasGlow: true,
  },
  update: {
    variant: "primary" as const,
    pattern: "none" as const,
    hasGlow: false,
  },
  promotion: {
    variant: "glass" as const,
    pattern: "grid" as const,
    hasGlow: true,
  },
}

CustomBanner.displayName = "CustomBanner"

export { CustomBanner, customBannerVariants, BannerPatterns, BannerPresets }